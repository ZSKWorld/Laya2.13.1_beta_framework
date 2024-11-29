import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { UISettingMsg, UISettingView } from "../view/UISettingView";

export interface UISettingData {

}

export class UISettingCtrl extends BaseViewCtrl<UISettingView, UISettingData>{

	override onOpenAni() {
		return new Promise<void>(resolve => this.view.com_panel.trans_show.play(Laya.Handler.create(null, resolve)));
	}

	override onCloseAni() {
		return new Promise<void>(resolve => this.view.com_panel.trans_show.playReverse(Laya.Handler.create(null, resolve)));
	}

}