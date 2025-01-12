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
		this.showView(ViewID.UILoginView);
	}

}