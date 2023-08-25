import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { UIPoolKey } from "../../../tool/UIPoolKey";
import { ComTipInfoView } from "../../../view/PkgCommon/Coms/ComTipInfoView";

export interface ComTipInfoData {
    text: string;
    color?: string;
}

export class ComTipInfoCtrl extends BaseViewCtrl<ComTipInfoView, ComTipInfoData>{
    private static displayTips: ComTipInfoCtrl[] = [];
    private static readonly MoveUpSpeed: number = 10;
    private static readonly TipSpace: number = 85;
    /** 剩余显示时间 */
    private _time: number;
    private _targetY: number;
    /** 是否到时该移除了 */
    private _timeToRemove: boolean;

    override onEnable(): void {
        const tips = ComTipInfoCtrl.displayTips;
        tips.forEach(v => v.onTipChanged(true));
        tips.push(this);
        const { view, data } = this;
        this._time = 2000;
        this._timeToRemove = false;
        this._targetY = Laya.stage.height / 2;
        view.setXY(Laya.stage.width + view.width / 2, this._targetY);
        view.setContent(data.text, data.color);
        Laya.Tween.to(view, { x: Laya.stage.width / 2 }, 300, Laya.Ease.backOut, Laya.Handler.create(this, () => this._timeToRemove = true));
    }

    override onUpdate(): void {
        const { view, _targetY, _time, _timeToRemove } = this;
        const moveUpSpeed = ComTipInfoCtrl.MoveUpSpeed;
        const subY = _targetY - view.y;
        if (subY != 0)
            view.y += Math.abs(subY) > moveUpSpeed ? (Math.abs(subY) / subY * moveUpSpeed) : subY;
        if (_timeToRemove) {
            if (_time > 0) this._time -= Laya.timer.delta;
            else {
                this._timeToRemove = false;
                Laya.Tween.to(view, { x: -view.width / 2 }, 300, Laya.Ease.backIn, Laya.Handler.create(view, view.removeFromParent));
            }
        }
    }

    override onDisable(): void {
        const tips = ComTipInfoCtrl.displayTips;
        for (let i = 0, cnt = tips.length; i < cnt; i++) {
            const tip = tips[ i ];
            if (tip == this) {
                tips.splice(i, 1);
                break;
            }
            else tip.onTipChanged(false);
        }
        Laya.Pool.recover(UIPoolKey.TipInfo, this);
    }

    private onTipChanged(toTop: boolean) {
        this._targetY += (toTop ? -1 : 1) * ComTipInfoCtrl.TipSpace;
    }
}