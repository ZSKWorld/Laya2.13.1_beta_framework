import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { UITipConfirmMsg, UITipConfirmView } from "../view/UITipConfirmView";

export interface UITipConfirmData {

}

export class UITipConfirmCtrl extends BaseViewCtrl<UITipConfirmView, UITipConfirmData>{

    override onAdded() {
		this.addMessage(UITipConfirmMsg.OnBtnBgClick, this.onBtnBgClick);
		this.addMessage(UITipConfirmMsg.OnBtnConfirmClick, this.onBtnConfirmClick);
    }

	private onBtnBgClick() {
	
	}

	private onBtnConfirmClick() {
	
	}

}