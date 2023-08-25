import { BaseViewCtrl } from "../../../../core/BaseViewCtrl";
import { ComRenWuMsg, ComRenWuView } from "../../view/coms/ComRenWuView";

export interface ComRenWuData {

}

export class ComRenWuCtrl extends BaseViewCtrl<ComRenWuView, ComRenWuData>{

    override onAdded() {
		this.addMessage(ComRenWuMsg.OnBtnWuQiClick, this.onBtnWuQiClick);
		this.addMessage(ComRenWuMsg.OnBtnXiangLianClick, this.onBtnXiangLianClick);
		this.addMessage(ComRenWuMsg.OnBtnJieZhiClick, this.onBtnJieZhiClick);
		this.addMessage(ComRenWuMsg.OnBtnHuFuClick, this.onBtnHuFuClick);
		this.addMessage(ComRenWuMsg.OnBtnZuoQiClick, this.onBtnZuoQiClick);
		this.addMessage(ComRenWuMsg.OnBtnAnQiClick, this.onBtnAnQiClick);
		this.addMessage(ComRenWuMsg.OnBtnTouKuiClick, this.onBtnTouKuiClick);
		this.addMessage(ComRenWuMsg.OnBtnYiFuClick, this.onBtnYiFuClick);
		this.addMessage(ComRenWuMsg.OnBtnXiaZhuangClick, this.onBtnXiaZhuangClick);
		this.addMessage(ComRenWuMsg.OnBtnXieZiClick, this.onBtnXieZiClick);
		this.addMessage(ComRenWuMsg.OnBtnShiZhuangClick, this.onBtnShiZhuangClick);
		this.addMessage(ComRenWuMsg.OnBtnFaBaoClick, this.onBtnFaBaoClick);
    }

	private onBtnWuQiClick() {
	
	}

	private onBtnXiangLianClick() {
	
	}

	private onBtnJieZhiClick() {
	
	}

	private onBtnHuFuClick() {
	
	}

	private onBtnZuoQiClick() {
	
	}

	private onBtnAnQiClick() {
	
	}

	private onBtnTouKuiClick() {
	
	}

	private onBtnYiFuClick() {
	
	}

	private onBtnXiaZhuangClick() {
	
	}

	private onBtnXieZiClick() {
	
	}

	private onBtnShiZhuangClick() {
	
	}

	private onBtnFaBaoClick() {
	
	}

}