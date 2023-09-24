import { ResPath } from "../../core/common/ResPath";
import { uiMgr } from "../../core/ui/core/UIManager";
import { ViewID } from "../../core/ui/core/ViewID";
import { LogicSceneBase } from "../LogicSceneBase";

export interface SceneLoginData {

}

/** 登录逻辑场景 */
export class LogicSceneLogin extends LogicSceneBase<SceneLoginData> {
	protected override getNormalResArray() {
		return [
			ResPath.PkgPath.PkgLogin,
		];
	}

	protected override getConstResArray(): string[] {
		return [
			ResPath.PkgPath.PkgCommon,
		];
	}

	protected onEnter() {
		uiMgr.showView(ViewID.UILoginView);
	}

	protected onExit() {
	}

}