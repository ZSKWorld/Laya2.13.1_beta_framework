import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { UIUtil } from "../../../tool/UIUtil";
import { UIConfirmView } from "../view/UIConfirmView";

export interface UIConfirmData {
	title: string,
	content: string,
	cancel: boolean,
	onCancel?: Laya.Handler;
	onConfirm?: Laya.Handler;
}

export class UIConfirmCtrl extends BaseViewCtrl<UIConfirmView, UIConfirmData> {

	override onAdded() {

	}

	override onForeground() {
		this.view.com_panel.viewCtrl.data = this.data;
		this.view.com_panel.viewCtrl.onForeground();
	}

	override onOpenAni() {
		const { graph_bg, com_panel } = this.view;
		return UIUtil.AnimAlphaIn(graph_bg, com_panel);
	}

	override onCloseAni() {
		const { graph_bg, com_panel } = this.view;
		return UIUtil.AnimAlphaOut(graph_bg, com_panel);
	}

}