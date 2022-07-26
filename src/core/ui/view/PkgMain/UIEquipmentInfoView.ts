import { ResPath } from "../../../common/ResPath";
import { MathUtil } from "../../../libs/math/MathUtil";
import { ExtensionClass, GetAttributeName, GetColorStr, GetJingJieString } from "../../../libs/utils/Util";
import { EquipmentItem } from "../../../playerData/BagData";
import { tableMgr } from "../../../table/TableManager";
import { ViewExtension } from "../../core/interfaces";
import UIEquipmentInfo from "../../ui/PkgMain/UIEquipmentInfo";

export const enum UIEquipmentInfoMsg {
	OnBtnSellClick = "UIEquipmentInfo_OnBtnSellClick",
	OnBtnDressClick = "UIEquipmentInfo_OnBtnDressClick",
	OnBtnQiangHuaClick = "UIEquipmentInfo_OnBtnQiangHuaClick",
	OnBtnXiangQianClick = "UIEquipmentInfo_OnBtnXiangQianClick",
	OnBtnMingKeClick = "UIEquipmentInfo_OnBtnMingKeClick",
	OnBtnShenYouClick = "UIEquipmentInfo_OnBtnShenYouClick",
}

export class UIEquipmentInfoView extends ExtensionClass<ViewExtension, UIEquipmentInfo>(UIEquipmentInfo) {
	static PkgRes = ResPath.Ui_PkgMain;

	onCreate(): void {
		const { BtnBg, BtnSell, BtnDress, BtnQiangHua, BtnXiangQian, BtnMingKe, BtnShenYou } = this;
		BtnBg.onClick(this, this.removeTop);
		BtnSell.onClick(this, this.sendMessage, [UIEquipmentInfoMsg.OnBtnSellClick]);
		BtnDress.onClick(this, this.sendMessage, [UIEquipmentInfoMsg.OnBtnDressClick]);
		BtnQiangHua.onClick(this, this.sendMessage, [UIEquipmentInfoMsg.OnBtnQiangHuaClick]);
		BtnXiangQian.onClick(this, this.sendMessage, [UIEquipmentInfoMsg.OnBtnXiangQianClick]);
		BtnMingKe.onClick(this, this.sendMessage, [UIEquipmentInfoMsg.OnBtnMingKeClick]);
		BtnShenYou.onClick(this, this.sendMessage, [UIEquipmentInfoMsg.OnBtnShenYouClick]);
	}

	private getEquipStartStr(star: number) {
		const maxStar = +tableMgr.Const[1010].Value;
		star = MathUtil.Clamp(star, 0, maxStar);
		let result = "";
		for (let i = 1; i <= maxStar; i++) {
			result += (star >= i ? "✭" : "✩");
		}
		return result;
	}

	private getEquipInfoStr(equip: EquipmentItem, hasGem: boolean) {
		let str = "";
		if (equip) {
			const typeStr = [
				"", "武器[攻击]", "头盔[防御]", "项链[特殊]", "衣服[防御]", "戒指[攻击]", "裤子[防御]", "护符[攻击]", "鞋子[防御]",
				"坐骑[特殊]", "时装[特殊]", "暗器[特殊]", "法宝[特殊]",
			];
			const dressed = this.userData.base.getEquipmentByType(equip.part) == equip;
			const gems = hasGem ? this.userData.base.getEquipGemByType(equip.part) : null;
			str = `
			${GetColorStr(equip.quality, equip.name + " +" + equip.level)}${dressed ? "&nbsp;(已装备)" : ""}<br>
			${this.getEquipStartStr(equip.star)}<br>
			类别:${typeStr[equip.part]}<br>
			境界需求:${GetJingJieString(equip.useRequire.jingJie, equip.useRequire.cengJi)}<br>
			铭刻:0/100<br>
			${equip.shenYou}阶神佑加成: ${(equip.shenYouAddition * 100).toFixed(2)}%<br>
			${equip.mainAttri.map(v => GetColorStr(equip.quality, GetAttributeName(v)) + "<br>").join("")}
			${equip.wuXingAttri.map(v => GetColorStr(4, GetAttributeName(v)) + "<br>").join("")}
			${equip.secondAttri.map(v => GetColorStr(5, GetAttributeName(v)) + "<br>").join("")}
			${equip.bodyAttri.map(v => GetColorStr(8, GetAttributeName(v)) + "<br>").join("")}
			`+ (!gems ? "" : `
			孔1:${gems[0] ? GetColorStr(tableMgr.Item[gems[0]].Quality, tableMgr.Item[gems[0]].Name) : "空"}<br>
			孔2:${gems[1] ? GetColorStr(tableMgr.Item[gems[1]].Quality, tableMgr.Item[gems[1]].Name) : "空"}<br>
			孔3:${gems[2] ? GetColorStr(tableMgr.Item[gems[2]].Quality, tableMgr.Item[gems[2]].Name) : "空"}<br>
			孔4:${gems[3] ? GetColorStr(tableMgr.Item[gems[3]].Quality, tableMgr.Item[gems[3]].Name) : "空"}<br>
			`) + `
			评分:2.5万
			`;
		}
		return str;
	}

	refreshEquipInfo(equip1: EquipmentItem, equip2: EquipmentItem, hasGem: boolean) {
		this.TxtEquipInfo1.text = this.getEquipInfoStr(equip1, hasGem);
		this.TxtEquipInfo2.text = this.getEquipInfoStr(equip2, false);
	}


	setOpenType(type: number) {
		this.ctrlType.selectedIndex = type;
	}

}
