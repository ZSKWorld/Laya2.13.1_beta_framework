import * as fs from "fs";
import * as path from "path";
import { TimeUtil } from "./TimeUtil";
export class Util {
    /**生成uid */
    static CreateUID() {
        return (TimeUtil.getTimeStamp() ** (Math.random() + 0.01)).toString(32).replace(".", "");
    }

    static getData(account: string, password: string): IUserData {
        const filePath = this.getDataPath(account, password);
        if (fs.existsSync(filePath) == false) return null;
        const conent = fs.readFileSync(filePath).toString();
        try {
            return JSON.parse(conent);
        } catch (error) {
            return null;
        }
    }

    static saveData(data: IUserData) {
        const filePath = this.getDataPath(data.account, data.password);
        if (!filePath) return;
        fs.writeFileSync(filePath, JSON.stringify(data));
    }

    private static getDataPath(account: string, password: string) {
        if (!account || !password) return null;
        const fileName = (account + "" + password).split("").reduce((pValue, value) => {
            return pValue + value.charCodeAt(0);
        }, "");
        return path.resolve(__dirname, "../../../data/" + fileName + ".json");
    }
}