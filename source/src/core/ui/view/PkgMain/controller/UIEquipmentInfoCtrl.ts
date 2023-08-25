import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { UIEquipmentInfoMsg, UIEquipmentInfoView } from "../view/UIEquipmentInfoView";

export interface UIEquipmentInfoData {

}

export class UIEquipmentInfoCtrl extends BaseViewCtrl<UIEquipmentInfoView, UIEquipmentInfoData>{

    override onAdded() {
		this.addMessage(UIEquipmentInfoMsg.OnBtnSellClick, this.onBtnSellClick);
		this.addMessage(UIEquipmentInfoMsg.OnBtnDressClick, this.onBtnDressClick);
		this.addMessage(UIEquipmentInfoMsg.OnBtnIntensifyClick, this.onBtnIntensifyClick);
		this.addMessage(UIEquipmentInfoMsg.OnBtnInlayClick, this.onBtnInlayClick);
		this.addMessage(UIEquipmentInfoMsg.OnBtnEngraveClick, this.onBtnEngraveClick);
		this.addMessage(UIEquipmentInfoMsg.OnBtnBlessClick, this.onBtnBlessClick);
    }

	private onBtnSellClick() {
	
	}

	private onBtnDressClick() {
	
	}

	private onBtnIntensifyClick() {
	
	}

	private onBtnInlayClick() {
	
	}

	private onBtnEngraveClick() {
	
	}

	private onBtnBlessClick() {
	
	}

}