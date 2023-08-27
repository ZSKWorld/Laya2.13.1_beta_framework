import { logicSceneMgr } from "../../../../../../logicScene/LogicSceneManager";
import { LogicScene } from "../../../../../../logicScene/LogicSceneType";
import { GameEvent } from "../../../../../common/GameEvent";
import { trainLogMgr } from "../../../../../game/TrainLogManager";
import { BattleType } from "../../../../../net/enum/BattleEnums";
import { BaseViewCtrl } from "../../../../core/BaseViewCtrl";
import { UIUtility } from "../../../../tool/UIUtility";
import { ComTrainMsg, ComTrainView } from "../../view/coms/ComTrainView";
import { RenderTextView } from "../../view/renders/RenderTextView";

export interface ComTrainData {

}

export class ComTrainCtrl extends BaseViewCtrl<ComTrainView, ComTrainData>{

	override onAdded() {
		this.addMessage(ComTrainMsg.OnBtnLevelClick, this.enterBattle, [ BattleType.GuanQia ]);
		this.addMessage(ComTrainMsg.OnBtnFuBenClick, this.enterBattle, [ BattleType.FuBen ]);
		this.addMessage(ComTrainMsg.OnBtnMiJingClick, this.enterBattle, [ BattleType.MiJing ]);
		this.addMessage(ComTrainMsg.OnBtnBossClick, this.enterBattle, [ BattleType.Boss ]);
		this.addMessage(ComTrainMsg.OnBtnCaiJiClick, this.enterBattle, [ BattleType.CaiJi ]);
		this.addMessage(ComTrainMsg.OnBtnGongLueClick, this.onBtnGongLueClick);
		this.addMessage(ComTrainMsg.OnBtnWaiYuClick, this.onBtnWaiYuClick);

		UIUtility.SetList(this.view.list_log, true, this, this.onListLogRenderer);
	}

	override onEnable(): void {
		trainLogMgr.randomLog();
	}

	@RegisterEvent(GameEvent.RefreshExperienceLog)
	private refreshLogList() {
		const logs = trainLogMgr.logs;
		this.view.list_log.numItems = logs.length;
		this.view.list_log.scrollToView(logs.length - 1);
	}

	private onListLogRenderer(index: number, item: RenderTextView) {
		item.setText(trainLogMgr.logs[ index ]);
	}

	private enterBattle(battleType: BattleType): void {
		logicSceneMgr.enterScene(LogicScene.GameScene, { battleType });
	}

	private onBtnGongLueClick(): void {

	}

	private onBtnWaiYuClick(): void {

	}

}