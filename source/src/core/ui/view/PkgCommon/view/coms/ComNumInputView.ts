import ComNumInput from "../../../../ui/PkgCommon/ComNumInput";
import { ResPath } from "../../../../../common/ResPath";

export const enum ComNumInputMsg {
	OnBtnSubmitClick = "ComNumInput_OnBtnSubmitClick",
}

export class ComNumInputView extends ExtensionClass<IView, ComNumInput>(ComNumInput) {
    static readonly PkgRes = ResPath.PkgPath.PkgCommon;

	override onCreate() {
        const { btn_submit } = this;
		btn_submit.onClick(this, this.sendMessage, [ ComNumInputMsg.OnBtnSubmitClick ]);
    }

}
