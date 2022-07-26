import { ResPath } from "../../../../common/ResPath";
import { ExtensionClass } from "../../../../libs/utils/Util";
import { ViewExtension } from "../../../core/interfaces";
import ComZhiZuo from "../../../ui/PkgMain/ComZhiZuo";

export const enum ComZhiZuoMsg {
	OnBtnFJZBClick = "ComZhiZuo_OnBtnFJZBClick",
	OnBtnFJBSClick = "ComZhiZuo_OnBtnFJBSClick",
	OnBtnYJHCClick = "ComZhiZuo_OnBtnYJHCClick",
	OnBtnJPYLClick = "ComZhiZuo_OnBtnJPYLClick",
	OnBtnDZZBClick = "ComZhiZuo_OnBtnDZZBClick",
	OnBtnZJZBClick = "ComZhiZuo_OnBtnZJZBClick",
	OnBtnCZZBClick = "ComZhiZuo_OnBtnCZZBClick",
	OnBtnBSHCClick = "ComZhiZuo_OnBtnBSHCClick",
	OnBtnZZTZClick = "ComZhiZuo_OnBtnZZTZClick",
	OnCmbFJZBDropDownDisplay = "ComZhiZuo_OnCmbFJZBDropDownDisplay",
	OnCmbFJBSDropDownDisplay = "ComZhiZuo_OnCmbFJBSDropDownDisplay",
}

export class ComZhiZuoView extends ExtensionClass<ViewExtension, ComZhiZuo>(ComZhiZuo) {
	static PkgRes = ResPath.Ui_PkgMain;

	onCreate(): void {
		const { BtnFJZB, BtnFJBS, BtnYJHC, BtnJPYL, BtnDZZB, BtnZJZB, BtnCZZB, BtnBSHC, BtnZZTZ, CmbFJZBDJ, CmbFJBSDJ } = this;
		BtnFJZB.onClick(this, this.sendMessage, [ComZhiZuoMsg.OnBtnFJZBClick]);
		BtnFJBS.onClick(this, this.sendMessage, [ComZhiZuoMsg.OnBtnFJBSClick]);
		BtnYJHC.onClick(this, this.sendMessage, [ComZhiZuoMsg.OnBtnYJHCClick]);
		BtnJPYL.onClick(this, this.sendMessage, [ComZhiZuoMsg.OnBtnJPYLClick]);
		BtnDZZB.onClick(this, this.sendMessage, [ComZhiZuoMsg.OnBtnDZZBClick]);
		BtnZJZB.onClick(this, this.sendMessage, [ComZhiZuoMsg.OnBtnZJZBClick]);
		BtnCZZB.onClick(this, this.sendMessage, [ComZhiZuoMsg.OnBtnCZZBClick]);
		BtnBSHC.onClick(this, this.sendMessage, [ComZhiZuoMsg.OnBtnBSHCClick]);
		BtnZZTZ.onClick(this, this.sendMessage, [ComZhiZuoMsg.OnBtnZZTZClick]);

		CmbFJZBDJ.dropdown.on(Laya.Event.DISPLAY, this, this.sendMessage, [ComZhiZuoMsg.OnCmbFJZBDropDownDisplay]);
		CmbFJBSDJ.dropdown.on(Laya.Event.DISPLAY, this, this.sendMessage, [ComZhiZuoMsg.OnCmbFJBSDropDownDisplay]);
	}

}
