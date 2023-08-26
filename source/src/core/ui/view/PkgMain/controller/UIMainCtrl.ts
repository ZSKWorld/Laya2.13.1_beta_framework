import { GameEvent } from "../../../../common/GameEvent";
import { localData } from "../../../../libs/localData/LocalData";
import { LocalDataKey } from "../../../../libs/localData/LocalDataKey";
import { MathUtil } from "../../../../libs/math/MathUtil";
import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { richStrMgr } from "../../../tool/RichStrManager";
import { UIUtility } from "../../../tool/UIUtility";
import { UIMainMsg, UIMainView } from "../view/UIMainView";

export interface UIMainData {

}

export class UIMainCtrl extends BaseViewCtrl<UIMainView, UIMainData>{

    override onAdded() {
		this.addMessage(UIMainMsg.OnBtnTrainClick, this.onBtnTrainClick);
		this.addMessage(UIMainMsg.OnBtnCharClick, this.onBtnCharClick);
		this.addMessage(UIMainMsg.OnBtnGoodsClick, this.onBtnGoodsClick);
		this.addMessage(UIMainMsg.OnBtnShopClick, this.onBtnShopClick);
		this.addMessage(UIMainMsg.OnBtnAbodeClick, this.onBtnAbodeClick);
		this.addMessage(UIMainMsg.OnBtnChatClick, this.onBtnChatClick);
		this.addMessage(UIMainMsg.OnBtnSettingClick, this.onBtnSettingClick);
		this.addMessage(UIMainMsg.OnBtnRankClick, this.onBtnRankClick);
		this.addMessage(UIMainMsg.OnBtnSphereClick, this.onBtnSphereClick);

		const { offline, account } = userData;
		const txt = richStrMgr.start()
			.combineBreak("正在构建游戏世界")
			.combineBreak("正在计算离线收益")
			.combineBreak("初始化完毕");
		const offlineConfirmTxt = richStrMgr.start()
			.combineBreak("欢迎回来")
			.combineBreak(`你最后一次在线时间为:${ new Date(account.lastOnlineTime).toLocaleString() }`);
		if (offline) {
			offlineConfirmTxt.combineBreak(`离线时长${ MathUtil.TimeFormatChinese(offline.offlineTime) }`)
				.combineBreak(`获得精力${ offline.vigor }点`);
			Laya.timer.callLater(null, showConfirm, [ "离线详情", offlineConfirmTxt.getStr() ]);
		}
		txt.combineBreak(offlineConfirmTxt.end());
		const battleSpeed = localData.get(LocalDataKey.BattleSpeed) || 1;
		localData.set(LocalDataKey.BattleSpeed, battleSpeed);
		txt.combineBreak(richStrMgr.start("放置游戏，资源全开放，所有道具货币都可获取").size(60).color("#FFFFFF").end())
			.combineBreak(richStrMgr.start("熬死大佬，你就是大佬!").size(60).color("#FF842E").end())
			.combineBreak(`战斗速度调整为${ battleSpeed }倍速`, 0);
		this.dispatch(GameEvent.AddExperienceLog, txt.end());
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

	private onBtnChatClick() {

	}

	private onBtnSettingClick() {

	}

	private onBtnRankClick() {

	}

	private onBtnSphereClick() {

	}

}