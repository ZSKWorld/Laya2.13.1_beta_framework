import { GameEvent } from "../core/common/GameEvent";
import { PlatformBase } from "./PlatformBase";
import { PlatformType } from "./PlatformDefine";

export class PlatformWeb extends PlatformBase {
    override get res() {
        return [
            ResPath.FontPath.Font16,
        ];
    }
    override get safeArea() {
        if (!this._safeArea) {
            const { width, height } = Laya.stage;
            this._safeArea = { width, height, top: 0, bottom: height, left: 0, right: width, };
        }
        return this._safeArea;
    }
    override get menuBtnArea() {
        if (!this._menuBtnArea) {
            this._menuBtnArea = { width: 0, height: 0, top: 0, bottom: 0, left: 0, right: 0, };
        }
        return this._menuBtnArea;
    }

    override showConfirm(title: string, msg: string) {
        return Promise.resolve(confirm(msg));
    }

    protected onFix() {

    }

    protected onInit() {
        this._platform = PlatformType.Web;

        Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
        // Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH;
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
        Laya.Text.defaultFont = ResPath.FontName.Font16;
        fgui.UIConfig.defaultFont = ResPath.FontName.Font16;
        // Laya.Text.defaultFont = "SimHei";
        // fgui.UIConfig.defaultFont = "SimHei";
        Laya.stage.on(Laya.Event.VISIBILITY_CHANGE, this, () => {
            if (Laya.stage.isVisibility) this.dispatch(GameEvent.OnGameShow);
            else this.dispatch(GameEvent.OnGameHide);
        });
        Laya.MouseManager.multiTouchEnabled = false;
    }

}