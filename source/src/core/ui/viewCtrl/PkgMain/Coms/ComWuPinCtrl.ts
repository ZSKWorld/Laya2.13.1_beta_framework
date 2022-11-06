import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { ComWuPinMsg, ComWuPinView } from "../../../view/PkgMain/Coms/ComWuPinView";

export interface ComWuPinData {

}

export class ComWuPinCtrl extends BaseViewCtrl<ComWuPinView, ComWuPinData>{

    override onAwake(): void {
		this.addMessageListener(ComWuPinMsg.OnBtnShouCangClick, this.onBtnShouCangClick);
		this.addMessageListener(ComWuPinMsg.OnBtnEquipClick, this.onBtnEquipClick);
		this.addMessageListener(ComWuPinMsg.OnBtnPropClick, this.onBtnPropClick);
		this.addMessageListener(ComWuPinMsg.OnBtnGemClick, this.onBtnGemClick);
		this.addMessageListener(ComWuPinMsg.OnBtnMaterialClick, this.onBtnMaterialClick);
		this.addMessageListener(ComWuPinMsg.OnBtnBookClick, this.onBtnBookClick);
		this.addMessageListener(ComWuPinMsg.OnBtnOtherClick, this.onBtnOtherClick);
		this.addMessageListener(ComWuPinMsg.OnBtnQualityUpClick, this.onBtnQualityUpClick);
		this.addMessageListener(ComWuPinMsg.OnBtnQualityDownClick, this.onBtnQualityDownClick);
		this.addMessageListener(ComWuPinMsg.OnBtnTypeUpClick, this.onBtnTypeUpClick);
		this.addMessageListener(ComWuPinMsg.OnBtnTypeDownClick, this.onBtnTypeDownClick);
		this.addMessageListener(ComWuPinMsg.OnBtnScoreUpClick, this.onBtnScoreUpClick);
		this.addMessageListener(ComWuPinMsg.OnBtnScoreDownClick, this.onBtnScoreDownClick);
    }

    override onEnable(): void {
        
    }

    override onDisable(): void {
        
    }

    override onDestroy(): void {
        
    }

	private onBtnShouCangClick(): void {
	
	}

	private onBtnEquipClick(): void {
	
	}

	private onBtnPropClick(): void {
	
	}

	private onBtnGemClick(): void {
	
	}

	private onBtnMaterialClick(): void {
	
	}

	private onBtnBookClick(): void {
	
	}

	private onBtnOtherClick(): void {
	
	}

	private onBtnQualityUpClick(): void {
	
	}

	private onBtnQualityDownClick(): void {
	
	}

	private onBtnTypeUpClick(): void {
	
	}

	private onBtnTypeDownClick(): void {
	
	}

	private onBtnScoreUpClick(): void {
	
	}

	private onBtnScoreDownClick(): void {
	
	}

}