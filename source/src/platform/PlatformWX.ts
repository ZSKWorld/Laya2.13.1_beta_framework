import { GameEvent } from "../core/common/GameEvent";
import { GameUtil } from "../core/common/GameUtil";
import { PlatformBase } from "./PlatformBase";
import { PlatformType } from "./PlatformDefine";

export class PlatformWX extends PlatformBase {
    // private _userInfoBtn: WechatMinigame.UserInfoButton;
    override get safeArea() {
        if (!this._safeArea) {
            const { width, height, top, bottom, left, right } = wx.getSystemInfoSync().safeArea;
            this._safeArea = {
                width: GameUtil.PRX2LRX(width),
                height: GameUtil.PRY2LRY(height),
                top: GameUtil.PRY2LRY(top),
                bottom: GameUtil.PRY2LRY(bottom),
                left: GameUtil.PRX2LRX(left),
                right: GameUtil.PRX2LRX(right),
            };
        }
        return this._safeArea;
    }
    override get menuBtnArea() {
        wx.onShow
        if (!this._menuBtnArea) {
            const { width, height, top, bottom, left, right } = wx.getMenuButtonBoundingClientRect();
            this._menuBtnArea = {
                width: GameUtil.PRX2LRX(width),
                height: GameUtil.PRY2LRY(height),
                top: GameUtil.PRY2LRY(top),
                bottom: GameUtil.PRY2LRY(bottom),
                left: GameUtil.PRX2LRX(left),
                right: GameUtil.PRX2LRX(right),
            };
        }
        return this._menuBtnArea;
    }

    override showConfirm(title: string, msg: string) {
        return new Promise<boolean>(resolve => {
            wx.showModal({
                title: title,
                content: msg,
                cancelText: "取消",
                confirmText: "确定",
                success: (res) => {
                    if (res.confirm) resolve(true);
                    else resolve(false);
                },
                fail: (err) => {
                    resolve(false);
                }
            });
        });
    }
    protected onFix() {
        //修复微信版本库2.16 - 2.20屏幕显示只有四分之一的问题
        const MiniInput = Laya["MiniInput"];
        if (MiniInput) {
            Laya.stage.off("resize", null, MiniInput._onStageResize);
            MiniInput._onStageResize = function (): void {
                var ts = Laya.stage["_canvasTransform"].identity();
                ts.scale((Laya.Browser.width / Laya.Render.canvas.width / Laya.Browser.pixelRatio), Laya.Browser.height / Laya.Render.canvas.height / Laya.Browser.pixelRatio);
                var canvasStyle = Laya.Render.canvas.style;
                canvasStyle.transform = canvasStyle.webkitTransform = canvasStyle.msTransform = canvasStyle.mozTransform = canvasStyle.oTransform = "";
            }
            Laya.stage.on("resize", null, MiniInput._onStageResize);
        }
    }

    protected onInit(): void {
        this._platform = PlatformType.Wechat;
        Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_AUTO;
        Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
        Laya.Text.defaultFont = "SimHei";
        fgui.UIConfig.defaultFont = "SimHei";
        Laya.Stat.show(0, this.safeArea.top);
        wx.onShow((res) => {
            this.dispatch(GameEvent.OnGameShow);
        });
        wx.onHide((res) => {
            this.dispatch(GameEvent.OnGameHide);
        });
    }

}