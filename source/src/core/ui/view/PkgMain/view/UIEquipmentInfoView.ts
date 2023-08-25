import UIEquipmentInfo from "../../../ui/PkgMain/UIEquipmentInfo";
import { ResPath } from "../../../../common/ResPath";

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
        const { btn_sell, btn_dress, btn_intensify, btn_inlay, btn_engrave, btn_bless } = this;
		btn_sell.onClick(this, this.sendMessage, [ UIEquipmentInfoMsg.OnBtnSellClick ]);
		btn_dress.onClick(this, this.sendMessage, [ UIEquipmentInfoMsg.OnBtnDressClick ]);
		btn_intensify.onClick(this, this.sendMessage, [ UIEquipmentInfoMsg.OnBtnIntensifyClick ]);
		btn_inlay.onClick(this, this.sendMessage, [ UIEquipmentInfoMsg.OnBtnInlayClick ]);
		btn_engrave.onClick(this, this.sendMessage, [ UIEquipmentInfoMsg.OnBtnEngraveClick ]);
		btn_bless.onClick(this, this.sendMessage, [ UIEquipmentInfoMsg.OnBtnBlessClick ]);
    }

}
