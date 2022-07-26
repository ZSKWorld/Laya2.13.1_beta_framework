import { ItemHandleService } from "../../../net/Services";
import { Equipment } from "../../../userData/proxy/ItemProxy";
import { BaseViewCtrl, InsertKeyEvent, KeyEvent } from "../../core/BaseViewCtrl";
import { UIEquipmentInfoMsg, UIEquipmentInfoView } from "../../view/PkgMain/UIEquipmentInfoView";

export interface UIEquipmentInfoData {
	equip1: Equipment;
	equip2?: Equipment;
	fromBag?: boolean;
}

export class UIEquipmentInfoCtrl extends BaseViewCtrl<UIEquipmentInfoView, UIEquipmentInfoData>{

	override onAwake(): void {
		this.addMessage(UIEquipmentInfoMsg.OnBtnBgClick, this.onBtnBgClick);
		this.addMessage(UIEquipmentInfoMsg.OnBtnSellClick, this.onBtnSellClick);
		this.addMessage(UIEquipmentInfoMsg.OnBtnDressClick, this.onBtnDressClick);
		this.addMessage(UIEquipmentInfoMsg.OnBtnQiangHuaClick, this.onBtnQiangHuaClick);
		this.addMessage(UIEquipmentInfoMsg.OnBtnXiangQianClick, this.onBtnXiangQianClick);
		this.addMessage(UIEquipmentInfoMsg.OnBtnMingKeClick, this.onBtnMingKeClick);
		this.addMessage(UIEquipmentInfoMsg.OnBtnShenYouClick, this.onBtnShenYouClick);
	}

	override onEnable(): void {
		this.view.setOpenType(+!!this.data.fromBag);
		this.view.refreshEquipInfo(this.data.equip1, this.data.equip2, !this.data.fromBag);
	}

	override onDisable(): void {

	}

	override onDestroy(): void {

	}

	private onBtnBgClick(): void {
		this.removeTopView();
	}

	@InsertKeyEvent(KeyEvent.KeyUp, Laya.Keyboard.SPACE)
	private onBtnSellClick(): void {
		ItemHandleService.Inst.sellEquip({ uid: this.data.equip1.uid });
	}

	private onBtnDressClick(): void {
		ItemHandleService.Inst.dressEquip({ uid: this.data.equip1.uid });
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