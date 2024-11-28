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
    static get released() { return this._released; }
    static get platform() { return this._platform; }
    static init(data: IGameConfig) {
        this._released = data.released;
        this._platform = data.platform;
    }
}
WindowImmit("GameConfig", GameConfig);