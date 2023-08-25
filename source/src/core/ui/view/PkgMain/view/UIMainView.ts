import UIMain from "../../../ui/PkgMain/UIMain";
import { ResPath } from "../../../../common/ResPath";

export const enum UIMainMsg {
	OnBtnLiLianClick = "UIMain_OnBtnLiLianClick",
	OnBtnJueSeClick = "UIMain_OnBtnJueSeClick",
	OnBtnWuPinClick = "UIMain_OnBtnWuPinClick",
	OnBtnShangChengClick = "UIMain_OnBtnShangChengClick",
	OnBtnDongFuClick = "UIMain_OnBtnDongFuClick",
	OnBtnChatClick = "UIMain_OnBtnChatClick",
	OnBtnInfoClick = "UIMain_OnBtnInfoClick",
	OnBtnHeadClick = "UIMain_OnBtnHeadClick",
	OnBtnSettingClick = "UIMain_OnBtnSettingClick",
	OnBtnRankClick = "UIMain_OnBtnRankClick",
	OnBtnSphereClick = "UIMain_OnBtnSphereClick",
}

export class UIMainView extends ExtensionClass<IView, UIMain>(UIMain) {
    static readonly PkgRes = ResPath.PkgPath.PkgMain;

	override onCreate() {
        const { BtnLiLian, BtnJueSe, BtnWuPin, BtnShangCheng, BtnDongFu, BtnChat, BtnInfo, BtnHead, BtnSetting, BtnRank, BtnSphere } = this;
		BtnLiLian.onClick(this, this.sendMessage, [ UIMainMsg.OnBtnLiLianClick ]);
		BtnJueSe.onClick(this, this.sendMessage, [ UIMainMsg.OnBtnJueSeClick ]);
		BtnWuPin.onClick(this, this.sendMessage, [ UIMainMsg.OnBtnWuPinClick ]);
		BtnShangCheng.onClick(this, this.sendMessage, [ UIMainMsg.OnBtnShangChengClick ]);
		BtnDongFu.onClick(this, this.sendMessage, [ UIMainMsg.OnBtnDongFuClick ]);
		BtnChat.onClick(this, this.sendMessage, [ UIMainMsg.OnBtnChatClick ]);
		BtnInfo.onClick(this, this.sendMessage, [ UIMainMsg.OnBtnInfoClick ]);
		BtnHead.onClick(this, this.sendMessage, [ UIMainMsg.OnBtnHeadClick ]);
		BtnSetting.onClick(this, this.sendMessage, [ UIMainMsg.OnBtnSettingClick ]);
		BtnRank.onClick(this, this.sendMessage, [ UIMainMsg.OnBtnRankClick ]);
		BtnSphere.onClick(this, this.sendMessage, [ UIMainMsg.OnBtnSphereClick ]);
    }

}
