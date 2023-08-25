import { BaseViewCtrl } from "../../../../core/BaseViewCtrl";
import { ComTrainMsg, ComTrainView } from "../../view/coms/ComTrainView";

export interface ComTrainData {

}

export class ComTrainCtrl extends BaseViewCtrl<ComTrainView, ComTrainData>{

    override onAdded() {
		this.addMessage(ComTrainMsg.OnBtnLevelClick, this.onBtnLevelClick);
		this.addMessage(ComTrainMsg.OnBtnFuBenClick, this.onBtnFuBenClick);
		this.addMessage(ComTrainMsg.OnBtnMiJingClick, this.onBtnMiJingClick);
		this.addMessage(ComTrainMsg.OnBtnBossClick, this.onBtnBossClick);
		this.addMessage(ComTrainMsg.OnBtnCaiJiClick, this.onBtnCaiJiClick);
		this.addMessage(ComTrainMsg.OnBtnGongLueClick, this.onBtnGongLueClick);
		this.addMessage(ComTrainMsg.OnBtnWaiYuClick, this.onBtnWaiYuClick);
    }

	private onBtnLevelClick() {
	
	}

	private onBtnFuBenClick() {
	
	}

	private onBtnMiJingClick() {
	
	}

	private onBtnBossClick() {
	
	}

	private onBtnCaiJiClick() {
	
	}

	private onBtnGongLueClick() {
	
	}

	private onBtnWaiYuClick() {
	
	}

}