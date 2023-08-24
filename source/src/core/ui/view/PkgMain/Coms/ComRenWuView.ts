import { ResPath } from "../../../../common/ResPath";
import { MathUtil } from "../../../../libs/math/MathUtil";
import { NetMessage } from "../../../../net/enum/NetMessage";
import { tableMgr } from "../../../../table/TableManager";
import ComRenWu from "../../../ui/PkgMain/ComRenWu";

export const enum ComRenWuMsg {
	OnBtnWQClick = "ComRenWu_OnBtnWQClick",
	OnBtnXLClick = "ComRenWu_OnBtnXLClick",
	OnBtnJZClick = "ComRenWu_OnBtnJZClick",
	OnBtnHFClick = "ComRenWu_OnBtnHFClick",
	OnBtnZQClick = "ComRenWu_OnBtnZQClick",
	OnBtnAQClick = "ComRenWu_OnBtnAQClick",
	OnBtnTKClick = "ComRenWu_OnBtnTKClick",
	OnBtnYFClick = "ComRenWu_OnBtnYFClick",
	OnBtnXZClick = "ComRenWu_OnBtnXZClick",
	OnBtnXieZClick = "ComRenWu_OnBtnXieZClick",
	OnBtnSZClick = "ComRenWu_OnBtnSZClick",
	OnBtnFBClick = "ComRenWu_OnBtnFBClick",
}

export class ComRenWuView extends ExtensionClass<IView, ComRenWu>(ComRenWu) {
	static readonly PkgRes = ResPath.PkgPath.PkgMain;

	override onCreate(): void {
		const { BtnWQ, BtnXL, BtnJZ, BtnHF, BtnZQ, BtnAQ, BtnTK, BtnYF, BtnXZ, BtnXieZ, BtnSZ, BtnFB } = this;
		BtnWQ.onClick(this, this.sendMessage, [ ComRenWuMsg.OnBtnWQClick ]);
		BtnXL.onClick(this, this.sendMessage, [ ComRenWuMsg.OnBtnXLClick ]);
		BtnJZ.onClick(this, this.sendMessage, [ ComRenWuMsg.OnBtnJZClick ]);
		BtnHF.onClick(this, this.sendMessage, [ ComRenWuMsg.OnBtnHFClick ]);
		BtnZQ.onClick(this, this.sendMessage, [ ComRenWuMsg.OnBtnZQClick ]);
		BtnAQ.onClick(this, this.sendMessage, [ ComRenWuMsg.OnBtnAQClick ]);
		BtnTK.onClick(this, this.sendMessage, [ ComRenWuMsg.OnBtnTKClick ]);
		BtnYF.onClick(this, this.sendMessage, [ ComRenWuMsg.OnBtnYFClick ]);
		BtnXZ.onClick(this, this.sendMessage, [ ComRenWuMsg.OnBtnXZClick ]);
		BtnXieZ.onClick(this, this.sendMessage, [ ComRenWuMsg.OnBtnXieZClick ]);
		BtnSZ.onClick(this, this.sendMessage, [ ComRenWuMsg.OnBtnSZClick ]);
		BtnFB.onClick(this, this.sendMessage, [ ComRenWuMsg.OnBtnFBClick ]);
	}

