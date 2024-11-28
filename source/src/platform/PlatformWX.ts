import { GameEvent } from "../core/common/GameEvent";
import { GameUtil } from "../core/common/GameUtil";
import { PlatformBase } from "./PlatformBase";
import { PlatformType } from "./PlatformDefine";

/** 比较微信基础库版本号 */
function cmpVersion(v1: string, v2: string) {
    const v1Arr = v1.split('.');
    const v2Arr = v2.split('.');
    const len = Math.max(v1Arr.length, v2Arr.length);
    while (v1Arr.length < len) v1Arr.push('0');
    while (v2Arr.length < len) v2Arr.push('0');
    for (let i = 0; i < len; i++) {
        const num1 = parseInt(v1Arr[i]);
        const num2 = parseInt(v2Arr[i]);
        if (num1 > num2) return 1;
        else if (num1 < num2) return -1;
    }
    return 0;
}
/** v1 大于等于 v2 */
function gtEqVersion(v1: string, v2: string) { return cmpVersion(v1, v2) == 1 || cmpVersion(v1, v2) == 0; }
/** v1 小于等于 v2 */
function ltEqVersion(v1: string, v2: string) { return cmpVersion(v1, v2) == -1 || cmpVersion(v1, v2) == 0; }

export class PlatformWX extends PlatformBase {
    override get safeArea() {
        if (!this._safeArea) {
            const safeArea = wx.getWindowInfo().safeArea;
            if (safeArea) {
                const { width, height, top, bottom, left, right } = safeArea;
                this._safeArea = {
                    width: GameUtil.PRX2LRX(width),
                    height: GameUtil.PRY2LRY(height),
                    top: GameUtil.PRY2LRY(top),
                    bottom: GameUtil.PRY2LRY(bottom),
                    left: GameUtil.PRX2LRX(left),
                    right: GameUtil.PRX2LRX(right),
                };
            } else {
                const { width, height } = Laya.stage;
                this._safeArea = { width, height, top: 0, bottom: height, left: 0, right: width, };
            }
        }
        return this._safeArea;
    }
    override get menuBtnArea() {
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
            const { SDKVersion } = wx.getAppBaseInfo();
            if (gtEqVersion(SDKVersion, "2.16.0") && ltEqVersion(SDKVersion, "2.20.0")) {
                Laya.stage.off(Laya.Event.RESIZE, null, MiniInput._onStageResize);
                MiniInput._onStageResize = function () {
                    const ts = Laya.stage["_canvasTransform"].identity();
                    ts.scale((Laya.Browser.width / Laya.Render.canvas.width / Laya.Browser.pixelRatio), Laya.Browser.height / Laya.Render.canvas.height / Laya.Browser.pixelRatio);
                    const canvasStyle = Laya.Render.canvas.style;
                    canvasStyle.transform = canvasStyle.webkitTransform = canvasStyle.msTransform = canvasStyle.mozTransform = canvasStyle.oTransform = "";
                }
                Laya.stage.on(Laya.Event.RESIZE, null, MiniInput._onStageResize);
            }
        }
    }

    protected onInit(): void {
        Laya.URL.exportSceneToJson = true;
        this._platform = PlatformType.Wechat;
        
        Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_AUTO;
        Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
        Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
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