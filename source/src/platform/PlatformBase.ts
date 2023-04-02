import { IPlatform, PlatformType } from "./PlatformDefine";

export abstract class PlatformBase implements IPlatform{
    protected _platform: PlatformType;
    get platform() { return this._platform; }

    abstract init(): void;

    abstract fix(): void;
    
    abstract login(): void;
}