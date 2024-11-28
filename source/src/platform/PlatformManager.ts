import { GameConfig } from "../GameConfig";
import { PlatformType } from "./PlatformDefine";
import { PlatformWeb } from "./PlatformWeb";
import { PlatformWX } from "./PlatformWX";

class PlatformManager {
    private _platform: IPlatform;
    /** 当前平台 */
    get platform() {
        if (!this._platform) {
            switch (GameConfig.platform) {
                case PlatformType.Web: this._platform = new PlatformWeb(); break;
                case PlatformType.Wechat: this._platform = new PlatformWX(); break;
            }
            this._platform.init();
        }
        return this._platform;
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