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

	override onDisable() {
		const { onCancel, onConfirm } = this.data;
		if (onCancel) {
			this.data.onCancel = null;
			onCancel.recover();
		}
		if (onConfirm) {
			this.data.onConfirm = null;
			onConfirm.recover();
		}
	}

	private onBtnCancelClick() {
		this.removeView(ViewID.UIConfirmView);
		const onCancel = this.data.onCancel;
		if (onCancel) {
			this.data.onCancel = null;
			onCancel.run();
		}
	}

	private onBtnConfirmClick() {
		this.removeView(ViewID.UIConfirmView);
		const onConfirm = this.data.onConfirm;
		if (onConfirm) {
			this.data.onConfirm = null;
			onConfirm.run();
		}
	}

}