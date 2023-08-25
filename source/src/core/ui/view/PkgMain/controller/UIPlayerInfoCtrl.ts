import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { UIPlayerInfoMsg, UIPlayerInfoView } from "../view/UIPlayerInfoView";

export interface UIPlayerInfoData {

}

export class UIPlayerInfoCtrl extends BaseViewCtrl<UIPlayerInfoView, UIPlayerInfoData>{

    override onAdded() {
		this.addMessage(UIPlayerInfoMsg.OnBtnExplainClick, this.onBtnExplainClick);
		this.addMessage(UIPlayerInfoMsg.OnBtnBackClick, this.onBtnBackClick);
		this.addMessage(UIPlayerInfoMsg.OnBtnCopyIDClick, this.onBtnCopyIDClick);
		this.addMessage(UIPlayerInfoMsg.OnBtnGiftClick, this.onBtnGiftClick);
    }

	private onBtnExplainClick() {
	
	}

	private onBtnBackClick() {
	
	}

	private onBtnCopyIDClick() {
	
	}

	private onBtnGiftClick() {
	
	}

}