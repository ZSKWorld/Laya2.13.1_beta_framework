import { ResPath } from "../../../../common/ResPath";
import { ExtensionClass } from "../../../../libs/utils/Util";
import { ViewExtension } from "../../../core/interfaces";
import ComNumInput from "../../../ui/PkgCommon/ComNumInput";

export const enum ComNumInputMsg {
    OnBtnBgClick = "ComNumInput_OnBtnBgClick",
    OnBtnBattleClick = "ComNumInput_OnBtnBattleClick",
}

export class ComNumInputView extends ExtensionClass<ViewExtension, ComNumInput>(ComNumInput) {
    static PkgRes = ResPath.Ui_PkgCommon;

    onCreate(): void {
        const { BtnBg, BtnBattle } = this;
        BtnBg.onClick(this, this.sendMessage, [ComNumInputMsg.OnBtnBgClick]);
        BtnBattle.onClick(this, this.sendMessage, [ComNumInputMsg.OnBtnBattleClick]);
    }

    refresh(title: string, min: number, max: number) {
        this.TxtTitle.text = title;
        this.Slider.min = min;
        this.Slider.max = max;
    }

}
