import { GetLang } from "../../../libs/utils/Util";
import { EquipmentItem } from "../../../playerData/BagData";
import { BaseViewCtrl } from "../../core/BaseViewCtrl";
import { UIUtility } from "../../tool/UIUtility";
import { UIEquipmentInfoMsg, UIEquipmentInfoView } from "../../view/PkgMain/UIEquipmentInfoView";

export interface UIEquipmentInfoData {
	equip1: EquipmentItem;
	equip2?: EquipmentItem;
	openBag?: boolean;
}

export class UIEquipmentInfoCtrl extends BaseViewCtrl<UIEquipmentInfoView, UIEquipmentInfoData>{

	onAwake(): void {
		super.onAwake();
		this.addMessageListener(UIEquipmentInfoMsg.OnBtnSellClick, this.UIEquipmentInfo_OnBtnSellClick);
		this.addMessageListener(UIEquipmentInfoMsg.OnBtnDressClick, this.UIEquipmentInfo_OnBtnDressClick);

		this.addMessageListener(UIEquipmentInfoMsg.OnBtnQiangHuaClick, this.UIEquipmentInfo_OnBtnQiangHuaClick);
		this.addMessageListener(UIEquipmentInfoMsg.OnBtnXiangQianClick, this.UIEquipmentInfo_OnBtnXiangQianClick);
		this.addMessageListener(UIEquipmentInfoMsg.OnBtnMingKeClick, this.UIEquipmentInfo_OnBtnMingKeClick);
		this.addMessageListener(UIEquipmentInfoMsg.OnBtnShenYouClick, this.UIEquipmentInfo_OnBtnShenYouClick);
		this.view.setOpenType(this.data.openBag ? 1 : 0);
	}

	onEnable(): void {
		super.onEnable();
		this.view.refreshEquipInfo(this.data.equip1, this.data.equip2, !this.data.openBag);
	}

	private UIEquipmentInfo_OnBtnSellClick(): void {
		const errorCode = this.userData.sellBagItem(this.data.equip1.id, 1, this.data.equip1.uid);
		if (!errorCode) this.removeTop();
		else UIUtility.ShowTipInfo(GetLang(errorCode));
	}

	private UIEquipmentInfo_OnBtnDressClick(): void {
		const errorCode = this.userData.dressEquipment(this.data.equip1);
		if (!errorCode) this.removeTop();
		else UIUtility.ShowTipInfo(GetLang(errorCode));
	}

	private UIEquipmentInfo_OnBtnQiangHuaClick(): void {
		const errorCode = this.userData.intensifyEquipment(this.data.equip1.part);
		if (!errorCode) UIUtility.ShowTipInfo("强化成功");
		else UIUtility.ShowTipInfo(GetLang(errorCode));
	}

	private UIEquipmentInfo_OnBtnXiangQianClick(): void {

	}

	private UIEquipmentInfo_OnBtnMingKeClick(): void {

	}

	private UIEquipmentInfo_OnBtnShenYouClick(): void {

	}

	onDisable(): void {
		super.onDisable();
	}

	onDestroy(): void {
		super.onDestroy();
	}
}