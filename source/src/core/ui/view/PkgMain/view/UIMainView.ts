import UIMain from "../../../ui/PkgMain/UIMain";
import { ResPath } from "../../../../common/ResPath";
import { UserDataEvent } from "../../../../userData/UserDataEvent";
import { GameUtil } from "../../../../common/GameUtil";
import { MathUtil } from "../../../../libs/math/MathUtil";
import { UserUtil } from "../../../../userData/UserUtil";

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
    static readonly PkgRes = ResPath.PkgPath.PkgMain;

	override onCreate() {
        const { btn_train, btn_char, btn_goods, btn_shop, btn_abode, btn_chat, btn_setting, btn_rank, btn_sphere } = this;
		btn_train.onClick(this, this.sendMessage, [ UIMainMsg.OnBtnTrainClick ]);
		btn_char.onClick(this, this.sendMessage, [ UIMainMsg.OnBtnCharClick ]);
		btn_goods.onClick(this, this.sendMessage, [ UIMainMsg.OnBtnGoodsClick ]);
		btn_shop.onClick(this, this.sendMessage, [ UIMainMsg.OnBtnShopClick ]);
		btn_abode.onClick(this, this.sendMessage, [ UIMainMsg.OnBtnAbodeClick ]);
		btn_chat.onClick(this, this.sendMessage, [ UIMainMsg.OnBtnChatClick ]);
		btn_setting.onClick(this, this.sendMessage, [ UIMainMsg.OnBtnSettingClick ]);
		btn_rank.onClick(this, this.sendMessage, [ UIMainMsg.OnBtnRankClick ]);
		btn_sphere.onClick(this, this.sendMessage, [ UIMainMsg.OnBtnSphereClick ]);
		btn_sphere.on(fgui.Events.DRAG_START, this, this.sendMessage, [ UIMainMsg.OnBtnSphereDraged, true ]);
		btn_sphere.on(fgui.Events.DRAG_END, this, this.sendMessage, [ UIMainMsg.OnBtnSphereDraged, false ]);

		btn_sphere.draggable = true;
    }

	@RegisterEvent(UserDataEvent.AccountData_Nickname_Changed)
	@RegisterEvent(UserDataEvent.UserData_Base_Changed)
	refreshPlayerInfo() {
		this.txt_nickname.text = userData.account.nickname;
		const { jingJie, cengJi, exp, coin, vcoin, sect } = userData.base;

		const nextJingJieExp = UserUtil.GetUpgradExp(jingJie, cengJi);
		this.txt_level.text = UserUtil.GetJingJieStr(jingJie, cengJi);
		this.txt_exp.text = nextJingJieExp == 0 ? "(最高境界)" : (MathUtil.ToGroupNumber(exp) + "/" + MathUtil.ToGroupNumber(nextJingJieExp));
		this.txt_coin.text = "金币:" + MathUtil.ToGroupNumber(coin, 4);
		this.txt_ingot.text = "元宝:" + MathUtil.ToGroupNumber(vcoin, 4);
		this.txt_sect.text = "门派：" + (cfgMgr.Sect[ sect ]?.name || "无");
	}

}
