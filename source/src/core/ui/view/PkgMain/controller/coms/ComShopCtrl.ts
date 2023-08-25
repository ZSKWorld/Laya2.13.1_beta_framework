import { BaseViewCtrl } from "../../../../core/BaseViewCtrl";
import { ComShopMsg, ComShopView } from "../../view/coms/ComShopView";

export interface ComShopData {

}

export class ComShopCtrl extends BaseViewCtrl<ComShopView, ComShopData>{

    override onAdded() {
		this.addMessage(ComShopMsg.OnBtnPropClick, this.onBtnPropClick);
		this.addMessage(ComShopMsg.OnBtnGemClick, this.onBtnGemClick);
		this.addMessage(ComShopMsg.OnBtnMaterialClick, this.onBtnMaterialClick);
		this.addMessage(ComShopMsg.OnBtnMiJiClick, this.onBtnMiJiClick);
		this.addMessage(ComShopMsg.OnBtnOtherClick, this.onBtnOtherClick);
		this.addMessage(ComShopMsg.OnBtnHeiShiClick, this.onBtnHeiShiClick);
		this.addMessage(ComShopMsg.OnBtnXianJieClick, this.onBtnXianJieClick);
		this.addMessage(ComShopMsg.OnBtnZbqhClick, this.onBtnZbqhClick);
		this.addMessage(ComShopMsg.OnBtnBsjgClick, this.onBtnBsjgClick);
		this.addMessage(ComShopMsg.OnBtnJsClick, this.onBtnJsClick);
		this.addMessage(ComShopMsg.OnBtnTsdjClick, this.onBtnTsdjClick);
		this.addMessage(ComShopMsg.OnBtnGemLv1Click, this.onBtnGemLv1Click);
		this.addMessage(ComShopMsg.OnBtnGemLv2Click, this.onBtnGemLv2Click);
		this.addMessage(ComShopMsg.OnBtnGemLv3Click, this.onBtnGemLv3Click);
		this.addMessage(ComShopMsg.OnBtnGemLv4Click, this.onBtnGemLv4Click);
		this.addMessage(ComShopMsg.OnBtnSgclClick, this.onBtnSgclClick);
		this.addMessage(ComShopMsg.OnBtnTsclClick, this.onBtnTsclClick);
		this.addMessage(ComShopMsg.OnBtnZwClick, this.onBtnZwClick);
		this.addMessage(ComShopMsg.OnBtnQhclClick, this.onBtnQhclClick);
		this.addMessage(ComShopMsg.OnBtnTjClick, this.onBtnTjClick);
		this.addMessage(ComShopMsg.OnBtnXfClick, this.onBtnXfClick);
		this.addMessage(ComShopMsg.OnBtnJnClick, this.onBtnJnClick);
		this.addMessage(ComShopMsg.OnBtnQtClick, this.onBtnQtClick);
		this.addMessage(ComShopMsg.OnBtnYrClick, this.onBtnYrClick);
    }

	private onBtnPropClick() {
	
	}

	private onBtnGemClick() {
	
	}

	private onBtnMaterialClick() {
	
	}

	private onBtnMiJiClick() {
	
	}

	private onBtnOtherClick() {
	
	}

	private onBtnHeiShiClick() {
	
	}

	private onBtnXianJieClick() {
	
	}

	private onBtnZbqhClick() {
	
	}

	private onBtnBsjgClick() {
	
	}

	private onBtnJsClick() {
	
	}

	private onBtnTsdjClick() {
	
	}

	private onBtnGemLv1Click() {
	
	}

	private onBtnGemLv2Click() {
	
	}

	private onBtnGemLv3Click() {
	
	}

	private onBtnGemLv4Click() {
	
	}

	private onBtnSgclClick() {
	
	}

	private onBtnTsclClick() {
	
	}

	private onBtnZwClick() {
	
	}

	private onBtnQhclClick() {
	
	}

	private onBtnTjClick() {
	
	}

	private onBtnXfClick() {
	
	}

	private onBtnJnClick() {
	
	}

	private onBtnQtClick() {
	
	}

	private onBtnYrClick() {
	
	}

}