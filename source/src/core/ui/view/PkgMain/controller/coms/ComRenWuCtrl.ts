import { EquipmentPart } from "../../../../../net/enum/ItemEnum";
import { BaseViewCtrl } from "../../../../core/BaseViewCtrl";
import { ViewID } from "../../../../core/ViewID";
import { tipMgr } from "../../../../tool/TipManager";
import { ComRenWuMsg, ComRenWuView } from "../../view/coms/ComRenWuView";
import { UIEquipmentInfoData } from "../UIEquipmentInfoCtrl";

export interface ComRenWuData {

}

export class ComRenWuCtrl extends BaseViewCtrl<ComRenWuView, ComRenWuData>{

	override onAdded() {
		this.addMessage(ComRenWuMsg.OnBtnWuQiClick, this.showEquipmentInfo, [EquipmentPart.Weapon]);
		this.addMessage(ComRenWuMsg.OnBtnXiangLianClick, this.showEquipmentInfo, [EquipmentPart.Necklace]);
		this.addMessage(ComRenWuMsg.OnBtnJieZhiClick, this.showEquipmentInfo, [EquipmentPart.Ring]);
		this.addMessage(ComRenWuMsg.OnBtnHuFuClick, this.showEquipmentInfo, [EquipmentPart.Amulet]);
		this.addMessage(ComRenWuMsg.OnBtnZuoQiClick, this.showEquipmentInfo, [EquipmentPart.Mount]);
		this.addMessage(ComRenWuMsg.OnBtnAnQiClick, this.showEquipmentInfo, [EquipmentPart.HiddenWeeapon]);
		this.addMessage(ComRenWuMsg.OnBtnTouKuiClick, this.showEquipmentInfo, [EquipmentPart.Helmet]);
		this.addMessage(ComRenWuMsg.OnBtnYiFuClick, this.showEquipmentInfo, [EquipmentPart.Clothes]);
		this.addMessage(ComRenWuMsg.OnBtnXiaZhuangClick, this.showEquipmentInfo, [EquipmentPart.Trousers]);
		this.addMessage(ComRenWuMsg.OnBtnXieZiClick, this.showEquipmentInfo, [EquipmentPart.Shoes]);
		this.addMessage(ComRenWuMsg.OnBtnShiZhuangClick, this.showEquipmentInfo, [EquipmentPart.Fashion]);
		this.addMessage(ComRenWuMsg.OnBtnFaBaoClick, this.showEquipmentInfo, [EquipmentPart.MagicWeapon]);
	}

	override onEnable() {
		this.view.refreshEquipInfo();
	}

	private showEquipmentInfo(type: EquipmentPart) {
		let equip1 = userData.body.getDressedEquip(type);
		if (!equip1) return tipMgr.showTip(cfgMgr.Lang[1012].text);
		this.showView<UIEquipmentInfoData>(ViewID.UIEquipmentInfoView, { equip1 });
	}

}