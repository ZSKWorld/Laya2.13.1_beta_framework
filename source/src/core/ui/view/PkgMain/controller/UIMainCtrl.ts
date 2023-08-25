import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { UIMainMsg, UIMainView } from "../view/UIMainView";

export interface UIMainData {

}

export class UIMainCtrl extends BaseViewCtrl<UIMainView, UIMainData>{

    override onAdded() {
		this.addMessage(UIMainMsg.OnBtnTrainClick, this.onBtnTrainClick);
		this.addMessage(UIMainMsg.OnBtnCharClick, this.onBtnCharClick);
		this.addMessage(UIMainMsg.OnBtnGoodsClick, this.onBtnGoodsClick);
		this.addMessage(UIMainMsg.OnBtnShopClick, this.onBtnShopClick);
		this.addMessage(UIMainMsg.OnBtnAbodeClick, this.onBtnAbodeClick);
		this.addMessage(UIMainMsg.OnBtnChatClick, this.onBtnChatClick);
		this.addMessage(UIMainMsg.OnBtnSettingClick, this.onBtnSettingClick);
		this.addMessage(UIMainMsg.OnBtnRankClick, this.onBtnRankClick);
		this.addMessage(UIMainMsg.OnBtnSphereClick, this.onBtnSphereClick);
    }

	private onBtnTrainClick() {
	
	}

	private onBtnCharClick() {
	
	}

	private onBtnGoodsClick() {
	
	}

	private onBtnShopClick() {
	
	}

	private onBtnAbodeClick() {
	
	}

	private onBtnChatClick() {
	
	}

	private onBtnSettingClick() {
	
	}

	private onBtnRankClick() {
	
	}

	private onBtnSphereClick() {
	
	}

}