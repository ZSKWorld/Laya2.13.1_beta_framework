import { SceneType } from "../../../../../scene/SceneDefine";
import { sceneMgr } from "../../../../../scene/SceneManager";
import { GameEvent } from "../../../../common/GameEvent";
import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { UISphereToolMsg, UISphereToolView } from "../view/UISphereToolView";

export interface UISphereToolData {

}

export class UISphereToolCtrl extends BaseViewCtrl<UISphereToolView, UISphereToolData> {

	override onAdded() {
		this.addMessage(UISphereToolMsg.OnBtnClearLogClick, this.onBtnClearLogClick);
		this.addMessage(UISphereToolMsg.OnBtnRecoverVigorClick, this.onBtnRecoverVigorClick);
		this.addMessage(UISphereToolMsg.OnBtnLittleGameClick, this.onBtnLittleGameClick);

		this.addMessage(UISphereToolMsg.OnBtnCreateClick, this.onBtnCreateClick);
		this.addMessage(UISphereToolMsg.OnBtnClearClick, this.onBtnClearClick);
		this.addMessage(UISphereToolMsg.OnBtnPercentClick, this.onBtnPercentClick);
		this.addMessage(UISphereToolMsg.OnBtnCheck1Click, this.onBtnCheck1Click);
		this.addMessage(UISphereToolMsg.OnBtnCheck2Click, this.onBtnCheck2Click);
		this.addMessage(UISphereToolMsg.OnBtnCheck3Click, this.onBtnCheck3Click);
		this.addMessage(UISphereToolMsg.OnBtnCheck4Click, this.onBtnCheck4Click);
		this.addMessage(UISphereToolMsg.OnBtnCheck5Click, this.onBtnCheck5Click);
		this.addMessage(UISphereToolMsg.OnBtnCheck6Click, this.onBtnCheck6Click);
		this.addMessage(UISphereToolMsg.OnBtnCheck7Click, this.onBtnCheck7Click);
		this.addMessage(UISphereToolMsg.OnBtnCheck8Click, this.onBtnCheck8Click);
		this.addMessage(UISphereToolMsg.OnBtnCheck9Click, this.onBtnCheck9Click);
		this.addMessage(UISphereToolMsg.OnBtnCheck10Click, this.onBtnCheck10Click);
		this.addMessage(UISphereToolMsg.OnBtnCheck11Click, this.onBtnCheck11Click);
		this.addMessage(UISphereToolMsg.OnBtnCheck12Click, this.onBtnCheck12Click);
		this.addMessage(UISphereToolMsg.OnBtnCheck13Click, this.onBtnCheck13Click);
		this.addMessage(UISphereToolMsg.OnBtnCheck14Click, this.onBtnCheck14Click);
		this.addMessage(UISphereToolMsg.OnBtnCheck15Click, this.onBtnCheck15Click);
		this.addMessage(UISphereToolMsg.OnBtnCheck16Click, this.onBtnCheck16Click);
		this.addMessage(UISphereToolMsg.OnBtnCheck17Click, this.onBtnCheck17Click);
		this.addMessage(UISphereToolMsg.OnBtnCheck18Click, this.onBtnCheck18Click);
		this.addMessage(UISphereToolMsg.OnBtnCheck19Click, this.onBtnCheck19Click);
		this.addMessage(UISphereToolMsg.OnBtnCheck20Click, this.onBtnCheck20Click);
		this.addMessage(UISphereToolMsg.OnBtnCheck21Click, this.onBtnCheck21Click);
		this.addMessage(UISphereToolMsg.OnBtnCheck22Click, this.onBtnCheck22Click);
		this.addMessage(UISphereToolMsg.OnBtnCheck23Click, this.onBtnCheck23Click);
		this.addMessage(UISphereToolMsg.OnBtnCheck24Click, this.onBtnCheck24Click);
		this.addMessage(UISphereToolMsg.OnBtnCheck25Click, this.onBtnCheck25Click);
		this.addMessage(UISphereToolMsg.OnBtnCheck26Click, this.onBtnCheck26Click);
		this.addMessage(UISphereToolMsg.OnBtnCheck27Click, this.onBtnCheck27Click);
		this.addMessage(UISphereToolMsg.OnBtnCheck28Click, this.onBtnCheck28Click);
		this.addMessage(UISphereToolMsg.OnBtnCheck0Click, this.onBtnCheck0Click);
		this.addMessage(UISphereToolMsg.OnBtnCheck31Click, this.onBtnCheck31Click);
		this.addMessage(UISphereToolMsg.OnBtnCheck32Click, this.onBtnCheck32Click);
		this.addMessage(UISphereToolMsg.OnBtnAddClick, this.onBtnAddClick);
		this.addMessage(UISphereToolMsg.OnBtnSubmitClick, this.onBtnSubmitClick);
		this.addMessage(UISphereToolMsg.OnBtnRemoveClick, this.onBtnRemoveClick);
		this.addMessage(UISphereToolMsg.OnBtnRemoveAllClick, this.onBtnRemoveAllClick);
	}

	private onBtnClearLogClick() {
		this.dispatch(GameEvent.ClearExperienceLog);
	}

	private onBtnRecoverVigorClick() {

	}

	private onBtnLittleGameClick() {
		sceneMgr.enterScene(SceneType.LittleGameScene);
	}

	private onBtnCreateClick() {

	}

	private onBtnClearClick() {

	}

	private onBtnPercentClick() {

	}

	private onBtnCheck1Click() {

	}

	private onBtnCheck2Click() {

	}

	private onBtnCheck3Click() {

	}

	private onBtnCheck4Click() {

	}

	private onBtnCheck5Click() {

	}

	private onBtnCheck6Click() {

	}

	private onBtnCheck7Click() {

	}

	private onBtnCheck8Click() {

	}

	private onBtnCheck9Click() {

	}

	private onBtnCheck10Click() {

	}

	private onBtnCheck11Click() {

	}

	private onBtnCheck12Click() {

	}

	private onBtnCheck13Click() {

	}

	private onBtnCheck14Click() {

	}

	private onBtnCheck15Click() {

	}

	private onBtnCheck16Click() {

	}

	private onBtnCheck17Click() {

	}

	private onBtnCheck18Click() {

	}

	private onBtnCheck19Click() {

	}

	private onBtnCheck20Click() {

	}

	private onBtnCheck21Click() {

	}

	private onBtnCheck22Click() {

	}

	private onBtnCheck23Click() {

	}

	private onBtnCheck24Click() {

	}

	private onBtnCheck25Click() {

	}

	private onBtnCheck26Click() {

	}

	private onBtnCheck27Click() {

	}

	private onBtnCheck28Click() {

	}

	private onBtnCheck0Click() {

	}

	private onBtnCheck31Click() {

	}

	private onBtnCheck32Click() {

	}

	private onBtnAddClick() {

	}

	private onBtnSubmitClick() {

	}

	private onBtnRemoveClick() {

	}

	private onBtnRemoveAllClick() {

	}

}