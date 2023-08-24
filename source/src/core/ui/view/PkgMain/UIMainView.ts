import { GameUtil } from "../../../common/GameUtil";
import { ResPath } from "../../../common/ResPath";
import { MathUtil } from "../../../libs/math/MathUtil";
import { tableMgr } from "../../../table/TableManager";
import { UserDataEvent } from "../../../userData/UserDataEvent";
import UIMain from "../../ui/PkgMain/UIMain";

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
	OnBtnSphereDraged = "OnBtnSphereDraged",
}

export class UIMainView extends ExtensionClass<IView, UIMain>(UIMain) {
	static readonly PkgRes = ResPath.PkgPath.PkgMain;

	override onCreate(): void {
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
		BtnSphere.on(fgui.Events.DRAG_START, this, this.sendMessage, [ UIMainMsg.OnBtnSphereDraged, true ]);
		BtnSphere.on(fgui.Events.DRAG_END, this, this.sendMessage, [ UIMainMsg.OnBtnSphereDraged, false ]);

		BtnSphere.draggable = true;
	}

	@RegisterEvent(UserDataEvent.Nickname_Changed)
	@RegisterEvent(UserDataEvent.JingJie_Changed)
	@RegisterEvent(UserDataEvent.CengJi_Changed)
	@RegisterEvent(UserDataEvent.Exp_Changed)
	@RegisterEvent(UserDataEvent.Coin_Changed)
	@RegisterEvent(UserDataEvent.Vcoin_Changed)
	@RegisterEvent(UserDataEvent.Sect_Changed)
	refreshPlayerInfo() {
		this.TxtNickName.text = this.userData.nickname;
		const { jingJie, cengJi, exp, coin, vcoin, sect } = this.userData;
		const nextJingJieExp = GameUtil.GetUpgradExp(jingJie, cengJi);
		this.TxtLevel.text = GameUtil.GetJingJieStr(jingJie, cengJi);
		this.TxtExp.text = nextJingJieExp == 0 ? "(最高境界)" : (MathUtil.ToGroupNumber(exp) + "/" + MathUtil.ToGroupNumber(nextJingJieExp));
		this.TxtJinBi.text = "金币:" + MathUtil.ToGroupNumber(coin, 4);
		this.TxtYuanBao.text = "元宝:" + MathUtil.ToGroupNumber(vcoin, 4);
		this.TxtSect.text = "门派：" + (tableMgr.Sect[ sect ]?.Name || "无");
	}

}
