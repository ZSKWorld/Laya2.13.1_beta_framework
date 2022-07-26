import { ResPath } from "../../../../common/ResPath";
import { MathUtil } from "../../../../libs/math/MathUtil";
import { ExtensionClass } from "../../../../libs/utils/Util";
import { tableMgr } from "../../../../table/TableManager";
import { ViewExtension } from "../../../core/interfaces";
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

export class ComRenWuView extends ExtensionClass<ViewExtension, ComRenWu>(ComRenWu) {
	static PkgRes = ResPath.Ui_PkgMain;

	onCreate(): void {
		const { BtnWQ, BtnXL, BtnJZ, BtnHF, BtnZQ, BtnAQ, BtnTK, BtnYF, BtnXZ, BtnXieZ, BtnSZ, BtnFB } = this;
		BtnWQ.onClick(this, this.sendMessage, [ComRenWuMsg.OnBtnWQClick]);
		BtnXL.onClick(this, this.sendMessage, [ComRenWuMsg.OnBtnXLClick]);
		BtnJZ.onClick(this, this.sendMessage, [ComRenWuMsg.OnBtnJZClick]);
		BtnHF.onClick(this, this.sendMessage, [ComRenWuMsg.OnBtnHFClick]);
		BtnZQ.onClick(this, this.sendMessage, [ComRenWuMsg.OnBtnZQClick]);
		BtnAQ.onClick(this, this.sendMessage, [ComRenWuMsg.OnBtnAQClick]);
		BtnTK.onClick(this, this.sendMessage, [ComRenWuMsg.OnBtnTKClick]);
		BtnYF.onClick(this, this.sendMessage, [ComRenWuMsg.OnBtnYFClick]);
		BtnXZ.onClick(this, this.sendMessage, [ComRenWuMsg.OnBtnXZClick]);
		BtnXieZ.onClick(this, this.sendMessage, [ComRenWuMsg.OnBtnXieZClick]);
		BtnSZ.onClick(this, this.sendMessage, [ComRenWuMsg.OnBtnSZClick]);
		BtnFB.onClick(this, this.sendMessage, [ComRenWuMsg.OnBtnFBClick]);
	}
	refreshEquipInfo() {
		const { wuQi, xiangLian, jieZhi, huFu, touKui, yiFu, kuZi, xieZi, zuoQi, anQi, shiZhuang, faBao, jingLi, maxJingLi, moHe, moBi,
			lingShi, jingLiHuiFu, hunPo, gemScore, upgradeExp: nextJingJieExp, } = this.userData.base;
		const { BtnWQ, BtnXL, BtnJZ, BtnHF, BtnZQ, BtnAQ, BtnTK, BtnYF, BtnXZ, BtnXieZ, BtnSZ, BtnFB, TxtJingLi, TxtJinAtk, TxtMuAtk,
			TxtShuiAtk, TxtHuoAtk, TxtTuAtk, TxtMoHe, TxtMoBi, TxtLingShi, TxtJingLiHF, TxtJinDef, TxtMuDef, TxtShuiDef, TxtHuoDef,
			TxtTuDef, TxtHunPo, TxtGemScore, TxtExp } = this;
		BtnWQ.text = wuQi ? (wuQi.name + " +" + wuQi.level) : "无";
		BtnXL.text = xiangLian ? (xiangLian.name + " +" + xiangLian.level) : "无";
		BtnJZ.text = jieZhi ? (jieZhi.name + " +" + jieZhi.level) : "无";
		BtnHF.text = huFu ? (huFu.name + " +" + huFu.level) : "无";
		BtnTK.text = touKui ? (touKui.name + " +" + touKui.level) : "无";
		BtnYF.text = yiFu ? (yiFu.name + " +" + yiFu.level) : "无";
		BtnXZ.text = kuZi ? (kuZi.name + " +" + kuZi.level) : "无";
		BtnXieZ.text = xieZi ? (xieZi.name + " +" + xieZi.level) : "无";

		BtnZQ.text = zuoQi ? (zuoQi.name + " +" + zuoQi.level) : "无";
		BtnAQ.text = anQi ? (anQi.name + " +" + anQi.level) : "无";
		BtnSZ.text = shiZhuang ? (shiZhuang.name + " +" + shiZhuang.level) : "无";
		BtnFB.text = faBao ? (faBao.name + " +" + faBao.level) : "无";

		const defaultColor = tableMgr.Color[1].Color;
		BtnWQ.titleColor = wuQi?.qualityColor || defaultColor;
		BtnXL.titleColor = xiangLian?.qualityColor || defaultColor;
		BtnJZ.titleColor = jieZhi?.qualityColor || defaultColor;
		BtnHF.titleColor = huFu?.qualityColor || defaultColor;
		BtnTK.titleColor = touKui?.qualityColor || defaultColor;
		BtnYF.titleColor = yiFu?.qualityColor || defaultColor;
		BtnXZ.titleColor = kuZi?.qualityColor || defaultColor;
		BtnXieZ.titleColor = xieZi?.qualityColor || defaultColor;

		BtnZQ.titleColor = zuoQi?.qualityColor || defaultColor;
		BtnAQ.titleColor = anQi?.qualityColor || defaultColor;
		BtnSZ.titleColor = shiZhuang?.qualityColor || defaultColor;
		BtnFB.titleColor = faBao?.qualityColor || defaultColor;

		const { jinGong, muGong, shuiGong, huoGong, tuGong, jinFang, muFang, shuiFang, huoFang, tuFang, } = this.userData.attribute;
		TxtJingLi.text = "精力：" + Math.floor(jingLi) + "/" + maxJingLi;
		TxtJinAtk.text = "金攻：" + jinGong;
		TxtMuAtk.text = "木攻：" + muGong;
		TxtShuiAtk.text = "水攻：" + shuiGong;
		TxtHuoAtk.text = "火攻：" + huoGong;
		TxtTuAtk.text = "土攻：" + tuGong;
		TxtMoHe.text = "魔核：" + moHe;
		TxtMoBi.text = "魔币：" + moBi;
		TxtLingShi.text = "灵石：" + lingShi;

		TxtJingLiHF.text = "精力恢复：" + jingLiHuiFu.toFixed(3) + "/s";
		TxtJinDef.text = "金防：" + jinFang;
		TxtMuDef.text = "木防：" + muFang;
		TxtShuiDef.text = "水防：" + shuiFang;
		TxtHuoDef.text = "火防：" + huoFang;
		TxtTuDef.text = "土防：" + tuFang;
		TxtHunPo.text = "魂魄：" + hunPo;
		TxtGemScore.text = "宝石积分：" + gemScore;
		TxtExp.text = "升级经验：" + MathUtil.ToGroupNumber(nextJingJieExp);
	}

}
