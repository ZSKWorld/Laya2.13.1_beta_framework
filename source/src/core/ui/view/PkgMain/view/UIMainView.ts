import { MathUtil } from "../../../../game/math/MathUtil";
import { UserDataEvent } from "../../../../userData/UserDataEvent";
import { UserUtil } from "../../../../userData/UserUtil";
import UIMain from "../../../ui/PkgMain/UIMain";

export const enum UIMainMsg {
	OnBtnTrainClick = "UIMain_OnBtnTrainClick",
	OnBtnCharClick = "UIMain_OnBtnCharClick",
	OnBtnGoodsClick = "UIMain_OnBtnGoodsClick",
	OnBtnShopClick = "UIMain_OnBtnShopClick",
	OnBtnAbodeClick = "UIMain_OnBtnAbodeClick",
	OnBtnChatClick = "UIMain_OnBtnChatClick",
	OnBtnSettingClick = "UIMain_OnBtnSettingClick",
	OnBtnRankClick = "UIMain_OnBtnRankClick",
	OnBtnSphereClick = "UIMain_OnBtnSphereClick",
	OnBtnSphereDraged = "OnBtnSphereDraged",
}

export class UIMainView extends ExtensionClass<IView, UIMain>(UIMain) {
	static readonly pkgRes = ResPath.PkgPath.PkgMain;

	override onCreate() {
		const { btn_train, btn_char, btn_goods, btn_shop, btn_abode, btn_chat, btn_setting, btn_rank, btn_sphere } = this;
		btn_train.onClick(this, this.sendMessage, [UIMainMsg.OnBtnTrainClick]);
		btn_char.onClick(this, this.sendMessage, [UIMainMsg.OnBtnCharClick]);
		btn_goods.onClick(this, this.sendMessage, [UIMainMsg.OnBtnGoodsClick]);
		btn_shop.onClick(this, this.sendMessage, [UIMainMsg.OnBtnShopClick]);
		btn_abode.onClick(this, this.sendMessage, [UIMainMsg.OnBtnAbodeClick]);
		btn_chat.onClick(this, this.sendMessage, [UIMainMsg.OnBtnChatClick]);
		btn_setting.onClick(this, this.sendMessage, [UIMainMsg.OnBtnSettingClick]);
		btn_rank.onClick(this, this.sendMessage, [UIMainMsg.OnBtnRankClick]);
		btn_sphere.onClick(this, this.sendMessage, [UIMainMsg.OnBtnSphereClick]);
		btn_sphere.on(fgui.Events.DRAG_START, this, this.sendMessage, [UIMainMsg.OnBtnSphereDraged, true]);
		btn_sphere.on(fgui.Events.DRAG_END, this, this.sendMessage, [UIMainMsg.OnBtnSphereDraged, false]);

		btn_sphere.draggable = true;
	}

	@RegisterEvent(UserDataEvent.Account_Nickname_Changed)
	@RegisterEvent(UserDataEvent.User_Base_Changed)
	refreshPlayerInfo() {
		this.txt_nickname.text = userData.account.nickname;
		const { jingJie, cengJi, exp, coin, vcoin, sect } = userData.base;

		const nextJingJieExp = UserUtil.getUpgradExp(jingJie, cengJi);
		this.txt_level.text = UserUtil.getJingJieStr(jingJie, cengJi);
		this.txt_exp.text = nextJingJieExp == 0 ? "(最高境界)" : (MathUtil.toGroupNumber(exp) + "/" + MathUtil.toGroupNumber(nextJingJieExp));
		this.txt_coin.text = "金币:" + MathUtil.toGroupNumber(coin);
		this.txt_ingot.text = "元宝:" + MathUtil.toGroupNumber(vcoin);
		this.txt_sect.text = "门派：" + (cfgMgr.Sect[sect]?.name || "无");
	}

}
