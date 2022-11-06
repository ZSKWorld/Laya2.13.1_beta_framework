import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { ComItemInfoMsg, ComItemInfoView } from "../../../view/PkgMain/Coms/ComItemInfoView";

export interface ComItemInfoData {

}

export class ComItemInfoCtrl extends BaseViewCtrl<ComItemInfoView, ComItemInfoData>{

    override onAwake(): void {
		this.addMessageListener(ComItemInfoMsg.OnBtnBgClick, this.onBtnBgClick);
		this.addMessageListener(ComItemInfoMsg.OnBtnShouCangClick, this.onBtnShouCangClick);
		this.addMessageListener(ComItemInfoMsg.OnBtnSellClick, this.onBtnSellClick);
		this.addMessageListener(ComItemInfoMsg.OnBtnUseClick, this.onBtnUseClick);
		this.addMessageListener(ComItemInfoMsg.OnBtnBuyClick, this.onBtnBuyClick);
    }

    override onEnable(): void {
        
    }

    override onDisable(): void {
        
    }

    override onDestroy(): void {
        
    }

	private onBtnBgClick(): void {
	
	}

	private onBtnShouCangClick(): void {
	
	}

	private onBtnSellClick(): void {
	
	}

	private onBtnUseClick(): void {
	
	}

	private onBtnBuyClick(): void {
	
	}

}