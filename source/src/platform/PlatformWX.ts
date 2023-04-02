import { PlatformBase } from "./PlatformBase";
import { PlatformType } from "./PlatformDefine";

export class PlatformWX extends PlatformBase {
    init(): void {
        this._platform = PlatformType.WX;
        Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_AUTO
    }

    fix(): void {
        //修复微信版本库2.16 - 2.20屏幕显示只有四分之一的问题
		const MiniInput = Laya[ "MiniInput" ];
		if (MiniInput) {
			Laya.stage.off("resize", null, MiniInput._onStageResize);
			MiniInput._onStageResize = function () { 
				var ts = Laya.stage["_canvasTransform"].identity();
				ts.scale((Laya.Browser.width / Laya.Render.canvas.width / Laya.Browser.pixelRatio), Laya.Browser.height / Laya.Render.canvas.height / Laya.Browser.pixelRatio);
				var canvasStyle = Laya.Render.canvas.style;
				canvasStyle.transform = canvasStyle.webkitTransform = canvasStyle.msTransform = canvasStyle.mozTransform = canvasStyle.oTransform = "";
			}
			Laya.stage.on("resize", null, MiniInput._onStageResize);	
		}
    }

    login(): void {
        
    }

}