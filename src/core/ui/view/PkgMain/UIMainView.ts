import { NotifyConst } from "../../../common/NotifyConst";
import { ResPath } from "../../../common/ResPath";
import { InsertNotify } from "../../../libs/event/EventMgr";
import { MathUtil } from "../../../libs/math/MathUtil";
import { ExtensionClass, GetJingJieString } from "../../../libs/utils/Util";
import { tableMgr } from "../../../table/TableManager";
import { ViewExtension } from "../../core/interfaces";
import { ViewID } from "../../core/ViewID";
import UIMain from "../../ui/PkgMain/UIMain";

export const enum UIMainMsg {
	OnBtnLiLianClick = "UIMain_OnBtnLiLianClick",
	OnBtnChatClick = "UIMain_OnBtnChatClick",
	OnBtnInfoClick = "UIMain_OnBtnInfoClick",
	OnBtnHeadClick = "UIMain_OnBtnHeadClick",
	OnBtnSettingClick = "UIMain_OnBtnSettingClick",
	OnBtnRankClick = "UIMain_OnBtnRankClick",
	OnBtnSphereClick = "UIMain_OnBtnSphereClick",
}

export class UIMainView extends ExtensionClass<ViewExtension, UIMain>(UIMain) {
	static PkgRes = ResPath.Ui_PkgMain;
	private _sphereDragged: boolean;

	onCreate(): void {
		const {
			listener, ComLiLian, ComJueSe, ComWuPin, ComShangCheng, ComDongFu, BtnLiLian, BtnInfo, BtnHead, BtnSetting,
			BtnRank, BtnSphere, BtnChat
		} = this;

		BtnLiLian.onClick(this, this.sendMessage, [UIMainMsg.OnBtnLiLianClick]);
		BtnChat.onClick(this, this.sendMessage, [UIMainMsg.OnBtnChatClick]);
		BtnInfo.onClick(this, this.sendMessage, [UIMainMsg.OnBtnInfoClick]);
		BtnHead.onClick(this, this.sendMessage, [UIMainMsg.OnBtnHeadClick]);
		BtnSetting.onClick(this, this.sendMessage, [UIMainMsg.OnBtnSettingClick]);
		BtnRank.onClick(this, this.sendMessage, [UIMainMsg.OnBtnRankClick]);
		BtnSphere.onClick(this, () => !this._sphereDragged && this.sendMessage(UIMainMsg.OnBtnSphereClick));

		this.initView(ViewID.ComLiLianView, ComLiLian, listener);
		this.initView(ViewID.ComJueSeView, ComJueSe, listener);
		this.initView(ViewID.ComWuPinView, ComWuPin, listener);
		this.initView(ViewID.ComShangChengView, ComShangCheng, listener);
		this.initView(ViewID.ComDongFuView, ComDongFu, listener);

		this.refreshPlayerInfo();
		BtnSphere.draggable = true;
		BtnSphere.on(fgui.Events.DRAG_START, this, this.setDraged, [true]);
		BtnSphere.on(fgui.Events.DRAG_END, this, () => Laya.timer.frameOnce(1, this, this.setDraged, [false]));
	}

	private setDraged(value: boolean) {
		this._sphereDragged = value;
	}

	@InsertNotify(NotifyConst.BaseDataChanged, true)
	private refreshPlayerInfo() {
		this.TxtNickName.text = this.userData.account.nickName;
		const { jingJie, cengJi, exp, upgradeExp: nextJingJieExp, jinBi, yuanBao, sect: menPai } = this.userData.base;
		this.TxtLevel.text = GetJingJieString(jingJie, cengJi);
		this.TxtExp.text = nextJingJieExp == 0 ? "(最高境界)" : (MathUtil.ToGroupNumber(exp) + " / " + MathUtil.ToGroupNumber(nextJingJieExp));
		this.TxtJinBi.text = "金币:" + MathUtil.ToGroupNumber(jinBi, 4);
		this.TxtYuanBao.text = "元宝:" + MathUtil.ToGroupNumber(yuanBao, 4);
		this.TxtSect.text = "门派：" + (tableMgr.Sect[menPai]?.Name || "无");
	}

}
