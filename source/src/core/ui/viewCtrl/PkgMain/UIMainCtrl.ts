import { MathUtil } from "../../../libs/math/MathUtil";
import { Logger } from "../../../libs/utils/Logger";
import { BaseViewCtrl } from "../../core/BaseViewCtrl";
import { RichStrMgr } from "../../tool/RichStrMgr";
import { UIUtility } from "../../tool/UIUtility";
import { UIMainMsg, UIMainView } from "../../view/PkgMain/UIMainView";

const logger = Logger.Create("UIMainCtrl", true);

export interface UIMainData {

}

export class UIMainCtrl extends BaseViewCtrl<UIMainView, UIMainData>{
	private static showOffline = false;

	/** 悬浮球拖拽中 */
	private _sphereDragged: boolean;

	override onAwake(): void {
		this.addMessageListener(UIMainMsg.OnBtnLiLianClick, this.onBtnLiLianClick);
		this.addMessageListener(UIMainMsg.OnBtnJueSeClick, this.onBtnJueSeClick);
		this.addMessageListener(UIMainMsg.OnBtnWuPinClick, this.onBtnWuPinClick);
		this.addMessageListener(UIMainMsg.OnBtnShangChengClick, this.onBtnShangChengClick);
		this.addMessageListener(UIMainMsg.OnBtnDongFuClick, this.onBtnDongFuClick);
		this.addMessageListener(UIMainMsg.OnBtnChatClick, this.onBtnChatClick);
		this.addMessageListener(UIMainMsg.OnBtnInfoClick, this.onBtnInfoClick);
		this.addMessageListener(UIMainMsg.OnBtnHeadClick, this.onBtnHeadClick);
		this.addMessageListener(UIMainMsg.OnBtnSettingClick, this.onBtnSettingClick);
		this.addMessageListener(UIMainMsg.OnBtnRankClick, this.onBtnRankClick);
		this.addMessageListener(UIMainMsg.OnBtnSphereClick, this.onBtnSphereClick);
		this.addMessageListener(UIMainMsg.OnBtnSphereDraged, this.onBtnSphereDraged);

		if (!UIMainCtrl.showOffline && this.userData.offline) {
			UIMainCtrl.showOffline = true;
			const { lastOnlineTime, offlineTime, vigor } = this.userData.offline;
			const offline = RichStrMgr.start()
				.combineBreak("欢迎回来")
				.combineBreak(`你最后一次在线时间为:${ new Date(lastOnlineTime).toLocaleString() }`)
				.combineBreak(`离线时间${ MathUtil.TimeFormatChinese(offlineTime) }`)
				.combineBreak(`获得精力${ vigor }点`, 0)
				.end();
			UIUtility.ShowConfirm(offline);
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

	private onBtnLiLianClick(): void {

	}

	private onBtnJueSeClick(): void {

	}

	private onBtnWuPinClick(): void {

	}

	private onBtnShangChengClick(): void {

	}

	private onBtnDongFuClick(): void {

	}

	private onBtnChatClick(): void {

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
		if (!!draged) this._sphereDragged = true;
		else Laya.timer.frameOnce(1, this, () => this._sphereDragged = false);
	}

}