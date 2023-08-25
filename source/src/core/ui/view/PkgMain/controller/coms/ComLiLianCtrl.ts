import { BaseViewCtrl } from "../../../../core/BaseViewCtrl";
import { ComLiLianMsg, ComLiLianView } from "../../view/coms/ComLiLianView";

export interface ComLiLianData {

}

export class ComLiLianCtrl extends BaseViewCtrl<ComLiLianView, ComLiLianData>{

    override onAdded() {
		this.addMessage(ComLiLianMsg.OnBtnGuanQiaClick, this.onBtnGuanQiaClick);
		this.addMessage(ComLiLianMsg.OnBtnFuBenClick, this.onBtnFuBenClick);
		this.addMessage(ComLiLianMsg.OnBtnMiJingClick, this.onBtnMiJingClick);
		this.addMessage(ComLiLianMsg.OnBtnBossClick, this.onBtnBossClick);
		this.addMessage(ComLiLianMsg.OnBtnCaiJiClick, this.onBtnCaiJiClick);
		this.addMessage(ComLiLianMsg.OnBtnGongLueClick, this.onBtnGongLueClick);
		this.addMessage(ComLiLianMsg.OnBtnWaiYuClick, this.onBtnWaiYuClick);
    }

	private onBtnGuanQiaClick() {
	
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