import { SceneType } from "../../../../../scene/SceneDefine";
import { sceneMgr } from "../../../../../scene/SceneManager";
import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { UILittleGameMsg, UILittleGameView } from "../view/UILittleGameView";

export interface UILittleGameData {

}

export class UILittleGameCtrl extends BaseViewCtrl<UILittleGameView, UILittleGameData> {

	override onAdded() {
		this.addMessage(UILittleGameMsg.OnBtnBackClick, this.onBtnBackClick);
		this.addMessage(UILittleGameMsg.OnBtn2048Click, this.onBtn2048Click);
	}

	private onBtnBackClick() {
		sceneMgr.enterScene(SceneType.MainScene);
	}

	private onBtn2048Click() {
		this.showView(ViewID.UI2048View);
		this.removeSelf();
	}
}