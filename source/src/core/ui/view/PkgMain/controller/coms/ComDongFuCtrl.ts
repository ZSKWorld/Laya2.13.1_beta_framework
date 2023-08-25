import { BaseViewCtrl } from "../../../../core/BaseViewCtrl";
import { ComDongFuMsg, ComDongFuView } from "../../view/coms/ComDongFuView";

export interface ComDongFuData {

}

export class ComDongFuCtrl extends BaseViewCtrl<ComDongFuView, ComDongFuData>{

    override onAdded() {
		this.addMessage(ComDongFuMsg.OnBtnCreateClick, this.onBtnCreateClick);
		this.addMessage(ComDongFuMsg.OnBtnAboutClick, this.onBtnAboutClick);
		this.addMessage(ComDongFuMsg.OnBtnSettingClick, this.onBtnSettingClick);
		this.addMessage(ComDongFuMsg.OnBtnMeetClick, this.onBtnMeetClick);
		this.addMessage(ComDongFuMsg.OnBtnPetClick, this.onBtnPetClick);
		this.addMessage(ComDongFuMsg.OnBtnRepairClick, this.onBtnRepairClick);
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