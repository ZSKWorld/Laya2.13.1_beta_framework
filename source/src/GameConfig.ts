import { PlatformType } from "./platform/PlatformDefine";

interface IGameConfig {
    released: boolean;
    platform: PlatformType;
    scaleMode: string;
    screenMode: string;
    alignV: string;
    alignH: string;
}

export class GameConfig {
    private static _released: boolean;
    private static _platform: PlatformType;
    private static _scaleMode: string;
    private static _screenMode: string;
    private static _alignV: string;
    private static _alignH: string;
    static get released() { return this._released; }
    static get platform() { return this._platform; }
    static get scaleMode() { return this._scaleMode; }
    static get screenMode() { return this._screenMode; }
    static get alignV() { return this._alignV; }
    static get alignH() { return this._alignH; }
    static init(data: IGameConfig) {
        this._released = data.released;
        this._platform = data.platform;
        this._scaleMode = data.scaleMode;
        this._screenMode = data.screenMode;
        this._alignV = data.alignV;
        this._alignH = data.alignH;
    }
}
WindowImmit("GameConfig", GameConfig);