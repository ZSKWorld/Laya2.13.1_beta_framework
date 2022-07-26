import { ResPath } from "../../../../common/ResPath";
import { ExtensionClass } from "../../../../libs/utils/Util";
import { ViewExtension } from "../../../core/interfaces";
import { ViewID } from "../../../core/ViewID";
import ComDongFu from "../../../ui/PkgMain/ComDongFu";

export const enum ComDongFuMsg {
	OnBtnCreateClick = "ComDongFu_OnBtnCreateClick",
	OnBtnAboutClick = "ComDongFu_OnBtnAboutClick",
	OnBtnSettingClick = "ComDongFu_OnBtnSettingClick",
	OnBtnMeetClick = "ComDongFu_OnBtnMeetClick",
	OnBtnPetClick = "ComDongFu_OnBtnPetClick",
	OnBtnRepairClick = "ComDongFu_OnBtnRepairClick",
}

export class ComDongFuView extends ExtensionClass<ViewExtension, ComDongFu>(ComDongFu) {
	static PkgRes = ResPath.Ui_PkgMain;

	onCreate(): void {
		const { listener, BtnCreate, BtnAbout, BtnSetting, BtnMeet, BtnPet, BtnRepair, ComZhiZuo } = this;
		BtnCreate.onClick(this, this.sendMessage, [ComDongFuMsg.OnBtnCreateClick]);
		BtnAbout.onClick(this, this.sendMessage, [ComDongFuMsg.OnBtnAboutClick]);
		BtnSetting.onClick(this, this.sendMessage, [ComDongFuMsg.OnBtnSettingClick]);
		BtnMeet.onClick(this, this.sendMessage, [ComDongFuMsg.OnBtnMeetClick]);
		BtnPet.onClick(this, this.sendMessage, [ComDongFuMsg.OnBtnPetClick]);
		BtnRepair.onClick(this, this.sendMessage, [ComDongFuMsg.OnBtnRepairClick]);

		this.initView(ViewID.ComZhiZuoView, ComZhiZuo, listener);
	}

}
