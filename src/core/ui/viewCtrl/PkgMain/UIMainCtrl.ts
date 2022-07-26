import { NotifyConst } from "../../../common/NotifyConst";
import { ViewID } from "../../core/ViewID";
import { MathUtil } from "../../../libs/math/MathUtil";
import { BaseViewCtrl } from "../../core/BaseViewCtrl";
import { UIMainMsg, UIMainView } from "../../view/PkgMain/UIMainView";

export interface UIMainData {

}

export class UIMainCtrl extends BaseViewCtrl<UIMainView, UIMainData>{
	private logs = [
		"[color=#FF0000]欢迎回来~[/color]",
		"[color=#FF0000]签到送V零充满V不是梦[/color]",
		"[color=#FF0000]★帮会跑商★宝石合成★[/color]",
		"[color=#FF0000]★套装打造★神装兑换★[/color]",
		"[color=#FF0000]★手工装备★时装坐骑★[/color]",
		"[color=#FF0000]★法宝暗器★良心放置★[/color]",
		"[color=#FF0000]副本通关三次无条件扫荡[/color]",
		"[color=#FF0000]我们的口号是：[/color]<br>[color=#FF0000]上线10分钟，挂机24小时[/color]",
		"[color=#FF0000]一时修仙一爽，一直修仙一直爽[/color]",
	]

	onAwake(): void {
		super.onAwake();
		this.addMessageListener(UIMainMsg.OnBtnLiLianClick, this.UIMain_OnBtnLiLianClick);
		this.addMessageListener(UIMainMsg.OnBtnInfoClick, this.showView, [ViewID.PlayerInfoView]);
		this.addMessageListener(UIMainMsg.OnBtnSettingClick, this.showView, [ViewID.SettingView]);
		this.addMessageListener(UIMainMsg.OnBtnSphereClick, this.showView, [ViewID.SphereToolView, null, null, false]);
		this.addMessageListener(UIMainMsg.OnBtnHeadClick, this.UIMain_OnBtnHeadClick);
		this.addMessageListener(UIMainMsg.OnBtnRankClick, this.UIMain_OnBtnRankClick);
	}

	onEnable(): void {
		super.onEnable();
	}

	private showView(id: ViewID, data: any, callback: any, hideTop: boolean) {
		this.addView(id, data, callback, hideTop);
	}

	private UIMain_OnBtnLiLianClick(): void {
		Laya.timer.once(200, this, this.dispatch,
			[NotifyConst.AddMainLog, this.logs[MathUtil.RandomInt(0, this.logs.length - 1)]], false
		);
	}

	private UIMain_OnBtnHeadClick(): void {

	}

	private UIMain_OnBtnRankClick() {
	}

	onDisable(): void {
		super.onDisable();
	}

	onDestroy(): void {
		super.onDestroy();
	}
}