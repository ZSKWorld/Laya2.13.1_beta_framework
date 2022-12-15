import { AccountService } from "../../../net/Services";
import { BaseViewCtrl } from "../../core/BaseViewCtrl";
import { UISettingMsg, UISettingView } from "../../view/PkgMain/UISettingView";

export interface UISettingData {

}

export class UISettingCtrl extends BaseViewCtrl<UISettingView, UISettingData>{

	override onAwake(): void {
		this.addMessage(UISettingMsg.OnBtnBgClick, this.onBtnBgClick);
		this.addMessage(UISettingMsg.OnBtnHangUpClick, this.onBtnHangUpClick);
		this.addMessage(UISettingMsg.OnBtnMuteClick, this.onBtnMuteClick);
		this.addMessage(UISettingMsg.OnBtnSignInClick, this.onBtnSignInClick);
		this.addMessage(UISettingMsg.OnBtnHelpClick, this.onBtnHelpClick);
		this.addMessage(UISettingMsg.OnBtnClearAccountClick, this.onBtnClearAccountClick);
		this.addMessage(UISettingMsg.OnBtnBackClick, this.onBtnBackClick);
	}

	override onEnable(): void {

	}

	override onDisable(): void {

	}

	override onDestroy(): void {

	}

	private onBtnBgClick(): void {

	}

	private onBtnHangUpClick(): void {

	}

	private onBtnMuteClick(): void {

	}

	private onBtnSignInClick(): void {

	}

	private onBtnHelpClick(): void {

	}

	private onBtnClearAccountClick(): void {
		AccountService.Inst.clearAccount({});
	}

	private onBtnBackClick(): void {
		this.removeTopView();
	}

}