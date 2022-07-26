import { GetLang } from "../../../libs/utils/Util";
import { BaseViewCtrl } from "../../core/BaseViewCtrl";
import { UIUtility } from "../../tool/UIUtility";
import { UISectMsg, UISectView } from "../../view/PkgMain/UISectView";

export interface UISectData {

}

export class UISectCtrl extends BaseViewCtrl<UISectView, UISectData> {
	private selectedSect: number;

	onAwake(): void {
		super.onAwake();
		this.addMessageListener(UISectMsg.OnBtnSect0Click, this.showSect, [101]);
		this.addMessageListener(UISectMsg.OnBtnSect1Click, this.showSect, [102]);
		this.addMessageListener(UISectMsg.OnBtnSect2Click, this.showSect, [103]);
		this.addMessageListener(UISectMsg.OnBtnSect3Click, this.showSect, [104]);
		this.addMessageListener(UISectMsg.OnBtnSect4Click, this.showSect, [105]);
		this.addMessageListener(UISectMsg.OnBtnSect5Click, this.showSect, [106]);
		this.addMessageListener(UISectMsg.OnBtnSubmitClick, this.UISect_OnBtnSubmitClick);
	}

	onEnable(): void {
		super.onEnable();
		this.showSect(101);
	}

	private showSect(id: number) {
		this.selectedSect = id;
		this.view.refreshContent(id);
	}

	private UISect_OnBtnSubmitClick(): void {
		const code = this.userData.translatorSect(this.selectedSect);
		if (code) UIUtility.ShowTipInfo(GetLang(code));
		else this.removeTop();
	}

	onDisable(): void {
		super.onDisable();
	}

	onDestroy(): void {
		super.onDestroy();
	}
}