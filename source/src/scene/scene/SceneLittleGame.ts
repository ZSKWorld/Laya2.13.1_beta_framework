import { LogicSceneBase } from "../SceneBase";
import { SceneType } from "../SceneDefine";

export interface SceneLittleGameData {

}

/** 小游戏逻辑场景 */
export class SceneLittleGame extends LogicSceneBase<SceneLittleGameData> {
	override readonly type = SceneType.LittleGameScene;
	protected override loadViewId = ViewID.UILoading4View;

	protected override getNormalResArray() {
		return [
			ResPath.PkgPath.PkgLittleGame
		];
	}

	protected override onEnter() {
		this.showView(ViewID.UILittleGameView);
	}

}