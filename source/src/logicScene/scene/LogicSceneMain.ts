import { ResPath } from "../../core/common/ResPath";
import { uiMgr } from "../../core/ui/core/UIManager";
import { ViewID } from "../../core/ui/core/ViewID";
import { redDotMgr } from "../../core/ui/redDot/RedDotManager";
import { LogicSceneBase } from "../LogicSceneBase";

export interface SceneMainData{

}

/** 主页逻辑场景 */
export class LogicSceneMain extends LogicSceneBase<SceneMainData> {
	protected override getNormalResArray() {
		return [
			ResPath.PkgPath.PkgMain,
			ResPath.SkeletonPath.Spine_106_01,
			ResPath.SkeletonPath.Spine_141_01,
		];
	}

	protected onEnter() {
		redDotMgr.init();
		uiMgr.showView(ViewID.UIMainView);
	}

	protected onExit() {
	}
}