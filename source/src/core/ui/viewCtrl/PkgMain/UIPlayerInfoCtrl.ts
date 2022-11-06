import { BaseViewCtrl } from "../../core/BaseViewCtrl";
import { UIPlayerInfoMsg, UIPlayerInfoView } from "../../view/PkgMain/UIPlayerInfoView";

export interface UIPlayerInfoData {

}

export class UIPlayerInfoCtrl extends BaseViewCtrl<UIPlayerInfoView, UIPlayerInfoData>{

    override onAwake(): void {
		this.addMessageListener(UIPlayerInfoMsg.OnBtnExplainClick, this.onBtnExplainClick);
		this.addMessageListener(UIPlayerInfoMsg.OnBtnBackClick, this.onBtnBackClick);
		this.addMessageListener(UIPlayerInfoMsg.OnBtnCopyIDClick, this.onBtnCopyIDClick);
		this.addMessageListener(UIPlayerInfoMsg.OnBtnGiftClick, this.onBtnGiftClick);
    }

    override onEnable(): void {
        
    }

    override onDisable(): void {
        
    }

    override onDestroy(): void {
        
    }

	private onBtnExplainClick(): void {
	
	}

	private onBtnBackClick(): void {
	
	}

	private onBtnCopyIDClick(): void {
	
	}

	private onBtnGiftClick(): void {
	
	}

}