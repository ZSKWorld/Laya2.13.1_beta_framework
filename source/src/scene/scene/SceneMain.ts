import { redDotMgr } from "../../core/ui/redDot/RedDotManager";
import { LogicSceneBase } from "../SceneBase";
import { SceneType } from "../SceneDefine";

export interface SceneMainData {

}

/** 主页逻辑场景 */
export class SceneMain extends LogicSceneBase<SceneMainData> {
	override readonly type = SceneType.MainScene;
	protected override loadViewId = ViewID.UILoading4View;
	protected override getNormalResArray() {
		return [
			ResPath.PkgPath.PkgMain,
		];
	}

	protected override onEnter() {
		redDotMgr.init();
		this.showView(ViewID.UIMainView);
	}

}