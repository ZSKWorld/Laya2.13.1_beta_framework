import { ResPath } from "../../../../../common/ResPath";
import ComConfirm from "../../../../ui/PkgCommon/ComConfirm";

export const enum ComConfirmMsg {
	OnBtnCancelClick = "ComConfirm_OnBtnCancelClick",
	OnBtnConfirmClick = "ComConfirm_OnBtnConfirmClick",
}

export class ComConfirmView extends ExtensionClass<IView, ComConfirm>(ComConfirm) {
	static readonly PkgRes = ResPath.PkgPath.PkgCommon;

	override onCreate() {
		const { btn_cancel, btn_confirm } = this;
		btn_cancel.onClick(this, this.sendMessage, [ ComConfirmMsg.OnBtnCancelClick ]);
		btn_confirm.onClick(this, this.sendMessage, [ ComConfirmMsg.OnBtnConfirmClick ]);
	}

	refreshContent(title: string, content: string, cancel:boolean) {
		const { txt_title, txt_content ,btn_cancel} = this;
		txt_title.text = title;
		txt_content.text = content;
		btn_cancel.visible = cancel;
	}

}
