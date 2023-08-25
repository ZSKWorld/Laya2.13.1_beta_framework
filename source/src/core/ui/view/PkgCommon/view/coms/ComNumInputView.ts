import ComNumInput from "../../../../ui/PkgCommon/ComNumInput";
import { ResPath } from "../../../../../common/ResPath";

export const enum ComNumInputMsg {
	OnBtnBgClick = "ComNumInput_OnBtnBgClick",
	OnBtnSubmitClick = "ComNumInput_OnBtnSubmitClick",
}

export class ComNumInputView extends ExtensionClass<IView, ComNumInput>(ComNumInput) {
    static readonly PkgRes = ResPath.PkgPath.PkgCommon;

	override onCreate() {
        const { BtnBg, BtnSubmit } = this;
		BtnBg.onClick(this, this.sendMessage, [ ComNumInputMsg.OnBtnBgClick ]);
		BtnSubmit.onClick(this, this.sendMessage, [ ComNumInputMsg.OnBtnSubmitClick ]);
    }

}
