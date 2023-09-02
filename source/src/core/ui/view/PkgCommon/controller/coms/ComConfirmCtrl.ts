import { BaseViewCtrl } from "../../../../core/BaseViewCtrl";
import { ViewID } from "../../../../core/ViewID";
import { ComConfirmMsg, ComConfirmView } from "../../view/coms/ComConfirmView";

export interface ComConfirmData {
	title: string,
	content: string,
	cancel: boolean;
	onCancel?: Laya.Handler;
	onConfirm?: Laya.Handler;
}

export class ComConfirmCtrl extends BaseViewCtrl<ComConfirmView, ComConfirmData>{

	override onAdded() {
		this.addMessage(ComConfirmMsg.OnBtnCancelClick, this.onBtnCancelClick);
		this.addMessage(ComConfirmMsg.OnBtnConfirmClick, this.onBtnConfirmClick);
	}

	override onForeground() {
		const { title, content, cancel } = this.data;
		this.view.refreshContent(title, content, cancel);
	}

	private onBtnCancelClick() {
		this.removeView(ViewID.UIConfirmView);
		if (this.data.onCancel)
			this.data.onCancel.run();
	}

	private onBtnConfirmClick() {
		this.removeView(ViewID.UIConfirmView);
		if (this.data.onConfirm)
			this.data.onConfirm.run();
	}

}