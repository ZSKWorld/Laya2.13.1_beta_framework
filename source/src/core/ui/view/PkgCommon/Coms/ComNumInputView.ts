import { ExtensionClass } from "../../../../libs/utils/Util";
import { ViewExtension } from "../../../core/Interfaces";
import ComNumInput from "../../../ui/PkgCommon/ComNumInput";
import { ResPath } from "../../../../common/ResPath";

export const enum ComNumInputMsg {
	OnBtnBgClick = "ComNumInput_OnBtnBgClick",
	OnBtnBattleClick = "ComNumInput_OnBtnBattleClick",
}

export class ComNumInputView extends ExtensionClass<ViewExtension, ComNumInput>(ComNumInput) {
    static readonly PkgRes = ResPath.UIPath.PkgCommon;

	override onCreate(): void {
        const { BtnBg, BtnBattle } = this;
	    BtnBg.onClick(this, this.sendMessage, [ ComNumInputMsg.OnBtnBgClick ]);
	    BtnBattle.onClick(this, this.sendMessage, [ ComNumInputMsg.OnBtnBattleClick ]);
    }

}
