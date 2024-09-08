import { AccountService } from "../../../../../net/Services";
import { BaseViewCtrl } from "../../../../core/BaseViewCtrl";
import { ComSettingMsg, ComSettingView } from "../../view/coms/ComSettingView";

export interface ComSettingData {

}

export class ComSettingCtrl extends BaseViewCtrl<ComSettingView, ComSettingData> {

	override onAdded() {
		this.addMessage(ComSettingMsg.OnBtnMuteClick, this.onBtnMuteClick);
		this.addMessage(ComSettingMsg.OnBtnSignInClick, this.onBtnSignInClick);
		this.addMessage(ComSettingMsg.OnBtnHelpClick, this.onBtnHelpClick);
		this.addMessage(ComSettingMsg.OnBtnClearAccountClick, this.onBtnClearAccountClick);
	}

	private onBtnMuteClick() {

	}

	private onBtnSignInClick() {

	}

	private onBtnHelpClick() {

	}

	private onBtnClearAccountClick() {
		ShowConfirm("提示", "确认清理账号？").then(result => result && AccountService.Inst.clearAccount({}));
	}

}