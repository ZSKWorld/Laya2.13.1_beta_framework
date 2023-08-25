import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { UISettingMsg, UISettingView } from "../view/UISettingView";

export interface UISettingData {

}

export class UISettingCtrl extends BaseViewCtrl<UISettingView, UISettingData>{

    override onAdded() {
		this.addMessage(UISettingMsg.OnBtnBgClick, this.onBtnBgClick);
		this.addMessage(UISettingMsg.OnBtnHangUpClick, this.onBtnHangUpClick);
		this.addMessage(UISettingMsg.OnBtnMuteClick, this.onBtnMuteClick);
		this.addMessage(UISettingMsg.OnBtnSignInClick, this.onBtnSignInClick);
		this.addMessage(UISettingMsg.OnBtnHelpClick, this.onBtnHelpClick);
		this.addMessage(UISettingMsg.OnBtnClearAccountClick, this.onBtnClearAccountClick);
		this.addMessage(UISettingMsg.OnBtnBackClick, this.onBtnBackClick);
    }

	private onBtnBgClick() {
	
	}

	private onBtnHangUpClick() {
	
	}

	private onBtnMuteClick() {
	
	}

	private onBtnSignInClick() {
	
	}

	private onBtnHelpClick() {
	
	}

	private onBtnClearAccountClick() {
	
	}

	private onBtnBackClick() {
	
	}

}