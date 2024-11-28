import * as fs from "fs";
import * as path from "path";
import { BuildBase } from "./BuildBase";
import { Server_NetNotifyPath, Server_NotifyInterfaceDir, TS_MODIFY_TIP } from "./Const";
export class BuildServerNet extends BuildBase {
    private _allNotifyCtrls: { [key: string]: string[] } = {};
    doBuild() {
        this.getAllNotifyController();
        this.buildNetNotify();
    }

    private getAllNotifyController() {
        if (!fs.existsSync(Server_NotifyInterfaceDir)) return console.log("目录不存在 " + Server_NotifyInterfaceDir);
        const netCtrls = fs.readdirSync(Server_NotifyInterfaceDir).filter(v => v.endsWith(".d.ts"));
        netCtrls.forEach(fileName => {
            const name = fileName.replace(".d.ts", "");
            const filePath = path.resolve(Server_NotifyInterfaceDir, fileName);
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
        fs.writeFileSync(Server_NetNotifyPath, data);
    }
}