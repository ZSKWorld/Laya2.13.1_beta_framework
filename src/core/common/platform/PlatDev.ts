import { playerData } from "../../playerData/PlayerData";
import { LangCode } from "../../table/LangCode";
import { IPlatform } from "./IPlatform";

export class PlatDev implements IPlatform {
    login(account: string, password: string): Promise<LangCode> {
        return new Promise<LangCode>((resolve) => {
            resolve(playerData.loginData(account, password));
        });
    }
    register(account: string, password: string, nickName: string): Promise<LangCode> {
        return new Promise<LangCode>((resolve) => {
            resolve(playerData.register(account, password, nickName));
        });
    }
    confirm(msg: string, confirmText: string, showCancel: boolean, success?: Function, fail?: Function): void {
        const result = window.confirm(msg);
        if (result) success && success();
        else fail && fail();
    }
}