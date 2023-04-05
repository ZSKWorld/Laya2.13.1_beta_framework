import { Observer } from "../core/libs/event/Observer";
import { Logger } from "../core/libs/utils/Logger";
import { ViewID } from "../core/ui/core/ViewID";
import { IScene } from "./ILogicScene";
import { LogicScene } from "./LogicSceneType";

const logger = Logger.Create("LogicSceneMgr", true);

/** 逻辑场景管理类 */
class LogicSceneManager extends Observer {
	private _currentType: LogicScene;
	private _currentScene: IScene;
	private _loadCompleted: boolean = true;
	private _sceneMap: Map<LogicScene, IScene>;

	init(sceneMap: [ LogicScene, IScene ][]) {
		if (!this._sceneMap)
			this._sceneMap = new Map(sceneMap);
	}

	registerSceneView(type:LogicScene, view:ViewID) {
		const scene = this._sceneMap.get(type);
		if (scene) scene.views.add(view);
	}

	enterScene(type: LogicScene, data?: any) {
		if (!this._loadCompleted) return;
		if (this._currentType != type) {
			this._loadCompleted = false;
			const newScene = this._sceneMap.get(type);
			newScene.load().then(() => {
				this._currentType = type;
				this._currentScene?.exit();
				this._currentScene = newScene;
				this._loadCompleted = true;
				this._currentScene.enter(data);
				// Laya.Resource.destroyUnusedResources();
			}, () => {
				this._loadCompleted = true;
				if (confirm(`${ type } 场景加载失败，是否重试?`))
					this.enterScene(type, data);
				else
					newScene.exit();
			});
		}
	}
}

export const logicSceneMgr = new LogicSceneManager();
windowImmit("logicSceneMgr", logicSceneMgr);