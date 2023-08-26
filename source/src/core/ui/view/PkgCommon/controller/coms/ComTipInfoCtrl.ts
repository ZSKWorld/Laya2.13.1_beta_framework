import { BaseViewCtrl } from "../../../../core/BaseViewCtrl";
import { UIPoolKey } from "../../../../tool/UIPoolKey";
import { ComTipInfoView } from "../../view/Coms/ComTipInfoView";

export interface ComTipInfoData {
    text: string;
    color?: string;
}

export class ComTipInfoCtrl extends BaseViewCtrl<ComTipInfoView, ComTipInfoData>{
    private static displayTips: ComTipInfoCtrl[] = [];
    private static readonly showTime: number = 2000;
    private static readonly moveUpSpeed: number = 10;
    private static readonly tipSpace: number = 3;
    /** 剩余显示时间 */
    private _time: number;
    private _targetY: number;
    /** 是否到时该移除了 */
    private _timeToRemove: boolean;

    private static CorrectTipPosY() {
        const { displayTips, tipSpace } = ComTipInfoCtrl;
        if (displayTips.length == 0) return;
        const cnt = displayTips.length - 1;
        let startY = Laya.stage.height / 2;
        for (let i = cnt; i >= 0; i--) {
            const tip = displayTips[ i ];
            tip._targetY = startY - (i == cnt ? 0 : tip.view.height / 2);
            startY = tip._targetY - tip.view.height / 2 - tipSpace;
        }
        // const totalH = displayTips.reduce((pv, v) => pv + v.view.height, 0) + cnt * tipSpace;
        // let lastTip: ComTipInfoCtrl;
        // const startY = (Laya.stage.height - totalH) / 2;
        // for (let i = 0; i <= cnt; i++) {
        //     const tip = displayTips[ i ];
        //     tip._targetY = (lastTip ? (lastTip._targetY + lastTip.view.height / 2 + tipSpace) : startY) + tip.view.height / 2;
        //     lastTip = tip;
        // }
    }

    override onEnable() {
        const { view, data } = this;
        this._time = ComTipInfoCtrl.showTime;
        this._timeToRemove = false;
        view.setXY(Laya.stage.width + view.width / 2, Laya.stage.height / 2);
        view.setContent(data.text, data.color);
        Laya.Tween.to(view, { x: Laya.stage.width / 2 }, Math.log((view.height - 30) / 35 + 2) * 300, Laya.Ease.backOut, Laya.Handler.create(this, () => this._timeToRemove = true));
        ComTipInfoCtrl.displayTips.push(this);
        ComTipInfoCtrl.CorrectTipPosY();
    }

    override onUpdate() {
        const { view, _targetY, _time, _timeToRemove } = this;
        const moveUpSpeed = ComTipInfoCtrl.moveUpSpeed;
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

    override onDisable() {
        ComTipInfoCtrl.displayTips.remove(this);
        Laya.Pool.recover(UIPoolKey.TipInfo, this);
        ComTipInfoCtrl.CorrectTipPosY();
    }
}