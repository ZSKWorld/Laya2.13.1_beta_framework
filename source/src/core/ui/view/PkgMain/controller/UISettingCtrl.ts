import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { UISettingMsg, UISettingView } from "../view/UISettingView";

export interface UISettingData {

}

export class UISettingCtrl extends BaseViewCtrl<UISettingView, UISettingData>{

    override onAdded() {
		this.addMessage(UISettingMsg.OnBtnMuteClick, this.onBtnMuteClick);
		this.addMessage(UISettingMsg.OnBtnSignInClick, this.onBtnSignInClick);
		this.addMessage(UISettingMsg.OnBtnHelpClick, this.onBtnHelpClick);
		this.addMessage(UISettingMsg.OnBtnClearAccountClick, this.onBtnClearAccountClick);
    }

	private onBtnMuteClick() {
		
	}

	private onBtnSignInClick() {

	}

	private onBtnHelpClick() {

	}

	private onBtnClearAccountClick() {

	}

}