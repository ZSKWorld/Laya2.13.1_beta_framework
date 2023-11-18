import { BattleType } from "../../../../net/enum/BattleEnums";
import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { UIUtility } from "../../../tool/UIUtility";
import { UIBattleConfirmView } from "../view/UIBattleConfirmView";
export interface UIBattleConfirmData {
    type: BattleType;
    data: BattleCfgData;
}

export class UIBattleConfirmCtrl extends BaseViewCtrl<UIBattleConfirmView, UIBattleConfirmData>{

    override onAdded() {

    }

    override onEnable() {
        this.view.com_panel.viewCtrl.data = this.data;
    }

    override onOpenAni() {
        const { graph_bg, com_panel } = this.view;
        return UIUtility.AnimAlphaIn(graph_bg, com_panel);
    }

    override onCloseAni() {
        const { graph_bg, com_panel } = this.view;
        return UIUtility.AnimAlphaOut(graph_bg, com_panel);
    }
}