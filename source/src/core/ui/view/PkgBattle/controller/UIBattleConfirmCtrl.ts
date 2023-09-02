import { BattleType } from "../../../../net/enum/BattleEnums";
import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { UIBattleConfirmMsg, UIBattleConfirmView } from "../view/UIBattleConfirmView";
import { ComBattleConfirmCtrl } from "./coms/ComBattleConfirmCtrl";
export interface UIBattleConfirmData {
    type: BattleType;
    data: BattleLevel;
}

export class UIBattleConfirmCtrl extends BaseViewCtrl<UIBattleConfirmView, UIBattleConfirmData>{
    private _panelCtrl: ComBattleConfirmCtrl;

    override onAdded() {
        this._panelCtrl = this.view.com_panel.getComponent(ComBattleConfirmCtrl);
    }

    override onEnable() {
        this._panelCtrl.data = this.data;
    }

    override onOpenAni() {
        return new Promise<void>(resolve => this.view.trans_show.play(Laya.Handler.create(null, resolve)));
    }

    override onCloseAni() {
        return new Promise<void>(resolve => this.view.trans_close.play(Laya.Handler.create(null, resolve)));
    }
}