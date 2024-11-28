import * as fs from "fs";
import * as path from "path";
import { BuildBase } from "./BuildBase";
import { CMDInterfaceDir, NetCMDPath, NetNotifyPath, NetServiceDeclarePath, NetServicePath, NotifyInterfaceDir, TS_MODIFY_TIP } from "./Const";
import { GetTemplateContent, UpperFirst } from "./Utils";
export class BuildNet extends BuildBase {
    private _allCMDCtrls: { [key: string]: string[] } = {};
    private _allNotifyCtrls: { [key: string]: string[] } = {};
    private _serviceTemp = GetTemplateContent("Services");
    private _serviceDeclareTemp = GetTemplateContent("ServicesDeclare");
    doBuild() {
        this.getAllCMDController();
        this.buildNetCMD();
        this.buildService();

        this.getAllNotifyController();
        this.buildNetNotify();
    }

    private getAllCMDController() {
        if (!fs.existsSync(CMDInterfaceDir)) return console.log("目录不存在 " + CMDInterfaceDir);
        const netCtrls = fs.readdirSync(CMDInterfaceDir).filter(v => v.endsWith(".d.ts"));
        netCtrls.forEach(fileName => {
            const name = fileName.replace(".d.ts", "");
            const filePath = path.resolve(CMDInterfaceDir, fileName);
            const fileContent = fs.readFileSync(filePath).toString();
            const matches = fileContent.match(/[\S].*void/g);
            if (matches?.length) {
                this._allCMDCtrls[name] = matches;
            }
        });
    }

    private buildNetCMD() {
        const matches: string[] = [];
        Object.keys(this._allCMDCtrls).forEach(v => matches.push(...this._allCMDCtrls[v]));
        let data = TS_MODIFY_TIP + "\nexport const enum NetCMD {\n";
        matches.unshift("syncInfo(data: IUser): void");
        matches.forEach(match => {
            const name = match.substring(0, match.trim().indexOf("("));
            const type = match.substring(match.indexOf("(") + 1, match.indexOf(")")).split(":")[1].trim();
            const temp = UpperFirst(name);
            const hasInput = type.includes("Input");
            let param1 = "";
            if (type) {
                param1 += "\t/**\n";
                param1 += `\t * @param output {@link ${ type.replace("Input", "Output") }}\n`;
                if (hasInput)
                    param1 += `\t * @param input {@link ${ type }}\n`;
                param1 += "\t */\n";
            }
            data += param1;
            data += `\t${ temp } = "NetCMD_${ temp }",\n\n`;

            if (hasInput) {
                param1 = "";
                if (type) {
                    param1 += "\t/**\n";
                    param1 += `\t * @param output {@link ${ type.replace("Input", "Output") }}\n`;
                    if (hasInput)
                        param1 += `\t * @param input {@link ${ type }}\n`;
                    param1 += "\t */\n";
                }
                data += param1;
                data += `\t${ temp + "Error" } = "NetCMD_${ temp }_Error",\n\n`;
            }
        });
        data = data.trim() + "\n}";
        fs.writeFileSync(NetCMDPath, data);
    }

    private buildService() {
        const serviceKeys: string[] = [];
        const netServiceDeclareInterfaces: string[] = [];
        Object.keys(this._allCMDCtrls).forEach(v => {
            netServiceDeclareInterfaces.push(v);
            this._allCMDCtrls[v].forEach(func => serviceKeys.push(`"${ func.substring(0, func.indexOf("(")) }"`));
        });
        const netService = this._serviceTemp.replace(/#serviceKeys#/g, serviceKeys.join(", "));
        fs.writeFileSync(NetServicePath, netService.trim());
        const netServiceDeclare = this._serviceDeclareTemp.replace(/#interfaces#/g, netServiceDeclareInterfaces.join(", "));
        fs.writeFileSync(NetServiceDeclarePath, netServiceDeclare);
    }

    private getAllNotifyController() {
        if (!fs.existsSync(NotifyInterfaceDir)) return console.log("目录不存在 " + NotifyInterfaceDir);
        const netCtrls = fs.readdirSync(NotifyInterfaceDir).filter(v => v.endsWith(".d.ts"));
        netCtrls.forEach(fileName => {
            const name = fileName.replace(".d.ts", "");
            const filePath = path.resolve(NotifyInterfaceDir, fileName);
            const fileContent = fs.readFileSync(filePath).toString();
            const matches = fileContent.match(/ INotify[\S]+ /g);
            if (matches?.length) {
                this._allNotifyCtrls[name] = matches;
            }
        });
    }

    private buildNetNotify() {
        const matches: string[] = [];
        Object.keys(this._allNotifyCtrls).forEach(v => matches.push(...this._allNotifyCtrls[v]));
        let data = TS_MODIFY_TIP + "\nexport const enum NetNotify {\n";
        matches.forEach(match => {
            match = match.trim();
            data += `\t/** @param data {@link ${ match }} */\n`;
            data += `\t${ match.substring(1) } = "NetNotify_${ match.substring(1) }",\n`;
        });
        data = data.trim() + "\n}";
        fs.writeFileSync(NetNotifyPath, data);
    }
}