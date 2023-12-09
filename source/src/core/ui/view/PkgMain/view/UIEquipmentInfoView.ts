import { ResPath } from "../../../../common/ResPath";
import { UserUtil } from "../../../../userData/UserUtil";
import UIEquipmentInfo from "../../../ui/PkgMain/UIEquipmentInfo";

export const enum UIEquipmentInfoMsg {
	OnBtnSellClick = "UIEquipmentInfo_OnBtnSellClick",
	OnBtnDressClick = "UIEquipmentInfo_OnBtnDressClick",
	OnBtnIntensifyClick = "UIEquipmentInfo_OnBtnIntensifyClick",
	OnBtnInlayClick = "UIEquipmentInfo_OnBtnInlayClick",
	OnBtnEngraveClick = "UIEquipmentInfo_OnBtnEngraveClick",
	OnBtnBlessClick = "UIEquipmentInfo_OnBtnBlessClick",
}

export class UIEquipmentInfoView extends ExtensionClass<IView, UIEquipmentInfo>(UIEquipmentInfo) {
	static readonly PkgRes = ResPath.PkgPath.PkgMain;

	override onCreate() {
		const { graph_bg, btn_sell, btn_dress, btn_intensify, btn_inlay, btn_engrave, btn_bless } = this;
		graph_bg.onClick(this, this.removeSelf);
		btn_sell.onClick(this, this.sendMessage, [UIEquipmentInfoMsg.OnBtnSellClick]);
		btn_dress.onClick(this, this.sendMessage, [UIEquipmentInfoMsg.OnBtnDressClick]);
		btn_intensify.onClick(this, this.sendMessage, [UIEquipmentInfoMsg.OnBtnIntensifyClick]);
		btn_inlay.onClick(this, this.sendMessage, [UIEquipmentInfoMsg.OnBtnInlayClick]);
		btn_engrave.onClick(this, this.sendMessage, [UIEquipmentInfoMsg.OnBtnEngraveClick]);
		btn_bless.onClick(this, this.sendMessage, [UIEquipmentInfoMsg.OnBtnBlessClick]);
	}

	refreshEquipInfo(equip1: IEquipment, equip2: IEquipment, hasGem: boolean) {
		this.txt_equipInfo1.text = UserUtil.getEquipInfoStr(equip1, hasGem);
		this.txt_equipInfo2.text = UserUtil.getEquipInfoStr(equip2, false);
	}


	setOpenType(type: number) {
		this.ctrlType.selectedIndex = type;
	}

}
