import { SceneType } from "../../../../../scene/SceneDefine";
import { sceneMgr } from "../../../../../scene/SceneManager";
import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { ViewID } from "../../../core/ViewID";
import { UILittleGameMsg, UILittleGameView } from "../view/UILittleGameView";

export interface UILittleGameData {

}

export class UILittleGameCtrl extends BaseViewCtrl<UILittleGameView, UILittleGameData> {

	override onAdded() {
		this.addMessage(UILittleGameMsg.OnBtnBackClick, this.onBtnBackClick);
		this.addMessage(UILittleGameMsg.OnBtnTenWaterClick, this.onBtnTenWaterClick);
		this.addMessage(UILittleGameMsg.OnBtnTest3DClick, this.onBtnTest3DClick);
	}

	private onBtnBackClick() {
		sceneMgr.enterScene(SceneType.MainScene);
	}

	private onBtnTenWaterClick() {
		this.showView(ViewID.UITenWaterView);
		this.removeSelf();
	}

	private onBtnTest3DClick() {
		this.showView(ViewID.UITest3DView);
		this.removeSelf();
	}

}