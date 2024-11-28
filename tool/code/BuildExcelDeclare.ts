import * as fs from "fs";
import * as xlsx from "node-xlsx";
import * as path from "path";
import { BuildBase } from "./BuildBase";
import { LUA_MODIFY_TIP, PaiHun_ExcelDeclarePath, PaiHun_ExcelDir } from "./Const";

const enum ExportType {
    Group = "group",
    Unique = "unique",
    NoKey = "nokey",
}

export class BuildExcelDeclare extends BuildBase {
    private typeMap = {
        "float": "number",
        "int32": "number",
        "uint32": "number",
        "string": "string",
    };

    doBuild(): void {
        this.createTableEnum();
    }

    private createTableEnum() {
        let declareContent = "";
        const tableNameMap = {}, tableSheetInfo = {}, sheetRepeatInfo = {}, tableSheetInfo2 = {};
        fs.readdirSync(PaiHun_ExcelDir).forEach(file => {
            if (file.endsWith(".xlsx")) {
                const tableName = file.replace(".xlsx", "");
                const tableUpperName = this.upperFirst(tableName, ["_"], "");
                tableNameMap[tableUpperName] = tableName;
                tableSheetInfo[tableName] ||= {};
                tableSheetInfo2[tableName] ||= {};
                const sheets: { name: string, data: string[][] }[] = xlsx.parse(path.resolve(PaiHun_ExcelDir, file)).filter(v => !this.hasChinese(v.name)) as any;
                const exportSheet = sheets.shift();
                exportSheet?.data.shift();
                //导出类型映射
                const exportTypeMap: { [tableName: string]: { exportKey: string, exportType: ExportType, exportComment: string } } = {};
                exportSheet?.data.forEach((v, i) => {
                    exportTypeMap[v[0]] = { exportKey: v[1] || "string", exportType: v[2] as ExportType, exportComment: v[3] ? v[3].replace(new RegExp("\n", "g"), "。") : "" };
                });
                sheets.forEach(sheet => {
                    const sheetName = sheet.name;
                    if (!exportTypeMap[sheetName]) return;
                    const sheetUpperName = this.upperFirst(sheetName, ["_"], "");
                    const dataType = `Data_${ tableUpperName }_${ sheetUpperName }`;
                    const tableType = `Table_${ tableUpperName }_${ sheetUpperName }`;
                    const sheetDataType = `Sheet_${ tableUpperName }_${ sheetUpperName }`;

                    const tableExportKey = exportTypeMap[sheetName].exportKey;
                    const tableExportType = exportTypeMap[sheetName].exportType;
                    const tableComment = exportTypeMap[sheetName].exportComment;

                    const repeatTableName = sheetRepeatInfo[sheetUpperName] = sheetRepeatInfo[sheetUpperName] || tableName;
                    tableSheetInfo[repeatTableName][sheetUpperName] ||= {
                        name: sheetName, dataType: [], tableType: [], exportType: [], tableName: [], sheetName: []
                    };
                    const nameInfo = tableSheetInfo[repeatTableName][sheetUpperName];
                    nameInfo.dataType.push(dataType);
                    nameInfo.tableType.push(tableType);
                    nameInfo.exportType.push(tableExportType);
                    nameInfo.tableName.push(tableName);
                    nameInfo.sheetName.push(sheetName);

                    tableSheetInfo2[tableName][sheetUpperName] = {
                        dataType, tableType, exportType: tableExportType, tableName, sheetName, tableUpperName
                    };

                    const fieldIndex = sheet.data.findIndex(sdv => sdv[0] == "##");
                    const commentIndex = sheet.data.findIndex(sdv => sdv[0] == "#comment");
                    const typeIndex = sheet.data.findIndex(sdv => sdv[0] == "#type");
                    const modeIndex = sheet.data.findIndex(sdv => sdv[0] == "#mode");

                    const fields = sheet.data[fieldIndex];
                    const types = sheet.data[typeIndex];
                    const comments = commentIndex >= 0 ? sheet.data[commentIndex] : [];
                    fields.shift();
                    types.shift();
                    comments && comments.shift();

                    declareContent += `---${ tableExportType } sheet${ tableComment ? " | " + tableComment : "" }\n---@class ${ sheetDataType }\n`;
                    declareContent += this.getSheetFieldsContent(fields, types, comments);
                    const keyFieldIndex = fields.findIndex(v => v == tableExportKey);
                    const keyType = this.typeMap[types[keyFieldIndex]] || "string";
                    declareContent += `\n---${ tableExportType } data\n---@alias ${ dataType } ${ sheetDataType }${ this.exportTableDataType(tableExportType) }`;
                    declareContent += `\n---${ tableExportType } table<${ tableExportKey }, ${ dataType }>\n---@alias ${ tableType } table<${ keyType }, ${ dataType }>\n\n`;
                });
            }
        });
        let enumContent = `${ LUA_MODIFY_TIP }\n---表名枚举\n---@enum ExcelName\nExcelName = {\n`;
        Object.keys(tableNameMap).forEach(v => {
            enumContent += `\t${ v } = "${ tableNameMap[v] }",\n`
        });
        enumContent += "}\n\n---表sheet名枚举\n---@enum SheetName\nSheetName = {\n";
        Object.keys(tableSheetInfo).forEach(tv => {
            // enumContent += `\t---${ tv }表\n\n`;
            const tvData = tableSheetInfo[tv];
            Object.keys(tvData).forEach(v => {
                const { name, dataType, tableType, exportType, tableName, sheetName } = tvData[v];
                dataType.forEach((_, i) => {
                    enumContent += `\t---@see ${ dataType[i] }\n`;
                    enumContent += `\t---@see ${ tableType[i] } ${ exportType[i] }\n`;
                });
                enumContent += `\t${ v } = "${ name }",\n`
            });
            enumContent += "\n";
        });
        //
        enumContent += "}\n\n---表名 & sheet名 枚举\n---@enum ExcelSheet\nExcelSheet = {\n";
        Object.keys(tableSheetInfo2).forEach(tv => {
            const tvData = tableSheetInfo2[tv];
            Object.keys(tvData).forEach(v => {
                const { dataType, tableType, exportType, tableName, sheetName, tableUpperName } = tvData[v];
                enumContent += `\t---@see ${ dataType }\n`;
                enumContent += `\t---@see ${ tableType } ${ exportType }\n`;
                enumContent += `\t${ tableUpperName + "_" + v } = { "${ tableName }", "${ sheetName }" },\n`
            });
            enumContent += "\n";
        });
        //
        enumContent = enumContent.trim() + "\n}";
        const content = enumContent + "\n\n" + declareContent;
        fs.writeFileSync(PaiHun_ExcelDeclarePath, content.trim());
    }
    private hasChinese(str: string) {
        const reg = /[\u4e00-\u9fa5|\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/;
        return reg.test(str);
    }

    private exportTableDataType(type: ExportType) {
        switch (type) {
            case ExportType.Group: return "[]";
            default: return "";
        }
    }

    private upperFirst(str: string, splits?: string[], joinStr = "_") {
        if (!str) return str;
        if (str.length == 1) return str.toUpperCase();
        else {
            let temp = str[0].toUpperCase() + str.substring(1);
            if (splits && splits.length) {
                let resultArr = [temp];
                splits.forEach(v => {
                    let count = resultArr.length;
                    while (count--) {
                        const resultEle = resultArr.shift();
                        resultEle && resultArr.push(...resultEle.split(v).map(v1 => this.upperFirst(v1)));
                    }
                });
                return resultArr.join(joinStr);
            } else {
                return temp;
            }
        }
    }

    private getSheetFieldsContent(fields: string[], types: string[], comments: string[]) {
        const result: { [fieldName: string]: { type: string, isArray: boolean, comments: string[] } } = {};
        fields.forEach((v, i) => {
            const realFieldName = v.replace(/\[\d+\]/g, "");
            result[realFieldName] ||= { type: "", isArray: v != realFieldName, comments: [] };
            result[realFieldName].type ||= this.typeMap[types[i]] ? this.typeMap[types[i]] + (result[realFieldName].isArray ? "[]" : "") : "";
            comments && result[realFieldName].comments.push(comments[i] || "");
        });
        let content = "";
        Object.keys(result).forEach(v => {
            if (!result[v].type) {
                result[v].type = "any";
                result[v].comments.push("unknown field type");
            }
            const comments = result[v].isArray ? this.getArrConnectStr(result[v].comments) : result[v].comments[0];
            content += `---@field public ${ v } ${ result[v].type }${ comments ? " @ " + comments : "" }\n`;
        });
        return content;
    }
    private getArrConnectStr(arr: string[]) {
        if (!arr || !arr.length) return "";
        return arr.map(v => "[" + v + "]").join(", ");
    }
}

new BuildExcelDeclare();