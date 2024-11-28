import * as fs from "fs";
import * as path from "path";
import * as protobuf from "protobufjs";
import { BuildBase } from "./BuildBase";
import { PaiHun_ProtoLuaDeclarePath, PaiHun_ProtoPath, PaiHun_ProtoReplacePath, PaiHun_ProtoTsDeclarePath } from "./Const";
import { getDateStr } from "./Utils";
type KeyMap<T> = { [key: string]: T }
type IService = protobuf.IService & { name: string }
type IType = protobuf.IType & { name: string, comment: string }
type IField = protobuf.IField & { comment: string }
type ProtoMap = { [key: string]: { services: IService[], msgs: IType[] } }

export class BuildProtoDeclare extends BuildBase {
    private SubTypeMark = "$";
    private luaKeywords = [
        "and", "break", "do", "else", "elseif", "end", "false", "for",
        "function", "goto", "if", "in", "local", "nil", "not", "or", "repeat",
        "return", "then", "true", "until", "while", "package", "module"
    ];
    private protoMap: ProtoMap = {};
    private replaces: KeyMap<KeyMap<KeyMap<{ type: string, tsType: string, luaType: string, omissible: boolean }>> & [string[], ...[string, string, number][]][]>;

    doBuild(): void {
        let findIndex = -1;
        let replaceTxt = fs.readFileSync(PaiHun_ProtoReplacePath).toString();
        while ((findIndex = replaceTxt.indexOf("//")) >= 0) {
            const index = replaceTxt.indexOf("\r\n", findIndex);
            replaceTxt = replaceTxt.replace(replaceTxt.substring(findIndex, index), "");
        }
        this.replaces = JSON.parse(replaceTxt);
        this.loadProto();
        const buildType = process.argv[2];
        if (!buildType) {
            this.buildTsDeclare();
            this.buildLuaDeclare();
        } else if (buildType == "ts") {
            this.buildTsDeclare();
        } else if (buildType == "lua") {
            this.buildLuaDeclare();
        }
    }

