import { ResPath } from "../../core/common/ResPath";
import { uiMgr } from "../../core/ui/core/UIManager";
import { ViewID } from "../../core/ui/core/ViewID";
import { LogicSceneBase } from "../SceneBase";
import { SceneType } from "../SceneDefine";

export interface SceneLoginData {

}

/** 登录逻辑场景 */
export class SceneLogin extends LogicSceneBase<SceneLoginData> {
	override readonly type = SceneType.LoginScene;
	protected override getNormalResArray() {
		return [
			ResPath.PkgPath.PkgLogin,
		];
	}

	protected override onEnter() {
		uiMgr.showView(ViewID.UILoginView);
	}

	protected override onExit() {
	}

}