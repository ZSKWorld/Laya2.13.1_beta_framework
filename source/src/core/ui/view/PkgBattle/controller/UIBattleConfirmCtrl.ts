import { BattleType } from "../../../../userData/const/BattleEnums";
import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { UIUtil } from "../../../tool/UIUtil";
import { UIBattleConfirmView } from "../view/UIBattleConfirmView";
export interface UIBattleConfirmData {
    type: BattleType;
    data: BattleCfgData;
}

export class UIBattleConfirmCtrl extends BaseViewCtrl<UIBattleConfirmView, UIBattleConfirmData> {

    override onAdded() {

    }

    override onEnable() {
        this.view.com_panel.viewCtrl.data = this.data;
    }

    override onOpenAni() {
        const { graph_bg, com_panel } = this.view;
        return UIUtil.animAlphaIn(graph_bg, com_panel);
    }

    override onCloseAni() {
        const { graph_bg, com_panel } = this.view;
        return UIUtil.animAlphaOut(graph_bg, com_panel);
    }
}