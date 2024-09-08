import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { UITenWaterMsg, UITenWaterView } from "../view/UITenWaterView";
import { ComTenWaterCtrl } from "./coms/ComTenWaterCtrl";

export interface UITenWaterData {

}

export class UITenWaterCtrl extends BaseViewCtrl<UITenWaterView, UITenWaterData> {
	private _waters: ComTenWaterCtrl[][] = [];

	override onAdded() {
		this.addMessage(UITenWaterMsg.OnBtnBackClick, this.onBtnBackClick);
		this.addMessage(UITenWaterMsg.OnBtnCalculateClick, this.onBtnCalculateClick);
		this.addMessage(UITenWaterMsg.OnBtnResetMap, this.onBtnResetMap);
		for (let i = 0; i < 6; i++) {
			const waters = this._waters[i] = [];
			for (let j = 0; j < 6; j++) {
				const child = (this.view["com_" + i + j] as IView).viewCtrl as ComTenWaterCtrl;
				waters.push(child);
			}
		}
	}

	override onEnable() {
		this.onBtnResetMap();
	}

	private onBtnBackClick() {
		this.showView(ViewID.UILittleGameView);
		this.removeSelf();
	}

	private onBtnCalculateClick() {
		const canUseWater = +this.view.input_canUse.text;
		if (canUseWater == 0) return ShowConfirm("提示", "无可用水滴，可用水滴数量为0", false);
		let [startX, startY, maxWater] = [0, 0, 0];
		this._waters.forEach((v, x) => v.forEach((v1, y) => {
			if (v1.waterStatus > maxWater) {
				maxWater = v1.waterStatus;
				startX = x;
				startY = y;
			}
		}));

		console.error(startX, startY, maxWater);
	}

	private onBtnResetMap() {
		this._waters.forEach(v => v.forEach(v1 => v1.reset()));
	}

}