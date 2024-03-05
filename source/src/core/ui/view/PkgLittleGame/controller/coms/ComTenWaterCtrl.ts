import { MathUtil } from "../../../../../libs/math/MathUtil";
import { BaseViewCtrl } from "../../../../core/BaseViewCtrl";
import { ComTenWaterMsg, ComTenWaterView, WaterStatus } from "../../view/coms/ComTenWaterView";

export interface ComTenWaterData {

}

export class ComTenWaterCtrl extends BaseViewCtrl<ComTenWaterView, ComTenWaterData> {
	private _waterStatus: WaterStatus;
	get waterStatus() { return this._waterStatus; }
	private set waterStatus(value) {
		if (value == this._waterStatus) return;
		value = Math.max(value, 0);
		this._waterStatus = value % 5;
		this.view.refreshWater(this._waterStatus);
	}

	override onAdded() {
		this.addMessage(ComTenWaterMsg.OnBtnAddClick, this.onBtnAddClick);
		this.addMessage(ComTenWaterMsg.OnBtnSubClick, this.onBtnSubClick);
	}

	reset() {
		this.waterStatus = MathUtil.RandomInt(WaterStatus.None, WaterStatus.Four);
	}

	private onBtnAddClick() {
		this.waterStatus++;
	}

	private onBtnSubClick() {
		this.waterStatus--;
	}

}