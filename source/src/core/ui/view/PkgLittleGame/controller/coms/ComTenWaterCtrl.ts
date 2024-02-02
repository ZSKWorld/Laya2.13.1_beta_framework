import { BaseViewCtrl } from "../../../../core/BaseViewCtrl";
import { ComTenWaterMsg, ComTenWaterView } from "../../view/coms/ComTenWaterView";

export interface ComTenWaterData {

}

export class ComTenWaterCtrl extends BaseViewCtrl<ComTenWaterView, ComTenWaterData> {

    override onAdded() {
		this.addMessage(ComTenWaterMsg.OnBtnAddClick, this.onBtnAddClick);
		this.addMessage(ComTenWaterMsg.OnBtnSubClick, this.onBtnSubClick);
    }

	private onBtnAddClick() {
	
	}

	private onBtnSubClick() {
	
	}

}