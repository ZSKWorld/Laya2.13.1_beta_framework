import { ExtensionClass } from "../../../libs/utils/Util";
import { ViewExtension } from "../../core/Interfaces";
import UISetting from "../../ui/PkgMain/UISetting";
import { ResPath } from "../../../common/ResPath";

export const enum UISettingMsg {
	OnBtnBgClick = "UISetting_OnBtnBgClick",
	OnBtnHangUpClick = "UISetting_OnBtnHangUpClick",
	OnBtnMuteClick = "UISetting_OnBtnMuteClick",
	OnBtnSignInClick = "UISetting_OnBtnSignInClick",
	OnBtnHelpClick = "UISetting_OnBtnHelpClick",
	OnBtnClearAccountClick = "UISetting_OnBtnClearAccountClick",
	OnBtnBackClick = "UISetting_OnBtnBackClick",
}

export class UISettingView extends ExtensionClass<ViewExtension, UISetting>(UISetting) {
    static readonly PkgRes = ResPath.UIPath.PkgMain;

	override onCreate(): void {
        const { BtnBg, BtnHangUp, BtnMute, BtnSignIn, BtnHelp, BtnClearAccount, BtnBack } = this;
	    BtnBg.onClick(this, this.sendMessage, [ UISettingMsg.OnBtnBgClick ]);
	    BtnHangUp.onClick(this, this.sendMessage, [ UISettingMsg.OnBtnHangUpClick ]);
	    BtnMute.onClick(this, this.sendMessage, [ UISettingMsg.OnBtnMuteClick ]);
	    BtnSignIn.onClick(this, this.sendMessage, [ UISettingMsg.OnBtnSignInClick ]);
	    BtnHelp.onClick(this, this.sendMessage, [ UISettingMsg.OnBtnHelpClick ]);
	    BtnClearAccount.onClick(this, this.sendMessage, [ UISettingMsg.OnBtnClearAccountClick ]);
	    BtnBack.onClick(this, this.sendMessage, [ UISettingMsg.OnBtnBackClick ]);
    }

}
