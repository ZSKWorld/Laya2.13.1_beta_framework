import { GameEvent } from "../../../../common/GameEvent";
import { InsertNotify } from "../../../../libs/event/EventMgr";
import { localData } from "../../../../libs/localData/LocalData";
import { LocalDataKey } from "../../../../libs/localData/LocalDataKey";
import { MathUtil } from "../../../../libs/math/MathUtil";
import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { RichStrMgr } from "../../../tool/RichStrMgr";
import { UIUtility } from "../../../tool/UIUtility";
import { ComLiLianMsg, ComLiLianView } from "../../../view/PkgMain/Coms/ComLiLianView";
import { RenderTextView } from "../../../view/PkgMain/Renders/RenderTextView";

export interface ComLiLianData {

}

export class ComLiLianCtrl extends BaseViewCtrl<ComLiLianView, ComLiLianData>{
	private static firstShow = false;
	private logs: string[] = [];

	override onAwake(): void {
		this.addMessageListener(ComLiLianMsg.OnBtnGuanQiaClick, this.onBtnGuanQiaClick);
		this.addMessageListener(ComLiLianMsg.OnBtnFuBenClick, this.onBtnFuBenClick);
		this.addMessageListener(ComLiLianMsg.OnBtnMiJingClick, this.onBtnMiJingClick);
		this.addMessageListener(ComLiLianMsg.OnBtnBossClick, this.onBtnBossClick);
		this.addMessageListener(ComLiLianMsg.OnBtnCaiJiClick, this.onBtnCaiJiClick);
		this.addMessageListener(ComLiLianMsg.OnBtnGongLueClick, this.onBtnGongLueClick);
		this.addMessageListener(ComLiLianMsg.OnBtnWaiYuClick, this.onBtnWaiYuClick);

		if (!ComLiLianCtrl.firstShow) {
			ComLiLianCtrl.firstShow = true;
			const { lastOnlineTime, offline } = this.userData;
			const txt = RichStrMgr.start("")
				.combineBreak("正在构建游戏世界")
				.combineBreak("正在计算离线收益")
				.combineBreak("初始化完毕")
				.combineBreak("欢迎回来")
				.combineBreak(`你最后一次在线时间为:${ new Date(lastOnlineTime).toLocaleString() }`);
			if (offline) {
				txt.combineBreak(`离线时长${ MathUtil.TimeFormatChinese(offline.offlineTime) }`)
					.combineBreak(`获得精力${ offline.vigor }点`);
			}

			const battleSpeed = localData.get(LocalDataKey.BattleSpeed) || 1;
			localData.set(LocalDataKey.BattleSpeed, battleSpeed);

			txt.combineBreak(RichStrMgr.start("放置游戏，资源全开放，所有道具货币都可获取").size(60).color("#FFFFFF").end())
				.combineBreak(RichStrMgr.start("熬死大佬，你就是大佬!").size(60).color("#FF842E").end())
				.combineBreak(`战斗速度调整为${ battleSpeed }倍速`, 0);
			this.addExperienceLog(txt.end());
		}
	}

	override onEnable(): void {

	}

	override onDisable(): void {

	}

	override onDestroy(): void {

	}

	@InsertNotify(GameEvent.AddExperienceLog)
	private addExperienceLog(log: string | string[]) {
		if (Array.isArray(log)) this.logs.push(...log);
		else this.logs.push(log);
		Laya.timer.callLater(this, this.refreshLogList);
	}

	@InsertNotify(GameEvent.ClearExperienceLog)
	private clearExperienceLog() {
		this.logs.length = 0;
		Laya.timer.callLater(this, this.refreshLogList);
	}

	private refreshLogList() {
		UIUtility.SetList(this.view.ListLog, this.logs.length, this, this.logRenderer);
		this.view.ListLog.scrollToView(this.logs.length - 1);
	}

	private logRenderer(index: number, item: RenderTextView) {
		item.setText(this.logs[ index ]);
	}

	private onBtnGuanQiaClick(): void {

	}

	private onBtnFuBenClick(): void {

	}

	private onBtnMiJingClick(): void {

	}

	private onBtnBossClick(): void {

	}

	private onBtnCaiJiClick(): void {

	}

	private onBtnGongLueClick(): void {

	}

	private onBtnWaiYuClick(): void {

	}

}