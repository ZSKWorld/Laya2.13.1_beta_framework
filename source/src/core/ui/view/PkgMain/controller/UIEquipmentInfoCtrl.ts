import { BagService } from "../../../../net/Services";
import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { UIEquipmentInfoMsg, UIEquipmentInfoView } from "../view/UIEquipmentInfoView";

export interface UIEquipmentInfoData {
	equip1: IEquipment;
	equip2?: IEquipment;
	fromBag?: boolean;
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

	override onEnable() {
		this.view.setOpenType(+!!this.data.fromBag);
		this.view.refreshEquipInfo(this.data.equip1, this.data.equip2, !this.data.fromBag);
	}

	private onBtnSellClick() {
		const equip = this.data.equip1;
		BagService.Inst.sellEquip({ id: equip.id, uid: equip.uid });
	}

	private onBtnDressClick() {
		BagService.Inst.dressEquip({ uid: this.data.equip1.uid });
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