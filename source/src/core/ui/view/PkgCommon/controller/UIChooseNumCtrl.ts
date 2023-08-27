import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { UIChooseNumMsg, UIChooseNumView } from "../view/UIChooseNumView";

export interface UIChooseNumData {
	title: string;
	min: number;
	max: number;
	callback?: Laya.Handler;
}

export class UIChooseNumCtrl extends BaseViewCtrl<UIChooseNumView, UIChooseNumData>{

	override onAdded() {
		this.addMessage(UIChooseNumMsg.OnGraphBgClick, this.onGraphBgClick);
		this.addMessage(UIChooseNumMsg.OnBtnSubmitClick, this.onBtnSubmitClick);
	}

	override onEnable() {
		const { title, min, max } = this.data;
		this.view.refresh(title, min, max);
	}

	override onDisable() {
		this.doCallback(0);
	}

	private onGraphBgClick() {
		this.doCallback(0);
		this.removeSelf();
	}

	private onBtnSubmitClick() {
		this.doCallback(this.view.slider_num.value);
		this.removeSelf();
	}
	private doCallback(value: number) {
		this.data?.callback?.runWith(value);
		this.data = null;
	}

}