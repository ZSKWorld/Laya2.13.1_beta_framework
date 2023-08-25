import { BaseViewCtrl } from "../../../../core/BaseViewCtrl";
import { ComRenWuMsg, ComRenWuView } from "../../view/coms/ComRenWuView";

export interface ComRenWuData {

}

export class ComRenWuCtrl extends BaseViewCtrl<ComRenWuView, ComRenWuData>{

    override onAdded() {
		this.addMessage(ComRenWuMsg.OnBtnWQClick, this.onBtnWQClick);
		this.addMessage(ComRenWuMsg.OnBtnXLClick, this.onBtnXLClick);
		this.addMessage(ComRenWuMsg.OnBtnJZClick, this.onBtnJZClick);
		this.addMessage(ComRenWuMsg.OnBtnHFClick, this.onBtnHFClick);
		this.addMessage(ComRenWuMsg.OnBtnZQClick, this.onBtnZQClick);
		this.addMessage(ComRenWuMsg.OnBtnAQClick, this.onBtnAQClick);
		this.addMessage(ComRenWuMsg.OnBtnTKClick, this.onBtnTKClick);
		this.addMessage(ComRenWuMsg.OnBtnYFClick, this.onBtnYFClick);
		this.addMessage(ComRenWuMsg.OnBtnXZClick, this.onBtnXZClick);
		this.addMessage(ComRenWuMsg.OnBtnXieZClick, this.onBtnXieZClick);
		this.addMessage(ComRenWuMsg.OnBtnSZClick, this.onBtnSZClick);
		this.addMessage(ComRenWuMsg.OnBtnFBClick, this.onBtnFBClick);
    }

	private onBtnWQClick() {
	
	}

	private onBtnXLClick() {
	
	}

	private onBtnJZClick() {
	
	}

	private onBtnHFClick() {
	
	}

	private onBtnZQClick() {
	
	}

	private onBtnAQClick() {
	
	}

	private onBtnTKClick() {
	
	}

	private onBtnYFClick() {
	
	}

	private onBtnXZClick() {
	
	}

	private onBtnXieZClick() {
	
	}

	private onBtnSZClick() {
	
	}

	private onBtnFBClick() {
	
	}

}