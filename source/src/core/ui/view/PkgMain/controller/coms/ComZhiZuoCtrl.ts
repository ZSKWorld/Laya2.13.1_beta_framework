import { BaseViewCtrl } from "../../../../core/BaseViewCtrl";
import { ComZhiZuoMsg, ComZhiZuoView } from "../../view/coms/ComZhiZuoView";

export interface ComZhiZuoData {

}

export class ComZhiZuoCtrl extends BaseViewCtrl<ComZhiZuoView, ComZhiZuoData>{

    override onAdded() {
		this.addMessage(ComZhiZuoMsg.OnBtnJpylClick, this.onBtnJpylClick);
		this.addMessage(ComZhiZuoMsg.OnBtnDzzbClick, this.onBtnDzzbClick);
		this.addMessage(ComZhiZuoMsg.OnBtnZjzbClick, this.onBtnZjzbClick);
		this.addMessage(ComZhiZuoMsg.OnBtnCzzbClick, this.onBtnCzzbClick);
		this.addMessage(ComZhiZuoMsg.OnBtnBshcClick, this.onBtnBshcClick);
		this.addMessage(ComZhiZuoMsg.OnBtnZztzClick, this.onBtnZztzClick);
		this.addMessage(ComZhiZuoMsg.OnBtnFjzbClick, this.onBtnFjzbClick);
		this.addMessage(ComZhiZuoMsg.OnBtnFjbsClick, this.onBtnFjbsClick);
		this.addMessage(ComZhiZuoMsg.OnBtnYjhcClick, this.onBtnYjhcClick);
    }

	private onBtnJpylClick() {
	
	}

	private onBtnDzzbClick() {
	
	}

	private onBtnZjzbClick() {
	
	}

	private onBtnCzzbClick() {
	
	}

	private onBtnBshcClick() {
	
	}

	private onBtnZztzClick() {
	
	}

	private onBtnFjzbClick() {
	
	}

	private onBtnFjbsClick() {
	
	}

	private onBtnYjhcClick() {
	
	}

}