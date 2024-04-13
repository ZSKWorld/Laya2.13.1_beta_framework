import { SceneType } from "../../../../../../scene/SceneDefine";
import { sceneMgr } from "../../../../../../scene/SceneManager";
import { GameEvent } from "../../../../../common/GameEvent";
import { trainLogMgr } from "../../../../../game/TrainLogManager";
import { BattleType } from "../../../../../net/enum/BattleEnums";
import { BaseViewCtrl } from "../../../../core/BaseViewCtrl";
import { UIUtil } from "../../../../tool/UIUtil";
import { ComTrainMsg, ComTrainView } from "../../view/coms/ComTrainView";
import { RenderTextView } from "../../view/renders/RenderTextView";

export interface ComTrainData {

}

export class ComTrainCtrl extends BaseViewCtrl<ComTrainView, ComTrainData> {

	override onAdded() {
		this.addMessage(ComTrainMsg.OnBtnLevelClick, this.enterBattle, [BattleType.Level]);
		this.addMessage(ComTrainMsg.OnBtnCopyClick, this.enterBattle, [BattleType.Copy]);
		this.addMessage(ComTrainMsg.OnBtnSecretClick, this.enterBattle, [BattleType.Secret]);
		this.addMessage(ComTrainMsg.OnBtnBossClick, this.enterBattle, [BattleType.Boss]);
		this.addMessage(ComTrainMsg.OnBtnGatherClick, this.enterBattle, [BattleType.Gather]);
		this.addMessage(ComTrainMsg.OnBtnGongLueClick, this.onBtnGongLueClick);
		this.addMessage(ComTrainMsg.OnBtnWaiYuClick, this.onBtnWaiYuClick);

		UIUtil.SetList(this.view.list_log, true, this, this.onListLogRenderer);
	}

	override onEnable() {
		trainLogMgr.randomLog();
	}

	@RegisterEvent(GameEvent.RefreshExperienceLog)
	private refreshLogList() {
		const logs = trainLogMgr.logs;
		this.view.list_log.numItems = logs.length;
		this.view.list_log.scrollToView(logs.length - 1);
	}

	private onListLogRenderer(index: number, item: RenderTextView) {
		item.setText(trainLogMgr.logs[index]);
	}

	private enterBattle(battleType: BattleType): void {
		sceneMgr.enterScene(SceneType.GameScene, { battleType });
	}

	private onBtnGongLueClick() {

	}

	private onBtnWaiYuClick() {

	}

}