    private setSubTypeMark(str: string, add: boolean) {
        if (add) {
            if (str.startsWith(this.SubTypeMark)) return str;
            return this.SubTypeMark + str;
        }
        return str.replace(new RegExp(`[${ this.SubTypeMark }]`, "g"), "");
    }
    /** 获取字段转换后类型 */
    private getFieldType(protoName: string, className: string, fieldName: string, typeName: string, isLua: boolean) {
        const fileds = this.replaces?.[protoName]?.[className]?.[fieldName];
        const omissible = fileds ? fileds.omissible : false;
        let type = fileds ? (isLua ? fileds.luaType : fileds.tsType) : "";
        if (!type) type = fileds ? fileds.type : "";
        if (!type) {
            switch (typeName) {
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
                case "sfixed64": type = "number"; break;
                case "bool": type = "boolean"; break;
                case "string": type = "string"; break;
                case "bytes": type = isLua ? "number[]" : "Uint8Array"; break;
                case "object": type = "any"; break;
                default: type = "I" + this.setSubTypeMark(typeName, false); break;
            }
        }
        const omissibleStr = omissible ? "?" : "";
        const splitStr = isLua ? " " : ": ";
        return omissibleStr + splitStr + type;
    };
    //获取嵌套message类型
    private getSubType(target: IType): [IType[], KeyMap<string>] {
        const subTypes: IType[] = [];
        const subNameMaps: KeyMap<string>[] = [{}];
        const nameMap: KeyMap<string> = subNameMaps[0];
        const nested = target.nested;
        if (nested) {
            Object.keys(nested).forEach(k => {
                const data = nested[k] as IType;
                data.name = target.name + "_" + k;
                data.name = this.setSubTypeMark(data.name, true);
                subTypes.push(data);
                nameMap[k] = data.name;
                const [types, map] = this.getSubType(data);
                data.nested && subTypes.push(...types);
                data.nested && subNameMaps.push(map);
            });
            // delete target.nested;
        }
        const subNameMap: KeyMap<string> = {};
        subNameMaps.reverse().forEach(v => Object.assign(subNameMap, v));
        return [subTypes, subNameMap];
    }
    private loadProto() {
        const loadOption = { keepCase: true, alternateCommentMode: true, preferTrailingComment: true };
        const root = new protobuf.Root().loadSync(PaiHun_ProtoPath, loadOption);
        if (!root.nested) return;
        const namespaces = Object.values(root.nested) as protobuf.Namespace[];
        const replaceMark = (type: string) => type.indexOf(".") >= 0 ? this.setSubTypeMark(type.replace(/\./g, "_"), true) : type;
        namespaces.forEach(v => {
            if (!v.nested) return;
            const nestedArray = v.nestedArray;
            const services = nestedArray.filter(v => v instanceof protobuf.Service) as protobuf.Service[];
            const msgs = nestedArray.filter(v => v instanceof protobuf.Type) as protobuf.Type[];
            services.forEach(v => {
                v.methodsArray.forEach(fun => {
                    fun.requestType = replaceMark(fun.requestType);
                    fun.responseType = replaceMark(fun.responseType);
                });
                const filename = path.basename(v.filename || "unknown", ".proto");
                this.protoMap[filename] = this.protoMap[filename] || { services: [], msgs: [] };
                const data = v.toJSON({ keepComments: true }) as IService;
                data.name = v.name;
                this.protoMap[filename].services.push(data);
            });
            msgs.forEach(msg => {
                msg.fieldsArray.forEach(field => (field.type = replaceMark(field.type)));
                const filename = path.basename(msg.filename || "unknown", ".proto");
                this.protoMap[filename] = this.protoMap[filename] || { services: [], msgs: [] };
                const data = msg.toJSON({ keepComments: true }) as IType;
                data.name = msg.name;
                const [subMsgs, subNameMap] = this.getSubType(data);
                const tempMsgs = [data, ...subMsgs];
                tempMsgs.forEach(v => {
                    Object.keys(v.fields).forEach(vk => {
                        const field = v.fields[vk];
                        if (subNameMap[field.type])
                            field.type = subNameMap[field.type];
                    });
                });
                this.protoMap[filename].msgs.push(...tempMsgs);
            });
        });
    }
    /**创建ts自定义枚举 */
    private buildTsCustomEnum() {
        let enumContent = "";
        const enumData = this.replaces.enums;
        enumData?.forEach(data => {
            if (!data.length) return;
            data = [...data];
            const nameArr = data.shift() as string[];
            if (nameArr.length == 1)
                enumContent += `\tconst enum ${ nameArr[0] } {\n`;
            else
                enumContent += `\t/** ${ nameArr[1] } */\n\tconst enum ${ nameArr[0] } {\n`;
            let enumIndex = 0;
            (<[string, string, number][]>data).forEach(v1 => {
                enumIndex = v1[2] || enumIndex;
                if (v1[1])
                    enumContent += `\t\t/** ${ v1[1] } */\n\t\t${ v1[0] } = ${ enumIndex },\n`;
                else
                    enumContent += `\t\t${ v1[0] } = ${ enumIndex },\n`;
                enumIndex++;
            });
            enumContent += `\t}\n\n`;
        });
        return enumContent;
    }
    /** 创建ts声明文件 */
    private buildTsDeclare() {
        let request = "";
        let notifies = "";
        let customEnum = this.buildTsCustomEnum();
        let interfaces = "\tinterface IResponse {\n\t\terror?: any;\n\t}\n\n";
        Object.keys(this.protoMap).sort().forEach(protoKey => {
            const proto = this.protoMap[protoKey];
            //rpc枚举
            proto.services.forEach(service => {
                Object.keys(service.methods).forEach(reqName => {
                    const method = service.methods[reqName];
                    let comment = "\t\t/**";
                    method.comment?.split("\n").forEach(com => comment += `\n\t\t *@description ${ com }`);
                    if (method.comment)
                        comment += `\n\t\t *@description req: {@link I${ method.requestType }}, res: {@link I${ method.responseType }}\n\t\t */\n`;
                    else
                        comment += ` @description req: {@link I${ method.requestType }}, res: {@link I${ method.responseType }} */\n`;
                    request += `${ comment }\t\t${ reqName } = "${ reqName }",\n`
                });
            });
            //messages
            proto.msgs.forEach(msg => {
                //ENotify枚举
                if (msg.name.startsWith("Notify")) {
                    let notifyComment = "\t\t/**";
                    msg.comment?.split("\n").forEach(com => notifyComment += `\n\t\t *@description ${ com }`);
                    if (msg.comment) {
                        notifyComment += `\n\t\t *@description res: {@link I${ msg.name }}\n\t\t */\n`;
                    } else
                        notifyComment += ` @description res: {@link I${ msg.name }} */\n`;
                    notifies += `${ notifyComment }\t\t${ msg.name } = "${ msg.name }",\n`;
                }
                //interface
                const oldComment = msg.comment;
                msg.comment = `${ protoKey }${ msg.comment ? "\n" : "" }${ msg.comment || "" }`;
                if (msg.comment) {
                    let interfaceComment = "";
                    const comments = msg.comment.split("\n");
                    if (comments.length == 1)
                        interfaceComment = `\t/** ${ comments[0] } */\n`;
                    else {
                        interfaceComment = comments.reduce((pv, cv) => pv += `\t *@description ${ cv }\n`, "");
                        interfaceComment = `\t/**\n${ interfaceComment }\t */\n`;
                    }
                    interfaces += interfaceComment;
                }
                const fieldKeys = msg.fields ? Object.keys(msg.fields) : [];
                const extend = msg.name.startsWith("Res") ? " extends IResponse" : "";
                if (fieldKeys.length > 0) {
                    interfaces += `\tinterface I${ this.setSubTypeMark(msg.name, false) + extend } {\n`;
                    fieldKeys.forEach(key => {
                        const field = msg.fields[key] as IField;
                        let fieldComment = "";
                        if (field.comment) {
                            const comments = field.comment.split("\n");
                            if (comments.length == 1)
                                fieldComment = `\t\t/** ${ comments[0] } */\n`;
                            else {
                                fieldComment = comments.reduce((pv, cv) => pv += `\t\t *@description ${ cv }\n`, "");
                                fieldComment = `\t\t/**\n${ fieldComment }\t\t */\n`;
                            }
                        }
                        const rule = field.rule && field.rule == "repeated" ? "[]" : "";
                        interfaces += `${ fieldComment }\t\t${ key }${ this.getFieldType(protoKey, msg.name, key, field.type, false) }${ rule };\n`;
                    });
                    interfaces += `\t}\n`;
                } else interfaces += `\tinterface I${ msg.name + extend } {\n\n\t}\n`;
                interfaces += "\n";
                msg.comment = oldComment
            });
        });
        request = `\t/** 网络请求协议 */\n\tconst enum ERequest {\n${ request }\t}\n`;
        notifies = `\t/** 网络通知 */\n\tconst enum ENotify {\n${ notifies }\t}\n`;

        const content = `/**\n * DateTime: ${ getDateStr() }\n * The file is automatically generated by ProtoDeclare.ts , please do not modify !\n */\n\ndeclare module game {\n\n`
            + notifies + "\n"
            + request + "\n"
            + customEnum
            + interfaces
            + "}";
        fs.writeFileSync(PaiHun_ProtoTsDeclarePath, content);
    }
    /** 创建lua自定义枚举 */
    private buildLuaCustomEnum() {
        let enumContent = "";
        const enumData = this.replaces.enums;
        enumData?.forEach(data => {
            if (!data.length) return;
            data = [...data];
            const nameArr = data.shift() as string[];
            enumContent += `---@enum ${ nameArr[0] }\n`;
            if (nameArr.length == 1)
                enumContent += `${ nameArr[0] } = {\n`;
            else
                enumContent += `---${ nameArr[1] }\n${ nameArr[0] } = {\n`;
            let enumIndex = 0;
            let enumNum: string[] = [];
            let enumStr: string[] = [];
            (<[string, string, number][]>data).forEach(v1 => {
                enumIndex = v1[2] || enumIndex;
                enumNum.push(`\t[${ enumIndex }] = "${ v1[0] }",\n`);
                if (v1[1]) enumStr.push(`\t---${ v1[1] }\n`);
                enumStr.push(`\t${ v1[0] } = ${ enumIndex },\n`);
                enumIndex++;
            });
            enumContent += `${ enumNum.concat(enumStr).join("") }}\n\n`;
        });
        return enumContent;
    }
    private checkFieldName(name: string) {
        if (this.luaKeywords.includes(name)) return "public " + name;
        return name;
    }
    /** 创建lua声明文件 */
    private buildLuaDeclare() {
        let request = "";
        let notifies = "";
        let customEnum = this.buildLuaCustomEnum();
        let interfaces = "---@class IProtoMsg\n---@field HasField? fun(self:any, key:string):boolean\n\n";
        interfaces += "---@class IResponse: IProtoMsg\n---@field error any\n\n";
        Object.keys(this.protoMap).sort().forEach(protoKey => {
            const proto = this.protoMap[protoKey];
            //rpc枚举
            proto.services.forEach(service => {
                Object.keys(service.methods).forEach(reqName => {
                    const method = service.methods[reqName];
                    let comment = "";
                    method.comment?.split("\n").forEach(com => comment += `\t---${ com }\n`);
                    comment += `\t---@see I${ method.requestType } req\n\t---@see I${ method.responseType } res\n`;
                    request += `\n${ comment }\t${ reqName } = "${ reqName }",\n`
                });
            });
            //messages
            proto.msgs.forEach(msg => {
                //ENotify枚举
                if (msg.name.startsWith("Notify")) {
                    let notifyComment = "";
                    if (msg.comment) {
                        const comments = msg.comment.split("\n");
                        if (comments.length == 1)
                            notifyComment = `\t---${ comments[0] }\n`;
                        else {
                            notifyComment = comments.reduce((pv, cv) => pv += `\t---${ cv }\n`, "");
                        }
                    }
                    notifyComment += `\t---@see I${ msg.name }\n`;
                    notifies += `\n${ notifyComment }\t${ msg.name } = "${ msg.name }",\n`;
                }
                //interface
                const oldComment = msg.comment;
                msg.comment = `${ protoKey }${ msg.comment ? "\n" : "" }${ msg.comment || "" }`;
                msg.comment?.split("\n").forEach(v => {
                    interfaces += `---${ v }\n`;
                });
                const extend = msg.name.startsWith("Res") ? ": IResponse" : ": IProtoMsg";
                interfaces += `---@class I${ this.setSubTypeMark(msg.name, false) + extend }\n`;
                const fieldKeys = msg.fields ? Object.keys(msg.fields) : [];
                fieldKeys.forEach(key => {
                    const field = msg.fields[key] as IField;
                    const fieldComment = field.comment ? "@ " + field.comment.split("\n").join("。 ") : "";
                    const rule = field.rule && field.rule == "repeated" ? "[]" : "";
                    interfaces += `---@field ${ this.checkFieldName(key) }${ this.getFieldType(protoKey, msg.name, key, field.type, true) }${ rule } ${ fieldComment }\n`;
                });
                interfaces += "\n";
                msg.comment = oldComment
            });
        });
        request = `---@enum ERequest\n---网络请求协议\nERequest = {\n${ request }}\n`;
        notifies = `---@enum ENotify\n---网络通知\nENotify = {\n${ notifies }}\n`;
        const content = `---\n---DateTime: ${ getDateStr() }\n---The file is automatically generated by ProtoDeclare.ts , please do not modify !\n---\n\n`
            + notifies + "\n"
            + request + "\n"
            + customEnum
            + interfaces;
        fs.writeFileSync(PaiHun_ProtoLuaDeclarePath, content);
    }

}