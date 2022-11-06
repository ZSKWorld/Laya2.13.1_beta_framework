import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { ComDongFuMsg, ComDongFuView } from "../../../view/PkgMain/Coms/ComDongFuView";

export interface ComDongFuData {

}

export class ComDongFuCtrl extends BaseViewCtrl<ComDongFuView, ComDongFuData>{

    override onAwake(): void {
		this.addMessageListener(ComDongFuMsg.OnBtnCreateClick, this.onBtnCreateClick);
		this.addMessageListener(ComDongFuMsg.OnBtnAboutClick, this.onBtnAboutClick);
		this.addMessageListener(ComDongFuMsg.OnBtnSettingClick, this.onBtnSettingClick);
		this.addMessageListener(ComDongFuMsg.OnBtnMeetClick, this.onBtnMeetClick);
		this.addMessageListener(ComDongFuMsg.OnBtnPetClick, this.onBtnPetClick);
		this.addMessageListener(ComDongFuMsg.OnBtnRepairClick, this.onBtnRepairClick);
    }

    override onEnable(): void {
        
    }

    override onDisable(): void {
        
    }

    override onDestroy(): void {
        
    }

	private onBtnCreateClick(): void {
	
	}

	private onBtnAboutClick(): void {
	
	}

	private onBtnSettingClick(): void {
	
	}

	private onBtnMeetClick(): void {
	
	}

	private onBtnPetClick(): void {
	
	}

	private onBtnRepairClick(): void {
	
	}

}