import { ExtensionClass } from "../../../libs/utils/Util";
import { ViewExtension } from "../../core/Interfaces";
import UIEquipmentInfo from "../../ui/PkgMain/UIEquipmentInfo";
import { ResPath } from "../../../common/ResPath";

export const enum UIEquipmentInfoMsg {
	OnBtnBgClick = "UIEquipmentInfo_OnBtnBgClick",
	OnBtnSellClick = "UIEquipmentInfo_OnBtnSellClick",
	OnBtnDressClick = "UIEquipmentInfo_OnBtnDressClick",
	OnBtnQiangHuaClick = "UIEquipmentInfo_OnBtnQiangHuaClick",
	OnBtnXiangQianClick = "UIEquipmentInfo_OnBtnXiangQianClick",
	OnBtnMingKeClick = "UIEquipmentInfo_OnBtnMingKeClick",
	OnBtnShenYouClick = "UIEquipmentInfo_OnBtnShenYouClick",
}

export class UIEquipmentInfoView extends ExtensionClass<ViewExtension, UIEquipmentInfo>(UIEquipmentInfo) {
    static readonly PkgRes = ResPath.UIPath.PkgMain;

	override onCreate(): void {
        const { BtnBg, BtnSell, BtnDress, BtnQiangHua, BtnXiangQian, BtnMingKe, BtnShenYou } = this;
	    BtnBg.onClick(this, this.sendMessage, [ UIEquipmentInfoMsg.OnBtnBgClick ]);
	    BtnSell.onClick(this, this.sendMessage, [ UIEquipmentInfoMsg.OnBtnSellClick ]);
	    BtnDress.onClick(this, this.sendMessage, [ UIEquipmentInfoMsg.OnBtnDressClick ]);
	    BtnQiangHua.onClick(this, this.sendMessage, [ UIEquipmentInfoMsg.OnBtnQiangHuaClick ]);
	    BtnXiangQian.onClick(this, this.sendMessage, [ UIEquipmentInfoMsg.OnBtnXiangQianClick ]);
	    BtnMingKe.onClick(this, this.sendMessage, [ UIEquipmentInfoMsg.OnBtnMingKeClick ]);
	    BtnShenYou.onClick(this, this.sendMessage, [ UIEquipmentInfoMsg.OnBtnShenYouClick ]);
    }

}
