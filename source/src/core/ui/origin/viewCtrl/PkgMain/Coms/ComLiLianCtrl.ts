import { logicSceneMgr } from "../../../../../logicScene/LogicSceneManager";
import { LogicScene } from "../../../../../logicScene/LogicSceneType";
import { GameEvent } from "../../../../common/GameEvent";
import { trainLogMgr } from "../../../../game/TrainLogManager";
import { Logger } from "../../../../libs/utils/Logger";
import { BattleType } from "../../../../net/enum/BattleEnums";
import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { UIUtility } from "../../../tool/UIUtility";
import { ComLiLianMsg, ComLiLianView } from "../../../view/PkgMain/Coms/ComLiLianView";
import { RenderTextView } from "../../../view/PkgMain/Renders/RenderTextView";

const logger = Logger.Create("ComLiLianCtrl", true);

export interface ComLiLianData {

}

export class ComLiLianCtrl extends BaseViewCtrl<ComLiLianView, ComLiLianData>{

	override onAwake(): void {
		this.addMessage(ComLiLianMsg.OnBtnGuanQiaClick, this.enterBattle, [ BattleType.GuanQia ]);
		this.addMessage(ComLiLianMsg.OnBtnFuBenClick, this.enterBattle, [ BattleType.FuBen ]);
		this.addMessage(ComLiLianMsg.OnBtnMiJingClick, this.enterBattle, [ BattleType.MiJing ]);
		this.addMessage(ComLiLianMsg.OnBtnBossClick, this.enterBattle, [ BattleType.Boss ]);
		this.addMessage(ComLiLianMsg.OnBtnCaiJiClick, this.enterBattle, [ BattleType.CaiJi ]);
		this.addMessage(ComLiLianMsg.OnBtnGongLueClick, this.onBtnGongLueClick);
		this.addMessage(ComLiLianMsg.OnBtnWaiYuClick, this.onBtnWaiYuClick);

		UIUtility.SetList(this.view.ListLog, true, this, this.logRenderer);
	}

	override onEnable(): void {
		trainLogMgr.randomLog();
	}

	override onDisable(): void {

	}

	override onDestroy(): void {

	}

	@RegisterEvent(GameEvent.RefreshExperienceLog)
	private refreshLogList() {
		const logs = trainLogMgr.logs;
		this.view.ListLog.numItems = logs.length;
		this.view.ListLog.scrollToView(logs.length - 1);
	}

	private logRenderer(index: number, item: RenderTextView) {
		item.setText(trainLogMgr.logs[ index ]);
	}

	private enterBattle(battleType: BattleType): void {
		logicSceneMgr.enterScene(LogicScene.GameScene, battleType);
	}

	private onBtnGongLueClick(): void {

	}

	private onBtnWaiYuClick(): void {

	}

}