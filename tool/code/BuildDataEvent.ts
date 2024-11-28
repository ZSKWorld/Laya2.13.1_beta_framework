import * as fs from "fs";
import * as ts from "typescript";
import { BuildBase } from "./BuildBase";
import { TS_MODIFY_TIP, UserDataEventPath, UserDataInterfaceDir } from "./Const";
import { UpperFirst } from "./Utils";

interface IIterfaceInfo {
    name: string;
    fields: string[];
    methods: string[];
}

export class BuildDataEvent extends BuildBase {
    doBuild(): void {
        if (fs.existsSync(UserDataInterfaceDir) == false) return console.error("文件夹不存在=>" + UserDataInterfaceDir);
        const files = fs.readdirSync(UserDataInterfaceDir);
        let context = TS_MODIFY_TIP + "export const enum UserDataEvent {\r";
        files.forEach(v => {
            const info = this.getFileInfo(UserDataInterfaceDir + "/" + v);
            let isFirst = true;
            info.forEach(v => {
                context += `\t//${ v.name + (isFirst ? new Array(100 - v.name.length).fill("-").join("") : "") }\r`;
                v.fields.forEach(f => context += `\t${ v.name.substring(1) }_${ UpperFirst(f) }_Changed = "${ v.name.substring(1).toLocaleLowerCase() }_${ f.toLocaleLowerCase() }_changed",\r`);
                isFirst = false;
            });
        });
        context += "}";
        fs.writeFileSync(UserDataEventPath, context);

    }

    private getFileInfo(filePath: string) {
        const context = fs.readFileSync(filePath, "utf-8");
        const sourceFile = ts.createSourceFile('info.d.ts', context, ts.ScriptTarget.ES2022);
        const infos: IIterfaceInfo[] = [];
        this.decodeFile(sourceFile, infos);
        return infos;
    }

    private decodeFile(node: ts.Node, infos: IIterfaceInfo[]) {
        let hasInterface = false;
        ts.forEachChild(node, child => {
            if (!hasInterface && ts.isInterfaceDeclaration(child)) {
                // hasInterface = true;
                const info = this.decodeInterface(child);
                info && infos.push(info);
            }
        });
    }

    private decodeInterface(node: ts.InterfaceDeclaration) {
        let info: IIterfaceInfo;
        ts.forEachChild(node, child => {
            if (ts.isPropertySignature(child)) {
                info = info || { name: node.name.text, fields: [], methods: [] };
                info.fields.push(child.name["text"]);
            } else if (ts.isMethodSignature(child)) {
                info = info || { name: node.name.text, fields: [], methods: [] };
                info.methods.push(child.name["text"]);
            }
        });
        return info;
    }
}