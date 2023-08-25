import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { UIEquipmentInfoMsg, UIEquipmentInfoView } from "../view/UIEquipmentInfoView";

export interface UIEquipmentInfoData {

}

export class UIEquipmentInfoCtrl extends BaseViewCtrl<UIEquipmentInfoView, UIEquipmentInfoData>{

    override onAdded() {
		this.addMessage(UIEquipmentInfoMsg.OnBtnBgClick, this.onBtnBgClick);
		this.addMessage(UIEquipmentInfoMsg.OnBtnSellClick, this.onBtnSellClick);
		this.addMessage(UIEquipmentInfoMsg.OnBtnDressClick, this.onBtnDressClick);
		this.addMessage(UIEquipmentInfoMsg.OnBtnQiangHuaClick, this.onBtnQiangHuaClick);
		this.addMessage(UIEquipmentInfoMsg.OnBtnXiangQianClick, this.onBtnXiangQianClick);
		this.addMessage(UIEquipmentInfoMsg.OnBtnMingKeClick, this.onBtnMingKeClick);
		this.addMessage(UIEquipmentInfoMsg.OnBtnShenYouClick, this.onBtnShenYouClick);
    }

	private onBtnBgClick() {
	
	}

	private onBtnSellClick() {
	
	}

	private onBtnDressClick() {
	
	}

	private onBtnQiangHuaClick() {
	
	}

	private onBtnXiangQianClick() {
	
	}

	private onBtnMingKeClick() {
	
	}

	private onBtnShenYouClick() {
	
	}

}