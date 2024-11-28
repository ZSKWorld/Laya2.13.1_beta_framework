import { readdirSync, statSync, writeFileSync } from "fs";
import * as path from "path";
import { BuildBase } from "./BuildBase";
import { ResDir, ResPathDeclarePath, ResPathPath, TS_MODIFY_TIP } from "./Const";
import { UpperFirst } from "./Utils";

interface Config {
    filter: (nam: string) => boolean;
    name: string;
    pathName: string;
    include: string;
    haveName: boolean;
    haveExt: boolean;
}

export class BuildResPath extends BuildBase {
    private _config: Config[] = [
        {
            filter: (name: string) => name.startsWith("res/ui/"),
            name: "PkgName",
            pathName: "PkgPath",
            include: ".zip",
            haveName: true,
            haveExt: false,
        },
        {
            filter: (name: string) => name.startsWith("res/font/"),
            name: "FontName",
            pathName: "FontPath",
            include: ".ttf",
            haveName: true,
            haveExt: true,
        },
        {
            filter: (name: string) => name.startsWith("res/skeleton/"),
            name: "SkeletonName",
            pathName: "SkeletonPath",
            include: ".sk",
            haveName: false,
            haveExt: true,
        },
    ];
    doBuild() {
        const content = this.buildResEnum(ResDir, "res/");
        const resPathContent = `${ TS_MODIFY_TIP }export namespace ResPath {\n${ content }}`;
        writeFileSync(ResPathPath, resPathContent);
        const resPathDeclareContent = resPathContent
            .replace(new RegExp("export namespace", "g"), "declare namespace")
            .replace(new RegExp("export enum", "g"), "enum");
        writeFileSync(ResPathDeclarePath, resPathDeclareContent);
    }

    private buildResEnum(dirPath: string, dirName: string, baseContent?: string) {
        let content = baseContent || "";
        let dirs: string[] = [];
        let files: string[] = [];
        readdirSync(dirPath).forEach(fileName => {
            const filePath = path.resolve(dirPath, fileName);
            const info = statSync(filePath);
            if (info.isDirectory()) {
                if (fileName.startsWith("$")) return;
                dirs.push(fileName);
            } else {
                files.push(fileName);
            }
        });
        const config = this._config.find(v => v.filter(dirName));
        if (config) {
            if (config.haveName)
                content += this.buildEnum(config.name, false, dirName, files, config.include, config.haveExt);
            content += this.buildEnum(config.pathName, true, dirName, files, config.include, config.haveExt);
        } else {
            if (!baseContent) content += this.buildEnum("UnclassifiedPath", true, dirName, files, null);
            else {
                const dirs = dirName.split("/");
                content += this.buildEnum(UpperFirst(dirs[dirs.length - 2] + "Path"), true, dirName, files, null);
            }
        }
        dirs.forEach(fileName => {
            const filePath = path.resolve(dirPath, fileName);
            let subDir = dirName + fileName + "/";
            content = this.buildResEnum(filePath, subDir, content + `\t// ${ subDir }\n`);
        });
        return content;
    }

    private buildEnum(name: string, isPath: boolean, dir: string, files: string[], include: string, haveExt: boolean = true) {
        let content = "";
        files.forEach(v => {
            if (include && v.endsWith(include) == false) return;
            const fileName = v.split(".")[0];
            if (isPath) content += `\n\t\t${ UpperFirst(fileName) } = "${ dir + (haveExt ? v : fileName) }",`;
            else content += `\n\t\t${ UpperFirst(fileName) } = "${ fileName }",`;
        });
        if (content) return `\texport enum ${ name } {${ content }\n\t}\n\n`;
        else return `\texport enum ${ name } {}\n\n`;
    }
}