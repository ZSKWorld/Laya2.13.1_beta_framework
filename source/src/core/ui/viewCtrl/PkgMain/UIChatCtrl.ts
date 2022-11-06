import { BaseViewCtrl } from "../../core/BaseViewCtrl";
import { UIChatMsg, UIChatView } from "../../view/PkgMain/UIChatView";

export interface UIChatData {

}

export class UIChatCtrl extends BaseViewCtrl<UIChatView, UIChatData>{

    override onAwake(): void {
		this.addMessageListener(UIChatMsg.OnBtnSendClick, this.onBtnSendClick);
		this.addMessageListener(UIChatMsg.OnBtnBackClick, this.onBtnBackClick);
    }

    override onEnable(): void {
        
    }

    override onDisable(): void {
        
    }

    override onDestroy(): void {
        
    }

	private onBtnSendClick(): void {
	
	}

	private onBtnBackClick(): void {
	
	}

}