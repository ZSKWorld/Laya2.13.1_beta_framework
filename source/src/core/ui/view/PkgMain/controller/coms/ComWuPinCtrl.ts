import { BaseViewCtrl } from "../../../../core/BaseViewCtrl";
import { ComWuPinMsg, ComWuPinView } from "../../view/coms/ComWuPinView";

export interface ComWuPinData {

}

export class ComWuPinCtrl extends BaseViewCtrl<ComWuPinView, ComWuPinData>{

    override onAdded() {
		this.addMessage(ComWuPinMsg.OnBtnShouCangClick, this.onBtnShouCangClick);
		this.addMessage(ComWuPinMsg.OnBtnEquipClick, this.onBtnEquipClick);
		this.addMessage(ComWuPinMsg.OnBtnPropClick, this.onBtnPropClick);
		this.addMessage(ComWuPinMsg.OnBtnGemClick, this.onBtnGemClick);
		this.addMessage(ComWuPinMsg.OnBtnMaterialClick, this.onBtnMaterialClick);
		this.addMessage(ComWuPinMsg.OnBtnBookClick, this.onBtnBookClick);
		this.addMessage(ComWuPinMsg.OnBtnOtherClick, this.onBtnOtherClick);
		this.addMessage(ComWuPinMsg.OnBtnQualityUpClick, this.onBtnQualityUpClick);
		this.addMessage(ComWuPinMsg.OnBtnQualityDownClick, this.onBtnQualityDownClick);
		this.addMessage(ComWuPinMsg.OnBtnTypeUpClick, this.onBtnTypeUpClick);
		this.addMessage(ComWuPinMsg.OnBtnTypeDownClick, this.onBtnTypeDownClick);
		this.addMessage(ComWuPinMsg.OnBtnScoreUpClick, this.onBtnScoreUpClick);
		this.addMessage(ComWuPinMsg.OnBtnScoreDownClick, this.onBtnScoreDownClick);
    }

	private onBtnShouCangClick() {
	
	}

	private onBtnEquipClick() {
	
	}

	private onBtnPropClick() {
	
	}

	private onBtnGemClick() {
	
	}

	private onBtnMaterialClick() {
	
	}

	private onBtnBookClick() {
	
	}

	private onBtnOtherClick() {
	
	}

	private onBtnQualityUpClick() {
	
	}

	private onBtnQualityDownClick() {
	
	}

	private onBtnTypeUpClick() {
	
	}

	private onBtnTypeDownClick() {
	
	}

	private onBtnScoreUpClick() {
	
	}

	private onBtnScoreDownClick() {
	
	}

}