import { BaseViewCtrl } from "../../../../core/BaseViewCtrl";
import { ComShangChengMsg, ComShangChengView } from "../../view/coms/ComShangChengView";

export interface ComShangChengData {

}

export class ComShangChengCtrl extends BaseViewCtrl<ComShangChengView, ComShangChengData>{

    override onAdded() {
		this.addMessage(ComShangChengMsg.OnBtnPropClick, this.onBtnPropClick);
		this.addMessage(ComShangChengMsg.OnBtnGemClick, this.onBtnGemClick);
		this.addMessage(ComShangChengMsg.OnBtnMaterialClick, this.onBtnMaterialClick);
		this.addMessage(ComShangChengMsg.OnBtnMiJiClick, this.onBtnMiJiClick);
		this.addMessage(ComShangChengMsg.OnBtnOtherClick, this.onBtnOtherClick);
		this.addMessage(ComShangChengMsg.OnBtnHeiShiClick, this.onBtnHeiShiClick);
		this.addMessage(ComShangChengMsg.OnBtnXianJieClick, this.onBtnXianJieClick);
		this.addMessage(ComShangChengMsg.OnBtnZBQHClick, this.onBtnZBQHClick);
		this.addMessage(ComShangChengMsg.OnBtnBSJGClick, this.onBtnBSJGClick);
		this.addMessage(ComShangChengMsg.OnBtnJSClick, this.onBtnJSClick);
		this.addMessage(ComShangChengMsg.OnBtnTSDJClick, this.onBtnTSDJClick);
		this.addMessage(ComShangChengMsg.OnBtnGemLv1Click, this.onBtnGemLv1Click);
		this.addMessage(ComShangChengMsg.OnBtnGemLv2Click, this.onBtnGemLv2Click);
		this.addMessage(ComShangChengMsg.OnBtnGemLv3Click, this.onBtnGemLv3Click);
		this.addMessage(ComShangChengMsg.OnBtnGemLv4Click, this.onBtnGemLv4Click);
		this.addMessage(ComShangChengMsg.OnBtnSGCLClick, this.onBtnSGCLClick);
		this.addMessage(ComShangChengMsg.OnBtnTSCLClick, this.onBtnTSCLClick);
		this.addMessage(ComShangChengMsg.OnBtnZWClick, this.onBtnZWClick);
		this.addMessage(ComShangChengMsg.OnBtnQHCLClick, this.onBtnQHCLClick);
		this.addMessage(ComShangChengMsg.OnBtnTJClick, this.onBtnTJClick);
		this.addMessage(ComShangChengMsg.OnBtnXFClick, this.onBtnXFClick);
		this.addMessage(ComShangChengMsg.OnBtnJNClick, this.onBtnJNClick);
		this.addMessage(ComShangChengMsg.OnBtnQTClick, this.onBtnQTClick);
		this.addMessage(ComShangChengMsg.OnBtnYRClick, this.onBtnYRClick);
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

	private onBtnZBQHClick() {
	
	}

	private onBtnBSJGClick() {
	
	}

	private onBtnJSClick() {
	
	}

	private onBtnTSDJClick() {
	
	}

	private onBtnGemLv1Click() {
	
	}

	private onBtnGemLv2Click() {
	
	}

	private onBtnGemLv3Click() {
	
	}

	private onBtnGemLv4Click() {
	
	}

	private onBtnSGCLClick() {
	
	}

	private onBtnTSCLClick() {
	
	}

	private onBtnZWClick() {
	
	}

	private onBtnQHCLClick() {
	
	}

	private onBtnTJClick() {
	
	}

	private onBtnXFClick() {
	
	}

	private onBtnJNClick() {
	
	}

	private onBtnQTClick() {
	
	}

	private onBtnYRClick() {
	
	}

}