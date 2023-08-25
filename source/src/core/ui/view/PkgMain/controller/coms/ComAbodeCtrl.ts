import { BaseViewCtrl } from "../../../../core/BaseViewCtrl";
import { ComAbodeMsg, ComAbodeView } from "../../view/coms/ComAbodeView";

export interface ComAbodeData {

}

export class ComAbodeCtrl extends BaseViewCtrl<ComAbodeView, ComAbodeData>{

    override onAdded() {
		this.addMessage(ComAbodeMsg.OnBtnCreateClick, this.onBtnCreateClick);
		this.addMessage(ComAbodeMsg.OnBtnAboutClick, this.onBtnAboutClick);
		this.addMessage(ComAbodeMsg.OnBtnSettingClick, this.onBtnSettingClick);
		this.addMessage(ComAbodeMsg.OnBtnMeetClick, this.onBtnMeetClick);
		this.addMessage(ComAbodeMsg.OnBtnPetClick, this.onBtnPetClick);
		this.addMessage(ComAbodeMsg.OnBtnRepairClick, this.onBtnRepairClick);
    }

	private onBtnCreateClick() {
	
	}

	private onBtnAboutClick() {
	
	}

	private onBtnSettingClick() {
	
	}

	private onBtnMeetClick() {
	
	}

	private onBtnPetClick() {
	
	}

	private onBtnRepairClick() {
	
	}

}