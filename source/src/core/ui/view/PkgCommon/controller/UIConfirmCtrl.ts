import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { UIConfirmView } from "../view/UIConfirmView";
import { ComConfirmCtrl } from "./coms/ComConfirmCtrl";

export interface UIConfirmData {
	title: string,
	content: string,
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

	override onOpenAni(): Promise<void> {
		return new Promise(resolve => { this.view.trans_show.play(Laya.Handler.create(null, resolve)); });
	}

	override onCloseAni(): Promise<void> {
		return new Promise(resolve => { this.view.trans_close.play(Laya.Handler.create(null, resolve)); });
	}

	override onDisable() {
		const { onCancel, onConfirm } = this.data;
		if (onCancel) onCancel.recover();
		if (onConfirm) onConfirm.recover();
	}

}