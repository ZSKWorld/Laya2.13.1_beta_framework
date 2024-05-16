import * as fs from "fs";
import * as path from "path";
export class UserUtil {
    static userExist(account:string) {
        const filePath = this.getDataPath(account);
        return fs.existsSync(filePath);
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