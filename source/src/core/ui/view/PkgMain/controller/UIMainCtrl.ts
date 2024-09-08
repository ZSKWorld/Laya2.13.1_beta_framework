import { TimeUtil } from "../../../../common/TimeUtil";
import { localData } from "../../../../game/localData/LocalData";
import { LocalDataKey } from "../../../../game/localData/LocalDataKey";
import { MathUtil } from "../../../../game/math/MathUtil";
import { trainLogMgr } from "../../../../game/TrainLogManager";
import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { richStrMgr } from "../../../tool/RichStrManager";
import { UIMainMsg, UIMainView } from "../view/UIMainView";

export interface UIMainData {

}

export class UIMainCtrl extends BaseViewCtrl<UIMainView, UIMainData> {
	/** 悬浮球拖拽中 */
	private _sphereDragged: boolean;

	override onAdded() {
		this.addMessage(UIMainMsg.OnBtnTrainClick, this.onBtnTrainClick);
		this.addMessage(UIMainMsg.OnBtnCharClick, this.onBtnCharClick);
		this.addMessage(UIMainMsg.OnBtnGoodsClick, this.onBtnGoodsClick);
		this.addMessage(UIMainMsg.OnBtnShopClick, this.onBtnShopClick);
		this.addMessage(UIMainMsg.OnBtnAbodeClick, this.onBtnAbodeClick);
		this.addMessage(UIMainMsg.OnBtnChatClick, this.showView, [ViewID.UIChatView]);
		this.addMessage(UIMainMsg.OnBtnSettingClick, this.showView, [ViewID.UISettingView]);
		this.addMessage(UIMainMsg.OnBtnRankClick, this.onBtnRankClick);
		this.addMessage(UIMainMsg.OnBtnSphereClick, this.onBtnSphereClick);
		this.addMessage(UIMainMsg.OnBtnSphereDraged, this.onBtnSphereDraged);

		const { offline, account } = userData;
		const txt = richStrMgr.start()
			.combineBreak("正在构建游戏世界")
			.combineBreak("正在计算离线收益")
			.combineBreak("初始化完毕");

		const offlineConfirmTxt = richStrMgr.start()
			.combineBreak("欢迎回来")
			.combineBreak(`你最后一次在线时间为:${ TimeUtil.milliSecond2YMDHMS(account.lastOnlineTime) }`);
		if (offline) {
			offlineConfirmTxt.combineBreak(`离线时长${ MathUtil.TimeFormatChinese(offline.offlineTime) }`)
				.combineBreak(`获得精力${ offline.vigor }点`);
			Laya.timer.callLater(null, ShowConfirm, ["离线详情", offlineConfirmTxt.getStr(), false]);
		}
		txt.combineBreak(offlineConfirmTxt.end());
		const battleSpeed = localData.get(LocalDataKey.BattleSpeed) || 1;
		localData.set(LocalDataKey.BattleSpeed, battleSpeed);
		txt.combineBreak(richStrMgr.start("放置游戏，资源全开放，所有道具货币都可获取").size(60).color("#FFFFFF").end())
			.combineBreak(richStrMgr.start("熬死大佬，你就是大佬!").size(60).color("#FF842E").end())
			.combineBreak(`战斗速度调整为${ battleSpeed }倍速`, 0);
		trainLogMgr.addLog(txt.end());
	}

	override onEnable() {
		this.setSphereDraged(false);
		this.view.refreshPlayerInfo();
	}

	private onBtnTrainClick() {

	}

	private onBtnCharClick() {

	}

	private onBtnGoodsClick() {

	}

	private onBtnShopClick() {

	}

	private onBtnAbodeClick() {

	}

	private onBtnRankClick() {

	}

	private onBtnSphereClick() {
		if (this._sphereDragged) return;
		this.showView(ViewID.UISphereToolView);
	}

	private onBtnSphereDraged(draged: boolean) {
		if (!!draged) this.setSphereDraged(true);
		else Laya.timer.frameOnce(1, this, this.setSphereDraged, [false]);
	}

	private setSphereDraged(value: boolean) {
		this._sphereDragged = value;
	}

}