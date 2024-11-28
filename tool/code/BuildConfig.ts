import * as fs from "fs";
import * as xlsx from "node-xlsx";
import * as path from "path";
import { BuildBase } from "./BuildBase";
import { CfgDataPath, CfgDir, TS_MODIFY_TIP, xlsxDir } from "./Const";
import { GetTemplateContent, RemoveDir } from "./Utils";
class ObjectDeclare {
    name: string;
    keys: string[];
    types: string[];
    descs?: string[];
    subData: boolean;
    constructor(name: string, keys: string[], types: string[], descs?: string[], subData = true) {
        this.name = name;
        this.keys = keys;
        this.types = types;
        this.descs = descs;
        this.subData = subData;
    }
}

const enum CfgExportType {
    /** 数字型字段 */
    Export_Number = "Number",
    /** 字符型字段 */
    Export_String = "String",
    /** 布尔值字段 */
    Export_Bool = "Bool",
    /** 时间型字段 */
    Export_Date = "Date",
    /** 整数数组型字段 */
    Export_NumberArray = "NumberArray",
    /** 整数矩阵型字段 */
    Export_NumberMatrix = "NumberMatrix",
    /** 字符数组型字段 */
    Export_StringArray = "StringArray",
    /** 字符矩阵型字段 */
    Export_StringMatrix = "StringMatrix",
    /** 对象型字段 */
    Export_Object = "Object",
    /** 对象数组型字段 */
    Export_ObjectArray = "ObjectArray",
    /** 对象矩阵型字段 */
    Export_ObjectMatrix = "ObjectMatrix",
    /** 类型型字段 */
    Export_Type = "Type",
    /** 语言包编号 */
    Export_Lang = "Lang",
    /** 导出跳过字段 */
    Export_Skip = "Skip",
}

export class BuildConfig extends BuildBase {
    static readonly Sign_Types = "$";
    static readonly Sign_Keys = "!";
    static readonly Sign_Descs = "#";
    static readonly Sign_Ignore = "*";
    static readonly Sign_Skip = "skip";
    keyIndex = 1;
    keyNumMap = {};
    config = {
        keyMap: {},
        nameMap: {},
    };
    cfgTemplate = GetTemplateContent("ConfigTemp");
    cfgMgrTemplate = GetTemplateContent("CfgMgr");
    icfgMgrTemplate = GetTemplateContent("ICfgMgr");

