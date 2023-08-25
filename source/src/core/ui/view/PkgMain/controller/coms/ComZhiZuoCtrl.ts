import { BaseViewCtrl } from "../../../../core/BaseViewCtrl";
import { ComZhiZuoMsg, ComZhiZuoView } from "../../view/coms/ComZhiZuoView";

export interface ComZhiZuoData {

}

export class ComZhiZuoCtrl extends BaseViewCtrl<ComZhiZuoView, ComZhiZuoData>{

    override onAdded() {
		this.addMessage(ComZhiZuoMsg.OnBtnJPYLClick, this.onBtnJPYLClick);
		this.addMessage(ComZhiZuoMsg.OnBtnDZZBClick, this.onBtnDZZBClick);
		this.addMessage(ComZhiZuoMsg.OnBtnZJZBClick, this.onBtnZJZBClick);
		this.addMessage(ComZhiZuoMsg.OnBtnCZZBClick, this.onBtnCZZBClick);
		this.addMessage(ComZhiZuoMsg.OnBtnBSHCClick, this.onBtnBSHCClick);
		this.addMessage(ComZhiZuoMsg.OnBtnZZTZClick, this.onBtnZZTZClick);
		this.addMessage(ComZhiZuoMsg.OnBtnFJZBClick, this.onBtnFJZBClick);
		this.addMessage(ComZhiZuoMsg.OnBtnFJBSClick, this.onBtnFJBSClick);
		this.addMessage(ComZhiZuoMsg.OnBtnYJHCClick, this.onBtnYJHCClick);
    }

	private onBtnJPYLClick() {
	
	}

	private onBtnDZZBClick() {
	
	}

	private onBtnZJZBClick() {
	
	}

	private onBtnCZZBClick() {
	
	}

	private onBtnBSHCClick() {
	
	}

	private onBtnZZTZClick() {
	
	}

	private onBtnFJZBClick() {
	
	}

	private onBtnFJBSClick() {
	
	}

	private onBtnYJHCClick() {
	
	}

}