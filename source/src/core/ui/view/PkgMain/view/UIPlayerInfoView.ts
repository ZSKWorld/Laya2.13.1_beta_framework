import UIPlayerInfo from "../../../ui/PkgMain/UIPlayerInfo";

export const enum UIPlayerInfoMsg {
	OnBtnExplainClick = "UIPlayerInfo_OnBtnExplainClick",
	OnBtnBackClick = "UIPlayerInfo_OnBtnBackClick",
	OnBtnCopyIDClick = "UIPlayerInfo_OnBtnCopyIDClick",
	OnBtnGiftClick = "UIPlayerInfo_OnBtnGiftClick",
}

export class UIPlayerInfoView extends ExtensionClass<IView, UIPlayerInfo>(UIPlayerInfo) {
	static readonly pkgRes = ResPath.PkgPath.PkgMain;

	override onCreate() {
		const { btn_explain, btn_back, btn_copyID, btn_gift } = this;
		btn_explain.onClick(this, this.sendMessage, [UIPlayerInfoMsg.OnBtnExplainClick]);
		btn_back.onClick(this, this.sendMessage, [UIPlayerInfoMsg.OnBtnBackClick]);
		btn_copyID.onClick(this, this.sendMessage, [UIPlayerInfoMsg.OnBtnCopyIDClick]);
		btn_gift.onClick(this, this.sendMessage, [UIPlayerInfoMsg.OnBtnGiftClick]);
	}

}
