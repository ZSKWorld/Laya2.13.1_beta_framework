import { ResPath } from "../../../../../common/ResPath";
import { MathUtil } from "../../../../../libs/math/MathUtil";
import { NetMessage } from "../../../../../net/enum/NetMessage";
import { UserDataEvent } from "../../../../../userData/UserDataEvent";
import ComRenWu from "../../../../ui/PkgMain/ComRenWu";

export const enum ComRenWuMsg {
	OnBtnWuQiClick = "ComRenWu_OnBtnWuQiClick",
	OnBtnXiangLianClick = "ComRenWu_OnBtnXiangLianClick",
	OnBtnJieZhiClick = "ComRenWu_OnBtnJieZhiClick",
	OnBtnHuFuClick = "ComRenWu_OnBtnHuFuClick",
	OnBtnZuoQiClick = "ComRenWu_OnBtnZuoQiClick",
	OnBtnAnQiClick = "ComRenWu_OnBtnAnQiClick",
	OnBtnTouKuiClick = "ComRenWu_OnBtnTouKuiClick",
	OnBtnYiFuClick = "ComRenWu_OnBtnYiFuClick",
	OnBtnXiaZhuangClick = "ComRenWu_OnBtnXiaZhuangClick",
	OnBtnXieZiClick = "ComRenWu_OnBtnXieZiClick",
	OnBtnShiZhuangClick = "ComRenWu_OnBtnShiZhuangClick",
	OnBtnFaBaoClick = "ComRenWu_OnBtnFaBaoClick",
}

export class ComRenWuView extends ExtensionClass<IView, ComRenWu>(ComRenWu) {
	static readonly PkgRes = ResPath.PkgPath.PkgMain;

	override onCreate() {
		const { btn_wuQi, btn_xiangLian, btn_jieZhi, btn_huFu, btn_zuoQi, btn_anQi, btn_touKui, btn_yiFu, btn_xiaZhuang, btn_xieZi, btn_shiZhuang, btn_faBao } = this;
		btn_wuQi.onClick(this, this.sendMessage, [ ComRenWuMsg.OnBtnWuQiClick ]);
		btn_xiangLian.onClick(this, this.sendMessage, [ ComRenWuMsg.OnBtnXiangLianClick ]);
		btn_jieZhi.onClick(this, this.sendMessage, [ ComRenWuMsg.OnBtnJieZhiClick ]);
		btn_huFu.onClick(this, this.sendMessage, [ ComRenWuMsg.OnBtnHuFuClick ]);
		btn_zuoQi.onClick(this, this.sendMessage, [ ComRenWuMsg.OnBtnZuoQiClick ]);
		btn_anQi.onClick(this, this.sendMessage, [ ComRenWuMsg.OnBtnAnQiClick ]);
		btn_touKui.onClick(this, this.sendMessage, [ ComRenWuMsg.OnBtnTouKuiClick ]);
		btn_yiFu.onClick(this, this.sendMessage, [ ComRenWuMsg.OnBtnYiFuClick ]);
		btn_xiaZhuang.onClick(this, this.sendMessage, [ ComRenWuMsg.OnBtnXiaZhuangClick ]);
		btn_xieZi.onClick(this, this.sendMessage, [ ComRenWuMsg.OnBtnXieZiClick ]);
		btn_shiZhuang.onClick(this, this.sendMessage, [ ComRenWuMsg.OnBtnShiZhuangClick ]);
		btn_faBao.onClick(this, this.sendMessage, [ ComRenWuMsg.OnBtnFaBaoClick ]);
	}

