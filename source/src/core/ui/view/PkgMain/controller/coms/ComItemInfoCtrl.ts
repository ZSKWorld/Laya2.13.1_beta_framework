import { BaseViewCtrl } from "../../../../core/BaseViewCtrl";
import { ComItemInfoMsg, ComItemInfoView } from "../../view/coms/ComItemInfoView";

export interface ComItemInfoData {

}

export class ComItemInfoCtrl extends BaseViewCtrl<ComItemInfoView, ComItemInfoData>{

    override onAdded() {
		this.addMessage(ComItemInfoMsg.OnBtnBgClick, this.onBtnBgClick);
		this.addMessage(ComItemInfoMsg.OnBtnShouCangClick, this.onBtnShouCangClick);
		this.addMessage(ComItemInfoMsg.OnBtnSellClick, this.onBtnSellClick);
		this.addMessage(ComItemInfoMsg.OnBtnUseClick, this.onBtnUseClick);
		this.addMessage(ComItemInfoMsg.OnBtnBuyClick, this.onBtnBuyClick);
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