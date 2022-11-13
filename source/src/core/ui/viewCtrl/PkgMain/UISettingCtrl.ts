import { AccountService } from "../../../net/Services";
import { BaseViewCtrl } from "../../core/BaseViewCtrl";
import { UISettingMsg, UISettingView } from "../../view/PkgMain/UISettingView";

export interface UISettingData {

}

export class UISettingCtrl extends BaseViewCtrl<UISettingView, UISettingData>{

	override onAwake(): void {
		this.addMessageListener(UISettingMsg.OnBtnBgClick, this.onBtnBgClick);
		this.addMessageListener(UISettingMsg.OnBtnHangUpClick, this.onBtnHangUpClick);
		this.addMessageListener(UISettingMsg.OnBtnMuteClick, this.onBtnMuteClick);
		this.addMessageListener(UISettingMsg.OnBtnSignInClick, this.onBtnSignInClick);
		this.addMessageListener(UISettingMsg.OnBtnHelpClick, this.onBtnHelpClick);
		this.addMessageListener(UISettingMsg.OnBtnClearAccountClick, this.onBtnClearAccountClick);
		this.addMessageListener(UISettingMsg.OnBtnBackClick, this.onBtnBackClick);
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