	@RegisterEvent(NetMessage.SyncInfo)
	refreshEquipInfo() {
		const { weapon, necklace, ring, amulet, helmet, clothes, trousers, shoes, mount, hiddenWeeapon, fashion, magicWeapon, vigor, maxVigro, moHe, moBi,
			spiritStones, jingLiHuiFu, soul, gemScore, upgradeExp, } = this.userData;

		const { BtnWQ, BtnXL, BtnJZ, BtnHF, BtnZQ, BtnAQ, BtnTK, BtnYF, BtnXZ, BtnXieZ, BtnSZ, BtnFB, TxtJingLi, TxtJinAtk, TxtMuAtk,
			TxtShuiAtk, TxtHuoAtk, TxtTuAtk, TxtMoHe, TxtMoBi, TxtLingShi, TxtJingLiHF, TxtJinDef, TxtMuDef, TxtShuiDef, TxtHuoDef,
			TxtTuDef, TxtHunPo, TxtGemScore, TxtExp } = this;

		BtnWQ.text = weapon ? (weapon.name + " +" + weapon.level) : "无";
		BtnXL.text = necklace ? (necklace.name + " +" + necklace.level) : "无";
		BtnJZ.text = ring ? (ring.name + " +" + ring.level) : "无";
		BtnHF.text = amulet ? (amulet.name + " +" + amulet.level) : "无";
		BtnTK.text = helmet ? (helmet.name + " +" + helmet.level) : "无";
		BtnYF.text = clothes ? (clothes.name + " +" + clothes.level) : "无";
		BtnXZ.text = trousers ? (trousers.name + " +" + trousers.level) : "无";
		BtnXieZ.text = shoes ? (shoes.name + " +" + shoes.level) : "无";

		BtnZQ.text = mount ? (mount.name + " +" + mount.level) : "无";
		BtnAQ.text = hiddenWeeapon ? (hiddenWeeapon.name + " +" + hiddenWeeapon.level) : "无";
		BtnSZ.text = fashion ? (fashion.name + " +" + fashion.level) : "无";
		BtnFB.text = magicWeapon ? (magicWeapon.name + " +" + magicWeapon.level) : "无";

		const defaultColor = tableMgr.Color[ 1 ].Color;
		BtnWQ.titleColor = weapon?.color || defaultColor;
		BtnXL.titleColor = necklace?.color || defaultColor;
		BtnJZ.titleColor = ring?.color || defaultColor;
		BtnHF.titleColor = amulet?.color || defaultColor;
		BtnTK.titleColor = helmet?.color || defaultColor;
		BtnYF.titleColor = clothes?.color || defaultColor;
		BtnXZ.titleColor = trousers?.color || defaultColor;
		BtnXieZ.titleColor = shoes?.color || defaultColor;

		BtnZQ.titleColor = mount?.color || defaultColor;
		BtnAQ.titleColor = hiddenWeeapon?.color || defaultColor;
		BtnSZ.titleColor = fashion?.color || defaultColor;
		BtnFB.titleColor = magicWeapon?.color || defaultColor;

		// const { jinGong, muGong, shuiGong, huoGong, tuGong, jinFang, muFang, shuiFang, huoFang, tuFang, } = this.userData.attribute;
		const [ jinGong, muGong, shuiGong, huoGong, tuGong, jinFang, muFang, shuiFang, huoFang, tuFang ] = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
		TxtJingLi.text = "精力：" + Math.floor(vigor) + "/" + maxVigro;
		TxtJinAtk.text = "金攻：" + jinGong;
		TxtMuAtk.text = "木攻：" + muGong;
		TxtShuiAtk.text = "水攻：" + shuiGong;
		TxtHuoAtk.text = "火攻：" + huoGong;
		TxtTuAtk.text = "土攻：" + tuGong;
		TxtMoHe.text = "魔核：" + moHe;
		TxtMoBi.text = "魔币：" + moBi;
		TxtLingShi.text = "灵石：" + spiritStones;

		TxtJingLiHF.text = "精力恢复：" + jingLiHuiFu.toFixed(3) + "/s";
		TxtJinDef.text = "金防：" + jinFang;
		TxtMuDef.text = "木防：" + muFang;
		TxtShuiDef.text = "水防：" + shuiFang;
		TxtHuoDef.text = "火防：" + huoFang;
		TxtTuDef.text = "土防：" + tuFang;
		TxtHunPo.text = "魂魄：" + soul;
		TxtGemScore.text = "宝石积分：" + gemScore;
		TxtExp.text = "升级经验：" + MathUtil.ToGroupNumber(upgradeExp);
	}
}
