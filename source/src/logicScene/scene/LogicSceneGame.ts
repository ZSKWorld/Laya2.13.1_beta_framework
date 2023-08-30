import { ResPath } from "../../core/common/ResPath";
import { BattleType } from "../../core/net/enum/BattleEnums";
import { uiMgr } from "../../core/ui/core/UIManager";
import { ViewID } from "../../core/ui/core/ViewID";
import { LogicSceneBase } from "../LogicSceneBase";

export interface SceneGameData {
	battleType: BattleType;
}

/** 游戏逻辑场景 */
export class LogicSceneGame extends LogicSceneBase<SceneGameData> {
	protected override loadViewId = ViewID.UILoading1View;

	protected override getNormalResArray(): string[] {
		return [
			ResPath.PkgPath.PkgBattle
		];
	}

	protected onEnter(): void {
		uiMgr.showView(ViewID.UIChooseBattleView, this.data.battleType);
	}

	protected onExit(): void {

	}

}