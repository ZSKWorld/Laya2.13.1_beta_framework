import { ResPath } from "../../core/common/ResPath";
import { websocket } from "../../core/net/WebSocket";
import { layerMgr } from "../../core/ui/core/LayerManager";
import { uiMgr } from "../../core/ui/core/UIManager";
import { viewRegister } from "../../core/ui/core/ViewRegister";
import { platformMgr } from "../../platform/PlatformManager";
import { LogicSceneBase } from "../LogicSceneBase";
import { logicSceneMgr } from "../LogicSceneManager";
import { LogicScene } from "../LogicSceneType";

export interface SceneInitData {

}

/** 初始化逻辑场景 */
export class LogicSceneInit extends LogicSceneBase<SceneInitData> {

	protected override getNormalResArray() {
		return [
		];
	}

	protected onEnter() {
		layerMgr.init();
		uiMgr.init();
		viewRegister.init();
		websocket.init();
		platformMgr.init();
		logicSceneMgr.enterScene(LogicScene.PreScreen);
	}

	protected onExit() {
	}
}

