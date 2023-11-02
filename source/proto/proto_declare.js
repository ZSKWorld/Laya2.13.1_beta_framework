const fs = require("fs");
const path = require("path");

// const protoDir = path.resolve(__dirname, "../../../poker-protocol/proto");
const protoDir = __dirname
const contentMap = {};
const nameMap = {};

const matchMap = {
    common: {
        "message Response{object error?=1;}": true
    }
};
const reqNameMap = {};
/** @type {string[]} */
let matches = [];
fs.readdirSync(protoDir).forEach(filename => {
    const ext = path.extname(filename);
    if (ext != ".proto") return;
    const name = path.basename(filename, ext);
    const filepath = path.resolve(protoDir, filename);
    matchMap[name] = matchMap[name] || {};
    const map = matchMap[name];
    const protoContent = fs.readFileSync(filepath).toString();
    let proto = protoContent
        .replace(/\/\/.*/g, "")     //去掉注释
        .replace(/[\r\n]/g, "")     //去掉换行
        .replace(/[\s]{2,}/g, " ")      //多个空格变成一个
        .replace(/[ ]*{[ ]*/g, "{")        //左大括号格式化
        .replace(/[ ]*}[ ]*/g, "}")        //右大括号格式化
        .replace(/[ ]*=[ ]*/g, "=")        //等号格式化
        .replace(/[ ]*;[ ]*/g, ";")        //分号格式化
    const reqs = proto.match(/rpc [a-zA-Z0-9]+?\(/g);
    const reqContent = reqNameMap[name] = reqNameMap[name] || {};
    reqs && reqs.forEach(v => {
        const vName = v.substring(4, v.length - 1);
        reqContent[vName] = true;
    });
    while (matches = proto.match(/message[^{}]*{([^{}])*}/g)) {
        matches.forEach(v => {
            if (!contentMap[v]) {
                const vName = v.substring(8, v.indexOf("{"));
                if (!nameMap[vName]) {
                    nameMap[vName] = 1;
                    contentMap[v] = true;
                    map[v] = true;
                }
                else {
                    const newName = vName + nameMap[vName];
                    console.log("重名已重命名：", vName + " => " + newName);
                    const newV = v.replace(vName, newName);
                    nameMap[vName]++;
                    nameMap[newName] = 1;
                    contentMap[newV] = true;
                    map[newV] = true;
                }
            }
            else {
                console.log("重复已跳过：", v);
                Object.keys(matchMap).forEach(v2 => {
                    if (v2 != "common") delete matchMap[v2][v];
                });
                if (!matchMap.common[v]) matchMap.common[v] = true;
            }
            proto = proto.replace(v, "");
        });
    }
});

const replaces = JSON.parse(fs.readFileSync("proto/proto_replace.json"));
const getTsType = (fileName, className, fieldName, type, isLua) => {
    const replace = replaces[isLua ? "lua" : "typescript"];
    if (replace && replace[fileName] && replace[fileName][className] && replace[fileName][className][fieldName]) {
        return replace[fileName][className][fieldName];
    }
    switch (type) {
        case "double":
        case "float":
        case "int32":
        case "int64":
        case "uint32":
        case "uint64":
        case "sint32":
        case "sint32":
        case "fixed32":
        case "fixed64":
        case "sfixed32":
        case "sfixed64": return "number";
        case "bool": return "boolean";
        case "string": return "string";
        case "bytes": return isLua ? "number[]" : "Uint8Array";
        case "object": return "any";
        default: return "I" + type;
    }
};
//#region 
//#endregion
let tscontent = "";
let luacontent = "";
/** @type {[key:string]:object} */
let notifyNames = {};
Object.keys(matchMap).forEach(k => {
    //ts
    const keys = Object.keys(matchMap[k]);
    tscontent += "\t//#region 以下是  " + k + " 协议结构，一共 " + keys.length + " 个\r\n";
    luacontent += "---以下是  " + k + " 协议结构，一共 " + keys.length + " 个\r\n";
    keys.forEach(key => {
        key = key.substring(0, key.length - 1);
        const [nameStr, contentStr] = key.split("\{");
        const name = nameStr.split(" ")[1];

        const isResponse = name.startsWith("Res") && name != "Response";

        tscontent += "\tinterface I" + name + (isResponse ? " extends IResponse" : "") + " {" + (contentStr ? "\r\n" : "");
        luacontent += "---@class I" + name + (isResponse ? ": IResponse" : "") + "\r\n";
        contentStr && contentStr.split(";").forEach(v => {
            if (!v) return;
            const isArray = v.startsWith("repeated");
            v = v.replace("repeated ", "");
            const [type, pname] = v.split("=")[0].split(" ");
            tscontent += "\t\t" + pname + ":" + getTsType(k, name, pname, type, false) + (isArray ? "[]" : "") + ";\r\n";
            luacontent += "---@field " + pname + " " + getTsType(k, name, pname, type, true) + (isArray ? "[]" : "") + "\r\n";
        });
        tscontent += "\t}\r\n\r\n";
        luacontent += "\r\n";
        if (name.startsWith("Notify")) {
            notifyNames[k] = notifyNames[k] || {};
            notifyNames[k][name] = true;
        }

        //lua
    });
    tscontent = tscontent.trimEnd() + "\r\n\t//#endregion\r\n\r\n";
});

let reqTsContent = "";
let reqLuaContent = "";
Object.keys(reqNameMap).forEach(v => {
    const reqs = Object.keys(reqNameMap[v]);
    reqTsContent += "\r\n\t\t// " + v + " request, count:" + reqs.length + "\r\n";
    reqLuaContent += "\r\n\t--- " + v + " request, count:" + reqs.length + "\r\n";
    reqs.forEach(req => {
        reqTsContent += `\t\t${req} = "${req}",\r\n`;
        reqLuaContent += `\t${req} = "${req}",\r\n`;
    });
});
reqTsContent = "\t/** 网络请求协议 */\r\n\tconst enum Request {" + reqTsContent + "\t}\r\n\r\n";
reqLuaContent = "---网络请求协议\r\nRequest = {" + reqLuaContent + "}\r\n\r\n";

let notifyTsContent = "";
let notifyLuaContent = "";
Object.keys(notifyNames).forEach(v => {
    const notifies = Object.keys(notifyNames[v]);
    notifyTsContent += "\r\n\t\t// " + v + " request, count:" + notifies.length + "\r\n";
    notifyLuaContent += "\r\n\t--- " + v + " request, count:" + notifies.length + "\r\n";
    notifies.forEach(nottify => {
        notifyTsContent += `\t\t${nottify} = "${nottify}",\r\n`;
        notifyLuaContent += `\t${nottify} = "${nottify}",\r\n`;
    });
});
notifyTsContent = "\t/** 网络通知 */\r\n\tconst enum Notify {" + notifyTsContent + "\t}\r\n\r\n";
notifyLuaContent = "---网络通知\r\nNotify = {" + notifyLuaContent + "}\r\n\r\n";

tscontent = "/**The file is automatically generated by proto_declare.js , please do not modify */\r\n\r\n"
    + "declare module game {\r\n\r\n"
    + notifyTsContent
    + reqTsContent
    + tscontent
    + "}";
luacontent = "---The file is automatically generated by proto_declare.js , please do not modify\r\n\r\n"
    + notifyLuaContent
    + reqLuaContent
    + luacontent;
luacontent = luacontent.replace(/\?/g, "");

fs.writeFileSync("proto/proto.d.ts", tscontent)
fs.writeFileSync("proto/proto.lua", luacontent)

// fs.writeFileSync("./libs/proto.d.ts", tscontent)
