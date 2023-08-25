import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { UIMainMsg, UIMainView } from "../view/UIMainView";

export interface UIMainData {

}

export class UIMainCtrl extends BaseViewCtrl<UIMainView, UIMainData>{

    override onAdded() {
		this.addMessage(UIMainMsg.OnBtnLiLianClick, this.onBtnLiLianClick);
		this.addMessage(UIMainMsg.OnBtnJueSeClick, this.onBtnJueSeClick);
		this.addMessage(UIMainMsg.OnBtnWuPinClick, this.onBtnWuPinClick);
		this.addMessage(UIMainMsg.OnBtnShangChengClick, this.onBtnShangChengClick);
		this.addMessage(UIMainMsg.OnBtnDongFuClick, this.onBtnDongFuClick);
		this.addMessage(UIMainMsg.OnBtnChatClick, this.onBtnChatClick);
		this.addMessage(UIMainMsg.OnBtnInfoClick, this.onBtnInfoClick);
		this.addMessage(UIMainMsg.OnBtnHeadClick, this.onBtnHeadClick);
		this.addMessage(UIMainMsg.OnBtnSettingClick, this.onBtnSettingClick);
		this.addMessage(UIMainMsg.OnBtnRankClick, this.onBtnRankClick);
		this.addMessage(UIMainMsg.OnBtnSphereClick, this.onBtnSphereClick);
    }

	private onBtnLiLianClick() {
	
	}

	private onBtnJueSeClick() {
	
	}

	private onBtnWuPinClick() {
	
	}

	private onBtnShangChengClick() {
	
	}

	private onBtnDongFuClick() {
	
	}

	private onBtnChatClick() {
	
	}

	private onBtnInfoClick() {
	
	}

	private onBtnHeadClick() {
	
	}

	private onBtnSettingClick() {
	
	}

	private onBtnRankClick() {
	
	}

	private onBtnSphereClick() {
	
	}

}