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

	override onEnable() {
		this.view.com_panel.viewCtrl.data = this.data;
	}

	override onOpenAni() {
		return UIUtil.animAlphaIn(this.view.graph_bg, this.view.com_panel);
	}

	override onCloseAni() {
		return UIUtil.animAlphaOut(this.view.graph_bg, this.view.com_panel);
	}

}