    /** 表数据转换器 */
    translator: { [key in CfgExportType]: (...args) => any } = {
        Bool: (str: string) => {
            return String(str).toLowerCase() == "true";
        },
        Date: (str: string) => {
            return str;
        },
        Number: (str: string) => {
            return +str || 0;
        },
        NumberArray: (str: string) => {
            if (str == null || str == "") return null;
            str = String(str);
            return String(str).split(",").map(v => this.translator.Number(v));
        },
        NumberMatrix: (str: string) => {
            if (str == null || str == "") return null;
            str = String(str);
            return String(str).split(";").map(v => this.translator.NumberArray(v));
        },
        String: (str: string) => {
            return str == null ? "" : String(str);
        },
        StringArray: (str: string) => {
            if (str == null || str == "") return null;
            str = String(str);
            return str.split(",").map(v => this.translator.String(v));
        },
        StringMatrix: (str: string) => {
            if (str == null || str == "") return null;
            str = String(str);
            return str.split(";").map(v => this.translator.StringArray(v));
        },
        Object: (str: string, type: string) => {
            if (str == null || str == "") return null;
            str = String(str);
            let tType = type.replace(/\"/g, "");
            tType = tType.substring(1, tType.length - 1);
            const obj = {};
            const values = str.split(",");
            tType.split(",").forEach((v, index) => {
                const [key, vType] = v.split(":");
                obj[this.GetKeyNum(key)] = this.translator[this.GetExportType(vType)](values[index], vType);
            });
            return obj;
        },
        ObjectArray: (str: string, type: string) => {
            if (str == null || str == "") return null;
            str = String(str);
            const values = str.split(";");
            const realType = type.replace("array", "");
            return values.map(v => this.translator.Object(v, realType));
        },
        ObjectMatrix: (str: string, type: string) => {
            if (str == null || str == "") return null;
            str = String(str);
            const values = str.split("^");
            const realType = type.replace("matrix", "");
            return values.map(v => this.translator.ObjectArray(v, realType));
        },
        Type: (str: string) => { return str; },
        Lang: (str: string) => void 0,
        Skip: (str: string) => void 0,
    };

    doBuild() {
        RemoveDir(CfgDir);
        fs.mkdirSync(CfgDir);
        this.CreateConfig();
        this.CreateCfgMgr();
    }

    private GetKeyNum(key: string) {
        let keyNum = this.keyNumMap[key];
        if (!keyNum) {
            keyNum = this.keyIndex++;
            this.keyNumMap[key] = keyNum;
            this.config.keyMap[keyNum] = key;
        }
        return keyNum;
    }

    private GetExportType(str: string) {
        switch (str) {
            case "number": return CfgExportType.Export_Number;
            case "string": return CfgExportType.Export_String;
            case "bool": return CfgExportType.Export_Bool;
            case "date": return CfgExportType.Export_Date;
            case "numberarray": return CfgExportType.Export_NumberArray;
            case "numbermatrix": return CfgExportType.Export_NumberMatrix;
            case "stringarray": return CfgExportType.Export_StringArray;
            case "stringmatrix": return CfgExportType.Export_StringMatrix;
            default:
                if (str.startsWith("[") && str.endsWith("]")) return CfgExportType.Export_Object;
                else if (str.startsWith("array[") && str.endsWith("]")) return CfgExportType.Export_ObjectArray;
                else if (str.startsWith("matrix[") && str.endsWith("]")) return CfgExportType.Export_ObjectMatrix;
                else if (str.startsWith("type")) return CfgExportType.Export_Type;
                else if (str.startsWith("lang")) return CfgExportType.Export_Lang;
                else if (str.startsWith("skip")) return CfgExportType.Export_Skip;
                else throw new Error("unknown type: " + str);
        }
    }

    private CreateConfig() {
        const translator = this.translator;
        fs.readdirSync(xlsxDir).forEach(files => {
            if (files.endsWith(".xlsx")) {
                let sheets: { name: string, data: string[][] }[] = xlsx.parse(path.resolve(xlsxDir, files)) as any;
                //第一个sheet是使用说明,不要
                sheets.shift();
                sheets.forEach(sht => {
                    const names = sht.name.split("|");
                    sht.name = names[1];
                    const cfg = {};
                    const datas = sht.data;
                    const [types, keys, descs] = datas.splice(0, 3);
                    const typeCnt = types.length;
                    const dataCnt = datas.length;
                    let hasData = false;
                    const ids: string[] = [];
                    const dataDescs: string[] = [];
                    //第一列是修饰符，从第二列开始遍历
                    for (let i = 1; i < typeCnt; i++) {
                        const type = types[i];
                        //跳过忽略的列
                        if (type == BuildConfig.Sign_Skip) continue;
                        const key = keys[i];
                        const desc = descs[i];
                        const isDataDesc = desc && desc.startsWith("//");
                        desc && (descs[i] = desc.replace("//", ""));
                        for (let j = 0; j < dataCnt; j++) {
                            const row = datas[j];
                            const rowId = row[1];
                            //跳过没有id的行
                            if (rowId == null) continue;
                            //跳过忽略的行
                            if (row[0] == BuildConfig.Sign_Ignore) continue;
                            i == 1 && ids.push(rowId);
                            isDataDesc && dataDescs.push(row[i]);
                            const item = cfg[rowId] = cfg[rowId] || {};
                            try {
                                const value = translator[this.GetExportType(type)](row[i], type);
                                item[this.GetKeyNum(key)] = value;
                            } catch (error) {
                                console.log(sht.name + "===" + i + "===" + row[i] + "===" + type);
                                throw error;
                            }
                            hasData = true;
                        }
                    }
                    if (hasData) {
                        this.config[sht.name] = cfg;
                        this.config.nameMap[sht.name] = names[0];
                    }
                    keys.splice(0, 1);
                    types.splice(0, 1);
                    descs.splice(0, 1);
                    this.CreateCfgType(ids, keys, types, descs, sht.name, dataDescs);
                });
            }
        });
        fs.writeFileSync(CfgDataPath, JSON.stringify(this.config));
    }

    /** 创建表类型接口 */
    private CreateCfgType(ids: string[], keys: string[], types: string[], descs: string[], cfgName: string, dataDescs?: string[]) {
        const cfgTypes = this.GetCfgType(keys, types, cfgName);
        const baseType = cfgTypes[0];
        baseType.descs = descs;
        cfgTypes.splice(0, 0, new ObjectDeclare(`Cfg${ cfgName }`, ids, new Array(ids.length).fill(baseType.name), dataDescs, false));
        let typeContent = TS_MODIFY_TIP;
        cfgTypes.forEach(type => {
            typeContent += `declare interface ${ type.name } {\n`;
            typeContent += `\treadonly [key: string]: ${ type.subData ? "any" : type.types[0] };\n`;
            type.keys.forEach((key, index) => {
                if (key == BuildConfig.Sign_Skip || type.types[index] == BuildConfig.Sign_Skip) return;
                if (type.descs && type.descs.length) typeContent += `\t/** ${ type.descs[index] ?? "" } */\n`;
                typeContent += `\treadonly ${ key }: ${ type.types[index] };\n`;
            });
            typeContent += `}\n\n`;
        });
        fs.writeFileSync(CfgDir + "/Cfg" + cfgName + ".d.ts", typeContent);
    }

    /** 获取表所有字段类型集合 */
    private GetCfgType(keys: string[], types: string[], cfgName: string) {
        const dec = new ObjectDeclare(`Cfg${ cfgName }Data`, [], []);
        const declares = [dec];
        keys.forEach((key, index) => {
            dec.keys.push(key);
            dec.types.push(this.GetTSType(types[index], declares, cfgName));
        });
        return declares;
    }

    /** 获取字段类型 */
    private GetTSType(typeStr: string, declares: ObjectDeclare[], cfgName: string): string {
        switch (typeStr) {
            case "number": return "number";
            case "string": return "string";
            case "bool": return "boolean";
            case "date": return "Date";
            case "numberarray": return "number[]";
            case "numbermatrix": return "number[][]";
            case "stringarray": return "string[]";
            case "stringmatrix": return "string[][]";
            default:
                if (typeStr.startsWith("[") && typeStr.endsWith("]")) {
                    const dec = new ObjectDeclare(`Cfg${ cfgName }Data${ declares.length }`, [], []);
                    declares.push(dec);
                    let typeDesc = typeStr.replace(/\"/g, "");
                    typeDesc = typeDesc.substring(1, typeDesc.length - 1);
                    const typeDescs = typeDesc.split(",");
                    typeDescs.forEach(typeDesc => {
                        const [key, type] = typeDesc.split(":");
                        dec.keys.push(key);
                        dec.types.push(this.GetTSType(type, declares, cfgName));
                    });
                    return dec.name;
                }
                else if (typeStr.startsWith("array[") && typeStr.endsWith("]"))
                    return this.GetTSType(typeStr.substring(5), declares, cfgName) + "[]";
                else if (typeStr.startsWith("matrix[") && typeStr.endsWith("]"))
                    return this.GetTSType(typeStr.substring(6), declares, cfgName) + "[][]";
                else if (typeStr.startsWith("type")) return "string";//this.GetTSType(typeDesc);
                else if (typeStr.startsWith("lang")) return "any";
                else if (typeStr.startsWith("skip")) return "any";
                else throw new Error("unknown type: " + typeStr + "===" + cfgName);
        }

    }

    /** 创建表管理类 */
    private CreateCfgMgr() {
        const nameMap = this.config.nameMap;
        delete this.config.keyMap;
        delete this.config.nameMap;
        let vars = "";
        Object.keys(this.config).forEach((v, index) => {
            const configName = `Cfg${ v }`;
            vars += `\t/** ${ nameMap[v] ?? "" } */\n\treadonly ${ v }: ${ configName } & CfgExtension<CfgData<${ configName }>>;\n`;
        });
        const mgrTxt = this.cfgMgrTemplate.replace("#vars#", vars);
        const imgrTxt = this.icfgMgrTemplate.replace("#vars#", vars);
        fs.writeFileSync(path.resolve(CfgDir, "CfgManager.ts"), mgrTxt);
        fs.writeFileSync(path.resolve(CfgDir, "ICfgManager.ts"), imgrTxt);
    }
}


