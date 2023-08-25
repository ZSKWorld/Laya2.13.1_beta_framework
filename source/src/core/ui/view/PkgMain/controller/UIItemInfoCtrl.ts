import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { UIItemInfoMsg, UIItemInfoView } from "../view/UIItemInfoView";

export interface UIItemInfoData {

}

export class UIItemInfoCtrl extends BaseViewCtrl<UIItemInfoView, UIItemInfoData>{

    override onAdded() {
		this.addMessage(UIItemInfoMsg.OnBtnBgClick, this.onBtnBgClick);
		this.addMessage(UIItemInfoMsg.OnBtnShouCangClick, this.onBtnShouCangClick);
		this.addMessage(UIItemInfoMsg.OnBtnSellClick, this.onBtnSellClick);
		this.addMessage(UIItemInfoMsg.OnBtnUseClick, this.onBtnUseClick);
		this.addMessage(UIItemInfoMsg.OnBtnBuyClick, this.onBtnBuyClick);
    }

	private onBtnBgClick() {
	
	}

	private onBtnShouCangClick() {
	
	}

	private onBtnSellClick() {
	
	}

	private onBtnUseClick() {
	
	}

	private onBtnBuyClick() {
	
	}

}