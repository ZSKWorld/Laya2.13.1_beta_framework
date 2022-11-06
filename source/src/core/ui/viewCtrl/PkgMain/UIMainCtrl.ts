import { GameEvent } from "../../../common/GameEvent";
import { localData } from "../../../libs/localData/LocalData";
import { LocalDataKey } from "../../../libs/localData/LocalDataKey";
import { MathUtil } from "../../../libs/math/MathUtil";
import { Logger } from "../../../libs/utils/Logger";
import { BaseViewCtrl } from "../../core/BaseViewCtrl";
import { ViewID } from "../../core/ViewID";
import { RichStrMgr } from "../../tool/RichStrMgr";
import { UIUtility } from "../../tool/UIUtility";
import { UIMainMsg, UIMainView } from "../../view/PkgMain/UIMainView";

const logger = Logger.Create("UIMainCtrl", true);

export interface UIMainData {

}

export class UIMainCtrl extends BaseViewCtrl<UIMainView, UIMainData>{
	private static showFirst = false;

	/** 悬浮球拖拽中 */
	private _sphereDragged: boolean;

	override onAwake(): void {
		this.addMessageListener(UIMainMsg.OnBtnChatClick, this.onBtnChatClick);
		this.addMessageListener(UIMainMsg.OnBtnInfoClick, this.onBtnInfoClick);
		this.addMessageListener(UIMainMsg.OnBtnHeadClick, this.onBtnHeadClick);
		this.addMessageListener(UIMainMsg.OnBtnSettingClick, this.onBtnSettingClick);
		this.addMessageListener(UIMainMsg.OnBtnRankClick, this.onBtnRankClick);
		this.addMessageListener(UIMainMsg.OnBtnSphereClick, this.onBtnSphereClick);
		this.addMessageListener(UIMainMsg.OnBtnSphereDraged, this.onBtnSphereDraged);

		if (!UIMainCtrl.showFirst) {
			UIMainCtrl.showFirst = true;
			const { lastOnlineTime, offline } = this.userData;
			const txt = RichStrMgr.start()
				.combineBreak("正在构建游戏世界")
				.combineBreak("正在计算离线收益")
				.combineBreak("初始化完毕");
			const offlineConfirmTxt = RichStrMgr.start()
				.combineBreak("欢迎回来")
				.combineBreak(`你最后一次在线时间为:${ new Date(lastOnlineTime).toLocaleString() }`);
			if (offline) {
				offlineConfirmTxt.combineBreak(`离线时长${ MathUtil.TimeFormatChinese(offline.offlineTime) }`)
					.combineBreak(`获得精力${ offline.vigor }点`);
				UIUtility.showConfirm(offlineConfirmTxt.getStr());
			}
			txt.combineBreak(offlineConfirmTxt.end());
			const battleSpeed = localData.get(LocalDataKey.BattleSpeed) || 1;
			localData.set(LocalDataKey.BattleSpeed, battleSpeed);
			txt.combineBreak(RichStrMgr.start("放置游戏，资源全开放，所有道具货币都可获取").size(60).color("#FFFFFF").end())
				.combineBreak(RichStrMgr.start("熬死大佬，你就是大佬!").size(60).color("#FF842E").end())
				.combineBreak(`战斗速度调整为${ battleSpeed }倍速`, 0);
			this.dispatch(GameEvent.AddExperienceLog, txt.end());
		}
	}

	override onEnable(): void {
		this._sphereDragged = false;
		this.view.refreshPlayerInfo();
	}

	override onDisable(): void {

	}

	override onDestroy(): void {

	}

	private onBtnChatClick(): void {
		this.addView(ViewID.ChatView);
	}

	private onBtnInfoClick(): void {

	}

	private onBtnHeadClick(): void {

	}

	private onBtnSettingClick(): void {

	}

	private onBtnRankClick(): void {

	}

	private onBtnSphereClick(): void {
		if (this._sphereDragged) return;
	}

	private onBtnSphereDraged(draged: boolean) {
		if (!!draged) this.setSphereDraged(true);
		else Laya.timer.frameOnce(1, this, this.setSphereDraged, [ false ]);
	}

	private setSphereDraged(value: boolean) {
		this._sphereDragged = value;
	}

}