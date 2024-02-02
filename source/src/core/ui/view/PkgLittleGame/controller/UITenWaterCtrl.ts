import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { ViewID } from "../../../core/ViewID";
import { UITenWaterMsg, UITenWaterView } from "../view/UITenWaterView";
import { ComTenWaterCtrl } from "./coms/ComTenWaterCtrl";

export interface UITenWaterData {

}

export class UITenWaterCtrl extends BaseViewCtrl<UITenWaterView, UITenWaterData> {
	private _waters: ComTenWaterCtrl[][] = [];

	override onAdded() {
		this.addMessage(UITenWaterMsg.OnBtnBackClick, this.onBtnBackClick);
		for (let i = 0; i < 6; i++) {
			const waters = this._waters[i] = [];
			for (let j = 0; j < 6; j++) {
				const child = (this.view["com_" + i + j] as IView).viewCtrl as ComTenWaterCtrl;
				waters.push(child);
			}
		}
		console.error(this._waters);
	}

	private onBtnBackClick() {
		this.showView(ViewID.UILittleGameView);
		this.removeSelf();
	}

}