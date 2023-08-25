import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { UISectMsg, UISectView } from "../view/UISectView";

export interface UISectData {

}

export class UISectCtrl extends BaseViewCtrl<UISectView, UISectData>{

    override onAdded() {
		this.addMessage(UISectMsg.OnBtnSect0Click, this.onBtnSect0Click);
		this.addMessage(UISectMsg.OnBtnSect1Click, this.onBtnSect1Click);
		this.addMessage(UISectMsg.OnBtnSect2Click, this.onBtnSect2Click);
		this.addMessage(UISectMsg.OnBtnSect3Click, this.onBtnSect3Click);
		this.addMessage(UISectMsg.OnBtnSect4Click, this.onBtnSect4Click);
		this.addMessage(UISectMsg.OnBtnSect5Click, this.onBtnSect5Click);
		this.addMessage(UISectMsg.OnBtnSubmitClick, this.onBtnSubmitClick);
    }

	private onBtnSect0Click() {
	
	}

	private onBtnSect1Click() {
	
	}

	private onBtnSect2Click() {
	
	}

	private onBtnSect3Click() {
	
	}

	private onBtnSect4Click() {
	
	}

	private onBtnSect5Click() {
	
	}

	private onBtnSubmitClick() {
	
	}

}