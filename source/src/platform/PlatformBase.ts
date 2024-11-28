import { Observer } from "../core/game/event/Observer";
import { PlatformType } from "./PlatformDefine";

export abstract class PlatformBase extends Observer implements IPlatform {
    protected _platform: PlatformType;
    protected _safeArea: ISafeArea;
    protected _menuBtnArea: ISafeArea;
    get res() { return [] as string[]; }
    get type() { return this._platform; }
    get safeArea() { return this._safeArea; }
    get menuBtnArea() { return this._menuBtnArea; }

    init() {
        this.onFix();
        this.onInit();
    }

    showConfirm(title: string, msg: string) {
        return Promise.resolve(false);
    }

    /** 引擎修复 */
    protected abstract onFix(): void;

    /** 初始化 */
    protected abstract onInit(): void;
}