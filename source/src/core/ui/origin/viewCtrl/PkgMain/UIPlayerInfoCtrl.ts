import { BaseViewCtrl } from "../../core/BaseViewCtrl";
import { UIPlayerInfoMsg, UIPlayerInfoView } from "../../view/PkgMain/UIPlayerInfoView";

export interface UIPlayerInfoData {

}

export class UIPlayerInfoCtrl extends BaseViewCtrl<UIPlayerInfoView, UIPlayerInfoData>{

	override onAwake(): void {
		this.addMessage(UIPlayerInfoMsg.OnBtnExplainClick, this.onBtnExplainClick);
		this.addMessage(UIPlayerInfoMsg.OnBtnBackClick, this.onBtnBackClick);
		this.addMessage(UIPlayerInfoMsg.OnBtnCopyIDClick, this.onBtnCopyIDClick);
		this.addMessage(UIPlayerInfoMsg.OnBtnGiftClick, this.onBtnGiftClick);
	}

	override onEnable(): void {

	}

	override onDisable(): void {

	}

	override onDestroy(): void {

	}

	private onBtnExplainClick(): void {

	}

	private onBtnBackClick(): void {

	}

	private onBtnCopyIDClick(): void {

	}

	private onBtnGiftClick(): void {

	}

}