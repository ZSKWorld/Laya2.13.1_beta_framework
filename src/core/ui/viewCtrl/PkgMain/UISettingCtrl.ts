import { ViewID } from "../../core/ViewID";
import { BaseViewCtrl } from "../../core/BaseViewCtrl";
import { UIUtility } from "../../tool/UIUtility";
import { UISettingMsg, UISettingView } from "../../view/PkgMain/UISettingView";

export interface UISettingData {

}

export class UISettingCtrl extends BaseViewCtrl<UISettingView, UISettingData>{

	onAwake(): void {
		super.onAwake();
		this.addMessageListener(UISettingMsg.OnBtnHangUpClick, this.UISetting_OnBtnHangUpClick);
		this.addMessageListener(UISettingMsg.OnBtnMuteClick, this.UISetting_OnBtnMuteClick);
		this.addMessageListener(UISettingMsg.OnBtnSignInClick, this.UISetting_OnBtnSignInClick);
		this.addMessageListener(UISettingMsg.OnBtnHelpClick, this.UISetting_OnBtnHelpClick);
		this.addMessageListener(UISettingMsg.OnBtnClearAccountClick, this.UISetting_OnBtnClearAccountClick);
	}

	onEnable(): void {
		super.onEnable();
	}

	private UISetting_OnBtnHangUpClick(): void {

	}

	private UISetting_OnBtnMuteClick(): void {
	}

	private UISetting_OnBtnSignInClick(): void {
	}

	private UISetting_OnBtnHelpClick(): void {

	}

	private UISetting_OnBtnClearAccountClick(): void {
		UIUtility.ShowTipConfirm("确认清号？").then(value => {
			if (value) {
				this.userData.clear();
				this.removeAll();
				this.addView(ViewID.MainView);
			}
		});
	}

	onDisable(): void {
		super.onDisable();
	}

	onDestroy(): void {
		super.onDestroy();
	}
}