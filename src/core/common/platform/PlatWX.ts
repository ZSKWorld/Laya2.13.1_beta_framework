import { LangCode } from "../../table/LangCode";
import { IPlatform } from "./IPlatform";

export class PlatWX implements IPlatform {
    login(account: string, password: string): Promise<LangCode> {
        return null;
    }
    register(account: string, password: string, nickName: string): Promise<LangCode> {
        return null;
    }
    confirm(msg: string, confirmText: string, showCancel: boolean, success?: Function, fail?: Function): void {

    }
}