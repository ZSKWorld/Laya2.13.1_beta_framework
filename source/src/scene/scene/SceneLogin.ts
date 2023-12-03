import { ResPath } from "../../core/common/ResPath";
import { uiMgr } from "../../core/ui/core/UIManager";
import { ViewID } from "../../core/ui/core/ViewID";
import { LogicSceneBase } from "../SceneBase";

export interface SceneLoginData {

}

/** 登录逻辑场景 */
export class SceneLogin extends LogicSceneBase<SceneLoginData> {
	protected override getNormalResArray() {
		return [
			ResPath.PkgPath.PkgLogin,
		];
	}

	protected override getConstResArray() {
		return [
			ResPath.PkgPath.PkgCommon,
		];
	}

	protected override onEnter() {
		uiMgr.showView(ViewID.UILoginView);
	}

	protected override onExit() {
	}

}