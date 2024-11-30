import { BattleType } from "../../../../userData/const/BattleEnums";
import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { UIUtil } from "../../../tool/UIUtil";
import { UIBattleConfirmView } from "../view/UIBattleConfirmView";
export interface UIBattleConfirmData {
    type: BattleType;
    data: BattleCfgData;
}

export class UIBattleConfirmCtrl extends BaseViewCtrl<UIBattleConfirmView, UIBattleConfirmData> {

    override onEnable() {
        this.view.com_panel.viewCtrl.data = this.data;
    }

    override onOpenAni() {
        return UIUtil.animAlphaIn(this.view.graph_bg, this.view.com_panel);
    }

    override onCloseAni() {
        return UIUtil.animAlphaOut(this.view.graph_bg, this.view.com_panel);
    }
}