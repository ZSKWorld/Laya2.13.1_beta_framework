import { ResPath } from "../../../../common/ResPath";
import { ExtensionClass } from "../../../../libs/utils/Util";
import { ViewExtension } from "../../../core/Interfaces";
import ComNumInput from "../../../ui/PkgCommon/ComNumInput";

export const enum ComNumInputMsg {
	OnBtnBgClick = "ComNumInput_OnBtnBgClick",
	OnBtnSubmitClick = "ComNumInput_OnBtnSubmitClick",
}

export class ComNumInputView extends ExtensionClass<ViewExtension, ComNumInput>(ComNumInput) {
	static readonly PkgRes = ResPath.UIPath.PkgCommon;

	override onCreate(): void {
		const { BtnBg, BtnSubmit } = this;
		BtnBg.onClick(this, this.sendMessage, [ ComNumInputMsg.OnBtnBgClick ]);
		BtnSubmit.onClick(this, this.sendMessage, [ ComNumInputMsg.OnBtnSubmitClick ]);
	}

	refresh(title: string, min: number, max: number) {
		this.TxtTitle.text = title;
		this.Slider.min = min;
		this.Slider.max = max;
	}

}
