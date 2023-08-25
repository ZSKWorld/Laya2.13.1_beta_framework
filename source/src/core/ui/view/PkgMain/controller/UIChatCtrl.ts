import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { UIChatMsg, UIChatView } from "../view/UIChatView";

export interface UIChatData {

}

export class UIChatCtrl extends BaseViewCtrl<UIChatView, UIChatData>{

    override onAdded() {
		this.addMessage(UIChatMsg.OnBtnSendClick, this.onBtnSendClick);
		this.addMessage(UIChatMsg.OnBtnBackClick, this.onBtnBackClick);
    }

	private onBtnSendClick() {
	
	}

	private onBtnBackClick() {
	
	}

}