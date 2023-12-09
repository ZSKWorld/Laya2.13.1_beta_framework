import { ResPath } from "../../../../../common/ResPath";
import ComAbode from "../../../../ui/PkgMain/ComAbode";

export const enum ComAbodeMsg {
	OnBtnCreateClick = "ComAbode_OnBtnCreateClick",
	OnBtnAboutClick = "ComAbode_OnBtnAboutClick",
	OnBtnSettingClick = "ComAbode_OnBtnSettingClick",
	OnBtnMeetClick = "ComAbode_OnBtnMeetClick",
	OnBtnPetClick = "ComAbode_OnBtnPetClick",
	OnBtnRepairClick = "ComAbode_OnBtnRepairClick",
}

export class ComAbodeView extends ExtensionClass<IView, ComAbode>(ComAbode) {
	static readonly PkgRes = ResPath.PkgPath.PkgMain;

	override onCreate() {
		const { btn_create, btn_about, btn_setting, btn_meet, btn_pet, btn_repair } = this;
		btn_create.onClick(this, this.sendMessage, [ComAbodeMsg.OnBtnCreateClick]);
		btn_about.onClick(this, this.sendMessage, [ComAbodeMsg.OnBtnAboutClick]);
		btn_setting.onClick(this, this.sendMessage, [ComAbodeMsg.OnBtnSettingClick]);
		btn_meet.onClick(this, this.sendMessage, [ComAbodeMsg.OnBtnMeetClick]);
		btn_pet.onClick(this, this.sendMessage, [ComAbodeMsg.OnBtnPetClick]);
		btn_repair.onClick(this, this.sendMessage, [ComAbodeMsg.OnBtnRepairClick]);
	}

}
