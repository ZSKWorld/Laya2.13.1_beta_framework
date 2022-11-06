import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { UIPoolKey } from "../../../tool/UIPoolKey";
import { ComTipInfoView } from "../../../view/PkgCommon/Coms/ComTipInfoView";

export interface ComTipInfoData {
    text: string;
    color?: string;
}

export class ComTipInfoCtrl extends BaseViewCtrl<ComTipInfoView, ComTipInfoData>{
    private static tipIndex = 0;
    private static displayTips: ComTipInfoCtrl[] = [];
    private static readonly MoveUpSpeed: number = 10;
    private _time: number;
    private _moveEnable: boolean;
    private _moveUpDis: number = 0;
    private _tipIndex: number = 0;

    override onEnable(): void {
        const tips = ComTipInfoCtrl.displayTips;
        this._tipIndex = ComTipInfoCtrl.tipIndex++;
        tips.forEach(v => v.moveOffset(true));
        tips.push(this);
        const { view, data } = this;
        this._time = 1000;
        this._moveUpDis = 0;
        this._moveEnable = false;
        view.setXY(Laya.stage.width + view.width / 2, Laya.stage.height / 2);
        view.setContent(data.text, data.color);
        Laya.Tween.to(view, { x: Laya.stage.width / 2 }, 300, Laya.Ease.backOut, Laya.Handler.create(this, () => this._moveEnable = true));
    }

    override onUpdate(): void {
        const { view } = this;
        if (this._moveUpDis != 0) {
            const top = this._moveUpDis > 0;
            if (Math.abs(this._moveUpDis) >= ComTipInfoCtrl.MoveUpSpeed) {
                const offset = (top ? -1 : 1) * ComTipInfoCtrl.MoveUpSpeed;
                this._moveUpDis += offset;
                view.y += offset;
            } else {
                view.y -= this._moveUpDis;
                this._moveUpDis = 0;
            }
        }
        if (this._moveEnable) {
            if (this._time > 0) this._time -= Laya.timer.delta;
            else {
                this._moveEnable = false;
                Laya.Tween.to(view, { x: -view.width / 2 }, 300, Laya.Ease.backIn, Laya.Handler.create(view, view.removeFromParent));
            }
        }
    }

    override onDisable(): void {
        const { _tipIndex, view } = this;
        const tips = ComTipInfoCtrl.displayTips;
        for (let i = tips.length - 1; i >= 0; i--) {
            const tip = tips[ i ];
            if (tip == this) tips.splice(i, 1);
            else tip._tipIndex < _tipIndex && tip.moveOffset(false)
        }
        Laya.Pool.recover(UIPoolKey.TipInfo, view);
    }

    private moveOffset(top: boolean) {
        this._moveUpDis += (top ? 1 : -1) * this.view.height;
    }
}