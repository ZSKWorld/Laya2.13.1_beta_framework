import { IPlatform } from "./PlatformDefine";
import { PlatformWeb } from "./PlatformWeb";
import { PlatformWX } from "./PlatformWX";

class PlatformManager {
    private _platform: IPlatform;
    /** 当前平台 */
    get platform() { return this._platform?.platform; }

    Init() {
        if (!this._platform) {
            if (Laya.Browser.onPC) this._platform = new PlatformWeb();
            if (Laya.Browser.onMiniGame) this._platform = new PlatformWX();
            this._platform.init();
            this._platform.fix();
        }
    }

}
export const platformMgr = new PlatformManager();