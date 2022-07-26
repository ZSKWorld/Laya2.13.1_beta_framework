import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { ComDongFuMsg, ComDongFuView } from "../../../view/PkgMain/Coms/ComDongFuView";

export interface ComDongFuData {

}

export class ComDongFuCtrl extends BaseViewCtrl<ComDongFuView, ComDongFuData>{

	onAwake(): void {
		super.onAwake();
		this.addMessageListener(ComDongFuMsg.OnBtnCreateClick, this.ComDongFu_OnBtnCreateClick);
		this.addMessageListener(ComDongFuMsg.OnBtnAboutClick, this.ComDongFu_OnBtnAboutClick);
		this.addMessageListener(ComDongFuMsg.OnBtnSettingClick, this.ComDongFu_OnBtnSettingClick);
		this.addMessageListener(ComDongFuMsg.OnBtnMeetClick, this.ComDongFu_OnBtnMeetClick);
		this.addMessageListener(ComDongFuMsg.OnBtnPetClick, this.ComDongFu_OnBtnPetClick);
		this.addMessageListener(ComDongFuMsg.OnBtnRepairClick, this.ComDongFu_OnBtnRepairClick);
	}

	onEnable(): void {
		super.onEnable();
	}

	private ComDongFu_OnBtnCreateClick(): void {

	}

	private ComDongFu_OnBtnAboutClick(): void {

	}

	private ComDongFu_OnBtnSettingClick(): void {

	}

	private ComDongFu_OnBtnMeetClick(): void {

	}

	private ComDongFu_OnBtnPetClick(): void {

	}

	private ComDongFu_OnBtnRepairClick(): void {

	}

	onDisable(): void {
		super.onDisable();
	}

	onDestroy(): void {
		super.onDestroy();
	}
}