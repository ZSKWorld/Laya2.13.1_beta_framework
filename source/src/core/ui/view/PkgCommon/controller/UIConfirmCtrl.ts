import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { UIUtility } from "../../../tool/UIUtility";
import { UIConfirmView } from "../view/UIConfirmView";
import { ComConfirmCtrl } from "./coms/ComConfirmCtrl";

export interface UIConfirmData {
	title: string,
	content: string,
	cancel: boolean,
	onCancel?: Laya.Handler;
	onConfirm?: Laya.Handler;
}

export class UIConfirmCtrl extends BaseViewCtrl<UIConfirmView, UIConfirmData>{
	private _comPanelCtrl: ComConfirmCtrl;

	override onAdded() {
		this._comPanelCtrl = this.view.com_panel.getComponent(ComConfirmCtrl);
	}

	override onForeground() {
		this._comPanelCtrl.data = this.data;
		this._comPanelCtrl.onForeground();
	}

	override onOpenAni() {
		const { graph_bg, com_panel } = this.view;
		return UIUtility.AnimAlphaIn(graph_bg, com_panel);
	}

	override onCloseAni() {
		const { graph_bg, com_panel } = this.view;
		return UIUtility.AnimAlphaOut(graph_bg, com_panel);
	}

}