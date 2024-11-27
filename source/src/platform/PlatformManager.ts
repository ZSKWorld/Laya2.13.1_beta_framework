import { IPlatform, PlatformType } from "./PlatformDefine";
import { PlatformWeb } from "./PlatformWeb";
import { PlatformWX } from "./PlatformWX";

class PlatformManager {
    private _platform: IPlatform;
    /** 当前平台 */
    get platform() { return this._platform; }
    /** 是否PC */
    get inWeb() { return this.isPlatform(PlatformType.Web); }
    /** 是否微信小游戏 */
    get inMiniGame() { return this.isPlatform(PlatformType.Wechat); }

    init() {
        if (!this._platform) {
            if (Laya.Browser.onMiniGame) this._platform = new PlatformWX();
            else this._platform = new PlatformWeb();
            this._platform.init();
        }
    }

    showConfirm(title: string, msg: string) {
        if (this._platform) return this._platform.showConfirm(title, msg);
        else return Promise.resolve(false);
    }

    private isPlatform(platform: PlatformType) {
        if (!this._platform) return false;
        return this._platform.type == platform;
    }
}
export const platformMgr = new PlatformManager();
WindowImmit("platformMgr", platformMgr);