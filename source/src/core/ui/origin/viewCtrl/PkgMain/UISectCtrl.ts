import { BaseViewCtrl } from "../../core/BaseViewCtrl";
import { UISectMsg, UISectView } from "../../view/PkgMain/UISectView";

export interface UISectData {

}

export class UISectCtrl extends BaseViewCtrl<UISectView, UISectData>{

	override onAwake(): void {
		this.addMessage(UISectMsg.OnBtnSect0Click, this.onBtnSect0Click);
		this.addMessage(UISectMsg.OnBtnSect1Click, this.onBtnSect1Click);
		this.addMessage(UISectMsg.OnBtnSect2Click, this.onBtnSect2Click);
		this.addMessage(UISectMsg.OnBtnSect3Click, this.onBtnSect3Click);
		this.addMessage(UISectMsg.OnBtnSect4Click, this.onBtnSect4Click);
		this.addMessage(UISectMsg.OnBtnSect5Click, this.onBtnSect5Click);
		this.addMessage(UISectMsg.OnBtnSubmitClick, this.onBtnSubmitClick);
	}

	override onEnable(): void {

	}

	override onDisable(): void {

	}

	override onDestroy(): void {

	}

	private onBtnSect0Click(): void {

	}

	private onBtnSect1Click(): void {

	}

	private onBtnSect2Click(): void {

	}

	private onBtnSect3Click(): void {

	}

	private onBtnSect4Click(): void {

	}

	private onBtnSect5Click(): void {

	}

	private onBtnSubmitClick(): void {
		this.removeSelf();
	}

}