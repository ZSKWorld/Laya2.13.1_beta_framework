import { BaseViewCtrl } from "../../core/BaseViewCtrl";
import { UIEquipmentInfoMsg, UIEquipmentInfoView } from "../../view/PkgMain/UIEquipmentInfoView";

export interface UIEquipmentInfoData {

}

export class UIEquipmentInfoCtrl extends BaseViewCtrl<UIEquipmentInfoView, UIEquipmentInfoData>{

    override onAwake(): void {
		this.addMessageListener(UIEquipmentInfoMsg.OnBtnBgClick, this.onBtnBgClick);
		this.addMessageListener(UIEquipmentInfoMsg.OnBtnSellClick, this.onBtnSellClick);
		this.addMessageListener(UIEquipmentInfoMsg.OnBtnDressClick, this.onBtnDressClick);
		this.addMessageListener(UIEquipmentInfoMsg.OnBtnQiangHuaClick, this.onBtnQiangHuaClick);
		this.addMessageListener(UIEquipmentInfoMsg.OnBtnXiangQianClick, this.onBtnXiangQianClick);
		this.addMessageListener(UIEquipmentInfoMsg.OnBtnMingKeClick, this.onBtnMingKeClick);
		this.addMessageListener(UIEquipmentInfoMsg.OnBtnShenYouClick, this.onBtnShenYouClick);
    }

    override onEnable(): void {
        
    }

    override onDisable(): void {
        
    }

    override onDestroy(): void {
        
    }

	private onBtnBgClick(): void {
	
	}

	private onBtnSellClick(): void {
	
	}

	private onBtnDressClick(): void {
	
	}

	private onBtnQiangHuaClick(): void {
	
	}

	private onBtnXiangQianClick(): void {
	
	}

	private onBtnMingKeClick(): void {
	
	}

	private onBtnShenYouClick(): void {
	
	}

}