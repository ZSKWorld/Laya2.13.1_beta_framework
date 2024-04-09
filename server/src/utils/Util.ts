import * as fs from "fs";
import * as path from "path";
import { TimeUtil } from "./TimeUtil";
export class Util {
    /**生成uid */
    static CreateUID() {
        return (TimeUtil.getTimeStamp() ** (Math.random() + 0.01)).toString(32).replace(".", "");
    }

    static generateUUID() {
        let d = new Date().getTime();
        const temp = 36;
        const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * temp) % temp | 0;
            d = Math.floor(d / temp);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(temp);
        });
        return uuid;
    }

    static getData(account: string): OriginData<IUser> {
        const filePath = this.getDataPath(account);
        if (fs.existsSync(filePath) == false) return null;
        const conent = fs.readFileSync(filePath).toString();
        try {
            return JSON.parse(conent);
        } catch (error) {
            return null;
        }
    }

    static saveData(data: IUser) {
        const filePath = this.getDataPath(data.account.account);
        if (!filePath) return console.log("路径不存在", data.account.account, filePath);
        fs.writeFileSync(filePath, JSON.stringify(data));
    }

    private static getDataPath(account: string) {
        if (!account) return null;
        const fileName = (account).split("").reduce((pValue, value) => {
            return pValue + value.charCodeAt(0);
        }, "");
        return path.resolve(__dirname, "../../../data/" + fileName + ".json");
    }
}