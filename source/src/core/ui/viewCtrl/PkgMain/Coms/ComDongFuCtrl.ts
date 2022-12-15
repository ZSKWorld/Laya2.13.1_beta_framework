import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { ComDongFuMsg, ComDongFuView } from "../../../view/PkgMain/Coms/ComDongFuView";

export interface ComDongFuData {

}

export class ComDongFuCtrl extends BaseViewCtrl<ComDongFuView, ComDongFuData>{

    override onAwake(): void {
		this.addMessage(ComDongFuMsg.OnBtnCreateClick, this.onBtnCreateClick);
		this.addMessage(ComDongFuMsg.OnBtnAboutClick, this.onBtnAboutClick);
		this.addMessage(ComDongFuMsg.OnBtnSettingClick, this.onBtnSettingClick);
		this.addMessage(ComDongFuMsg.OnBtnMeetClick, this.onBtnMeetClick);
		this.addMessage(ComDongFuMsg.OnBtnPetClick, this.onBtnPetClick);
		this.addMessage(ComDongFuMsg.OnBtnRepairClick, this.onBtnRepairClick);
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