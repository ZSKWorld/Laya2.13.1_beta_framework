import { GameEvent } from "../core/common/GameEvent";
import { ResPath } from "../core/common/ResPath";
import GameConfig from "../GameConfig";
import { PlatformBase } from "./PlatformBase";
import { PlatformType } from "./PlatformDefine";

export class PlatformWeb extends PlatformBase {
    override get res() {
        return [ ResPath.FontPath.Font15 ];
    }
    override get safeArea() {
        if (!this._safeArea) {
            const { width, height } = Laya.stage;
            this._safeArea = { width: width, height: height, top: 0, bottom: height, left: 0, right: width, };
        }
        return this._safeArea;
    }
    override get menuBtnArea() {
        if (!this._menuBtnArea) {
            this._menuBtnArea = { width: 0, height: 0, top: 0, bottom: 0, left: 0, right: 0, };
        }
        return this._menuBtnArea;
    }

    showConfirm(title: string, msg: string) {
        return new Promise<boolean>(resolve => resolve(confirm(msg)));
    }

    protected onFix() {

    }

    protected onInit() {
        this._platform = PlatformType.Web;

        //打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
        if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true") Laya.enableDebugPanel();
        if (GameConfig.physicsDebug && Laya[ "PhysicsDebugDraw" ]) Laya[ "PhysicsDebugDraw" ].enable();
        if (GameConfig.stat) Laya.Stat.show();
        // Laya.alertGlobalError(true);

        Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
        // Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH;
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
        // Laya.Text.defaultFont = ResPath.FontName.Font15;
        // fgui.UIConfig.defaultFont = ResPath.FontName.Font15;
        Laya.Text.defaultFont = "SimHei";
        fgui.UIConfig.defaultFont = "SimHei";
        Laya.stage.on(Laya.Event.VISIBILITY_CHANGE, this, () => {
            if (Laya.stage.isVisibility) this.dispatch(GameEvent.OnGameShow);
            else this.dispatch(GameEvent.OnGameHide);
        });
    }

}