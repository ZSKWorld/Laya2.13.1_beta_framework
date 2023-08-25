import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { UILoginMainMsg, UILoginMainView } from "../view/UILoginMainView";

export interface UILoginMainData {

}

export class UILoginMainCtrl extends BaseViewCtrl<UILoginMainView, UILoginMainData>{

    override onAdded() {
		this.addMessage(UILoginMainMsg.OnBtnLoginClick, this.onBtnLoginClick);
		this.addMessage(UILoginMainMsg.OnBtnLoginRegisterClick, this.onBtnLoginRegisterClick);
		this.addMessage(UILoginMainMsg.OnBtnRegisterBackClick, this.onBtnRegisterBackClick);
		this.addMessage(UILoginMainMsg.OnBtnRegisterClick, this.onBtnRegisterClick);
    }

	private onBtnLoginClick() {
	
	}

	private onBtnLoginRegisterClick() {
	
	}

	private onBtnRegisterBackClick() {
	
	}

	private onBtnRegisterClick() {
	
	}

}