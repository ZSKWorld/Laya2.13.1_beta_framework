import { NotifyConst } from "../../../common/NotifyConst";
import { ResPath } from "../../../common/ResPath";
import { InsertNotify } from "../../../libs/event/EventMgr";
import { MathUtil } from "../../../libs/math/MathUtil";
import { ExtensionClass, GetJingJieString } from "../../../libs/utils/Util";
import { tableMgr } from "../../../table/TableManager";
import { ViewExtension } from "../../core/interfaces";
import UIPlayerInfo from "../../ui/PkgMain/UIPlayerInfo";

export const enum UIPlayerInfoMsg {
	OnBtnExplainClick = "UIPlayerInfo_OnBtnExplainClick",
	OnBtnCopyIDClick = "UIPlayerInfo_OnBtnCopyIDClick",
	OnBtnGiftClick = "UIPlayerInfo_OnBtnGiftClick",
}

export class UIPlayerInfoView extends ExtensionClass<ViewExtension, UIPlayerInfo>(UIPlayerInfo) {
	static PkgRes = ResPath.Ui_PkgMain;

	onCreate(): void {
		const { BtnExplain, BtnBack, BtnCopyID, BtnGift } = this;
		BtnExplain.onClick(this, this.sendMessage, [UIPlayerInfoMsg.OnBtnExplainClick]);
		BtnBack.onClick(this, this.removeTop);
		BtnCopyID.onClick(this, this.sendMessage, [UIPlayerInfoMsg.OnBtnCopyIDClick]);
		BtnGift.onClick(this, this.sendMessage, [UIPlayerInfoMsg.OnBtnGiftClick]);
		this.refreshInfo();
	}

	@InsertNotify(NotifyConst.BaseDataChanged)
	private refreshInfo() {
		const { TxtInfo1, TxtInfo2 } = this;
		const { attribute, base, account } = this.userData;
		TxtInfo1.text = `
			昵称：${account.nickName}<br>
			境界：${GetJingJieString(base.jingJie, base.cengJi)}<br>
			战力：${attribute.zhanLi}<br>
			攻击：${MathUtil.ToGroupNumber(attribute.gongJi)}<br>
			防御：${attribute.fangYu}<br>
			生命：${MathUtil.ToGroupNumber(attribute.shengMing)}<br>
			力量：${attribute.liLiang}<br>
			体力：${attribute.tiLi}<br>
			所有属性：${attribute.suoYouShuXing}<br>
			最终伤害：${attribute.zuiZhongShangHai}<br>
			暴伤：${attribute.baoShang}<br>
			精力：${Math.floor(base.jingLi) + "/" + base.maxJingLi}<br>
			金攻：${attribute.jinGong}<br>
			木攻：${attribute.muGong}<br>
			水攻：${attribute.shuiGong}<br>
			火攻：${attribute.huoGong}<br>
			土攻：${attribute.tuGong}<br>
			魔核：${base.moHe}<br>
			魔币：${base.moBi}<br>
			灵石：${base.lingShi}<br>
			减五行攻防：${attribute.jianWuXingGongFang}<br>
			增加暴击：${attribute.zengJiaBaoJi}<br>
			增加命中：${attribute.zengJiaMingZhong}`;

		TxtInfo2.text = `
			称号：<br>
			帮会：无<br>
			命中：${attribute.mingZhong}<br>
			闪避：${attribute.shanBi}<br>
			暴击：${attribute.baoJi}<br>
			暴抗：${attribute.baoKang}<br>
			身法：${attribute.shenFa}<br>
			耐力：${attribute.naiLi}<br>
			门派：${(tableMgr.Sect[base.sect]?.Name || "无")}<br>
			减免伤害：${attribute.jianMianShangHai}<br>
			吸收：${attribute.xiShou}<br>
			精力恢复：${base.jingLiHuiFu.toFixed(3) + "/s"}<br>
			金防：${attribute.jinFang}<br>
			木防：${attribute.muFang}<br>
			水防：${attribute.shuiFang}<br>
			火防：${attribute.huoFang}<br>
			土防：${attribute.tuFang}<br>
			魂魄：${base.hunPo}<br>
			宝石积分：${base.gemScore}<br>
			升级经验：${MathUtil.ToGroupNumber(base.upgradeExp)}<br>
			经验上限：${attribute.jingYanShangXian}<br>
			元宝：${MathUtil.ToGroupNumber(base.yuanBao, 4)}`;
		// TxtChengHao.text;
		// TxtBangHui.text;
	}

}
