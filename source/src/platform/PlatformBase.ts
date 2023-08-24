import { Observer } from "../core/libs/event/Observer";
import { IArea, IPlatform, PlatformType } from "./PlatformDefine";

export abstract class PlatformBase extends Observer implements IPlatform {
    protected _platform: PlatformType;
    protected _safeArea: IArea;
    protected _menuBtnArea: IArea;
    get res(): string[] { return []; }
    get type() { return this._platform; }
    get safeArea() { return this._safeArea; }
    get menuBtnArea() { return this._menuBtnArea; }

    init() {
        this.onFix();
        this.onInit();

    }

    abstract showConfirm(title: string, msg: string): Promise<boolean>;

    abstract login(): Promise<string>;

    /** 引擎修复 */
    protected abstract onFix(): void;

    /** 初始化 */
    protected abstract onInit(): void;
}