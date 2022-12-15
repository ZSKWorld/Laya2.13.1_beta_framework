import { ResPath } from "../../../../common/ResPath";
import { ExtensionClass } from "../../../../libs/utils/Util";
import { ViewExtension } from "../../../core/Interfaces";
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
	static readonly PkgRes = ResPath.UIPath.PkgMain;

	override onCreate(): void {
		const { BtnCreate, BtnAbout, BtnSetting, BtnMeet, BtnPet, BtnRepair, ComZhiZuo } = this;
		BtnCreate.onClick(this, this.sendMessage, [ ComDongFuMsg.OnBtnCreateClick ]);
		BtnAbout.onClick(this, this.sendMessage, [ ComDongFuMsg.OnBtnAboutClick ]);
		BtnSetting.onClick(this, this.sendMessage, [ ComDongFuMsg.OnBtnSettingClick ]);
		BtnMeet.onClick(this, this.sendMessage, [ ComDongFuMsg.OnBtnMeetClick ]);
		BtnPet.onClick(this, this.sendMessage, [ ComDongFuMsg.OnBtnPetClick ]);
		BtnRepair.onClick(this, this.sendMessage, [ ComDongFuMsg.OnBtnRepairClick ]);

		this.initView(ComZhiZuo);
	}

}
