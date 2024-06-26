import { ResPath } from "../../core/common/ResPath";
import { BattleType } from "../../core/net/enum/BattleEnums";
import { uiMgr } from "../../core/ui/core/UIManager";
import { ViewID } from "../../core/ui/core/ViewID";
import { LogicSceneBase } from "../SceneBase";
import { SceneType } from "../SceneDefine";

export interface SceneGameData {
	battleType: BattleType;
}

/** 游戏逻辑场景 */
export class SceneGame extends LogicSceneBase<SceneGameData> {
	override readonly type = SceneType.GameScene;
	protected override loadViewId = ViewID.UILoading1View;

	protected override getNormalResArray() {
		return [
			ResPath.PkgPath.PkgBattle
		];
	}

	protected override onEnter() {
		uiMgr.showView(ViewID.UIChooseBattleView, this.data.battleType);
	}

	protected override onExit() {

	}

}