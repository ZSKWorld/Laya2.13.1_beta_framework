import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { ComRenWuMsg, ComRenWuView } from "../../../view/PkgMain/Coms/ComRenWuView";

export interface ComRenWuData {

}

export class ComRenWuCtrl extends BaseViewCtrl<ComRenWuView, ComRenWuData>{

    override onAwake(): void {
		this.addMessageListener(ComRenWuMsg.OnBtnWQClick, this.onBtnWQClick);
		this.addMessageListener(ComRenWuMsg.OnBtnXLClick, this.onBtnXLClick);
		this.addMessageListener(ComRenWuMsg.OnBtnJZClick, this.onBtnJZClick);
		this.addMessageListener(ComRenWuMsg.OnBtnHFClick, this.onBtnHFClick);
		this.addMessageListener(ComRenWuMsg.OnBtnZQClick, this.onBtnZQClick);
		this.addMessageListener(ComRenWuMsg.OnBtnAQClick, this.onBtnAQClick);
		this.addMessageListener(ComRenWuMsg.OnBtnTKClick, this.onBtnTKClick);
		this.addMessageListener(ComRenWuMsg.OnBtnYFClick, this.onBtnYFClick);
		this.addMessageListener(ComRenWuMsg.OnBtnXZClick, this.onBtnXZClick);
		this.addMessageListener(ComRenWuMsg.OnBtnXieZClick, this.onBtnXieZClick);
		this.addMessageListener(ComRenWuMsg.OnBtnSZClick, this.onBtnSZClick);
		this.addMessageListener(ComRenWuMsg.OnBtnFBClick, this.onBtnFBClick);
    }

    override onEnable(): void {
        
    }

    override onDisable(): void {
        
    }

    override onDestroy(): void {
        
    }

	private onBtnWQClick(): void {
	
	}

	private onBtnXLClick(): void {
	
	}

	private onBtnJZClick(): void {
	
	}

	private onBtnHFClick(): void {
	
	}

	private onBtnZQClick(): void {
	
	}

	private onBtnAQClick(): void {
	
	}

	private onBtnTKClick(): void {
	
	}

	private onBtnYFClick(): void {
	
	}

	private onBtnXZClick(): void {
	
	}

	private onBtnXieZClick(): void {
	
	}

	private onBtnSZClick(): void {
	
	}

	private onBtnFBClick(): void {
	
	}

}