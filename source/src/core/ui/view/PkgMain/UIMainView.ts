import { GameUtil } from "../../../common/GameUtil";
import { ResPath } from "../../../common/ResPath";
import { InsertEvent } from "../../../libs/event/EventMgr";
import { MathUtil } from "../../../libs/math/MathUtil";
import { ExtensionClass } from "../../../libs/utils/Util";
import { tableMgr } from "../../../table/TableManager";
import { UserDataEvent } from "../../../userData/UserDataEvent";
import { ViewExtension } from "../../core/Interfaces";
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

export class UIMainView extends ExtensionClass<ViewExtension, UIMain>(UIMain) {
	static readonly PkgRes = ResPath.UIPath.PkgMain;

	override onCreate(): void {
		const { ComLiLian, ComJueSe, ComWuPin, ComShangCheng, ComDongFu, BtnLiLian, BtnJueSe, BtnWuPin, BtnShangCheng, BtnDongFu, BtnChat, BtnInfo, BtnHead, BtnSetting, BtnRank, BtnSphere } = this;
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

		this.initView(ComLiLian);
		this.initView(ComJueSe);
		this.initView(ComWuPin);
		this.initView(ComShangCheng);
		this.initView(ComDongFu);

		BtnSphere.draggable = true;
	}

	@InsertEvent(UserDataEvent.Nickname_Changed)
	@InsertEvent(UserDataEvent.JingJie_Changed)
	@InsertEvent(UserDataEvent.CengJi_Changed)
	@InsertEvent(UserDataEvent.Exp_Changed)
	@InsertEvent(UserDataEvent.Coin_Changed)
	@InsertEvent(UserDataEvent.Vcoin_Changed)
	@InsertEvent(UserDataEvent.Sect_Changed)
	refreshPlayerInfo() {
		this.TxtNickName.text = this.userData.nickname;
		const { jingJie, cengJi, exp, coin, vcoin, sect } = this.userData;
		const nextJingJieExp = GameUtil.getUpgradExp(jingJie, cengJi);
		this.TxtLevel.text = GameUtil.getJingJieStr(jingJie, cengJi);
		this.TxtExp.text = nextJingJieExp == 0 ? "(最高境界)" : (MathUtil.ToGroupNumber(exp) + "/" + MathUtil.ToGroupNumber(nextJingJieExp));
		this.TxtJinBi.text = "金币:" + MathUtil.ToGroupNumber(coin, 4);
		this.TxtYuanBao.text = "元宝:" + MathUtil.ToGroupNumber(vcoin, 4);
		this.TxtSect.text = "门派：" + (tableMgr.Sect[ sect ]?.Name || "无");
	}

}
