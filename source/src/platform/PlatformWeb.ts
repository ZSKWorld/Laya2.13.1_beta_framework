import { PlatformBase } from "./PlatformBase";
import { PlatformType } from "./PlatformDefine";

export class PlatformWeb extends PlatformBase {
    init(): void {
        this._platform = PlatformType.Web;
        Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL
    }
    
    fix(): void {

    }

    login(): void {
        
    }

}