	@RegisterEvent(UserDataEvent.UserData_Bag_Changed)
	@RegisterEvent(UserDataEvent.UserData_Base_Changed)
	@RegisterEvent(UserDataEvent.UserData_Body_Changed)
	refreshEquipInfo() {
		const { account, base, friend, bag, body, battle } = userData;
		const { weapon, helmet, necklace, clothes, ring, trousers, amulet, shoes, mount, hiddenWeeapon, fashion, magicWeapon } = body;
		const { vigor, maxVigro, moHe, moBi, spiritStones, vigorRecover, soul, gemScore, upgradeExp } = base;
		const { btn_wuQi,btn_xiangLian,btn_jieZhi,btn_huFu,btn_zuoQi,btn_anQi,btn_touKui,btn_yiFu,btn_xiaZhuang,btn_xieZi,btn_shiZhuang,
			btn_faBao, txt_jingLi, txt_jinAtk, txt_muAtk, txt_shuiAtk, txt_huoAtk, txt_tuAtk, txt_moHe, txt_moBi, txt_lingShi, txt_jingLiHF, txt_jinDef,
		txt_muDef,txt_shuiDef,txt_huoDef,txt_tuDef,txt_hunPo,txt_gemScore,txt_exp} = this;

		btn_wuQi.text = weapon ? (weapon.name + " +" + weapon.level) : "无";
		btn_xiangLian.text = necklace ? (necklace.name + " +" + necklace.level) : "无";
		btn_jieZhi.text = ring ? (ring.name + " +" + ring.level) : "无";
		btn_huFu.text = amulet ? (amulet.name + " +" + amulet.level) : "无";
		btn_touKui.text = helmet ? (helmet.name + " +" + helmet.level) : "无";
		btn_yiFu.text = clothes ? (clothes.name + " +" + clothes.level) : "无";
		btn_xiaZhuang.text = trousers ? (trousers.name + " +" + trousers.level) : "无";
		btn_xieZi.text = shoes ? (shoes.name + " +" + shoes.level) : "无";

		btn_zuoQi.text = mount ? (mount.name + " +" + mount.level) : "无";
		btn_anQi.text = hiddenWeeapon ? (hiddenWeeapon.name + " +" + hiddenWeeapon.level) : "无";
		btn_shiZhuang.text = fashion ? (fashion.name + " +" + fashion.level) : "无";
		btn_faBao.text = magicWeapon ? (magicWeapon.name + " +" + magicWeapon.level) : "无";

		const defaultColor = cfgMgr.Color[ 1 ].color;
		btn_wuQi.titleColor = weapon?.color || defaultColor;
		btn_xiangLian.titleColor = necklace?.color || defaultColor;
		btn_jieZhi.titleColor = ring?.color || defaultColor;
		btn_huFu.titleColor = amulet?.color || defaultColor;
		btn_touKui.titleColor = helmet?.color || defaultColor;
		btn_yiFu.titleColor = clothes?.color || defaultColor;
		btn_xiaZhuang.titleColor = trousers?.color || defaultColor;
		btn_xieZi.titleColor = shoes?.color || defaultColor;

		btn_zuoQi.titleColor = mount?.color || defaultColor;
		btn_anQi.titleColor = hiddenWeeapon?.color || defaultColor;
		btn_shiZhuang.titleColor = fashion?.color || defaultColor;
		btn_faBao.titleColor = magicWeapon?.color || defaultColor;

		// const { jinGong, muGong, shuiGong, huoGong, tuGong, jinFang, muFang, shuiFang, huoFang, tuFang, } = this.userData.attribute;
		const [ jinGong, muGong, shuiGong, huoGong, tuGong, jinFang, muFang, shuiFang, huoFang, tuFang ] = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
		txt_jingLi.text = "精力：" + Math.floor(vigor) + "/" + maxVigro;
		txt_jinAtk.text = "金攻：" + jinGong;
		txt_muAtk.text = "木攻：" + muGong;
		txt_shuiAtk.text = "水攻：" + shuiGong;
		txt_huoAtk.text = "火攻：" + huoGong;
		txt_tuAtk.text = "土攻：" + tuGong;
		txt_moHe.text = "魔核：" + moHe;
		txt_moBi.text = "魔币：" + moBi;
		txt_lingShi.text = "灵石：" + spiritStones;

		txt_jingLiHF.text = "精力恢复：" + vigorRecover.toFixed(3) + "/s";
		txt_jinDef.text = "金防：" + jinFang;
		txt_muDef.text = "木防：" + muFang;
		txt_shuiDef.text = "水防：" + shuiFang;
		txt_huoDef.text = "火防：" + huoFang;
		txt_tuDef.text = "土防：" + tuFang;
		txt_hunPo.text = "魂魄：" + soul;
		txt_gemScore.text = "宝石积分：" + gemScore;
		txt_exp.text = "升级经验：" + MathUtil.ToGroupNumber(upgradeExp);
	}

}
