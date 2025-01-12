import { BattleType } from "../../core/userData/const/BattleEnums";
import { LogicSceneBase } from "../SceneBase";
import { SceneType } from "../SceneDefine";

export interface SceneGameData {
	battleType: BattleType;
}

/** 游戏逻辑场景 */
export class SceneGame extends LogicSceneBase<SceneGameData> {
	override readonly type = SceneType.GameScene;
	protected override loadViewId = ViewID.UILoading4View;

	protected override getNormalResArray() {
		return [
			ResPath.PkgPath.PkgBattle
		];
	}

	protected override onEnter() {
		this.showView(ViewID.UIChooseBattleView, this.data.battleType);
	}

}