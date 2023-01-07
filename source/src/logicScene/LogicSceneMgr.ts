import { GameEvent } from "../core/common/GameEvent";
import { Event } from "../core/libs/event/EventMgr";
import { Observer } from "../core/libs/event/Observer";
import { Logger } from "../core/libs/utils/Logger";
import { IScene } from "./ILogicScene";
import { LogicScene } from "./LogicSceneType";

const logger = Logger.Create("LogicSceneMgr", true);

/** 逻辑场景管理类 */
class LogicSceneMgr extends Observer {
	private _currentType: LogicScene;
	private _currentScene: IScene;
	private _enterCompleted: boolean = true;
	private _sceneMap: Map<LogicScene, IScene>;

	init(sceneMap: [ LogicScene, IScene ][]) {
		if (!this._sceneMap)
			this._sceneMap = new Map(sceneMap);
	}

	@Event(GameEvent.EnterScene)
	private enterScene(type: LogicScene, data?: any) {
		if (!this._enterCompleted) return;
		if (this._currentType != type) {
			this._enterCompleted = false;
			const newScene = this._sceneMap.get(type);
			newScene.load().then(() => {
				this._currentType = type;
				this._currentScene?.exit();
				this._currentScene = newScene;
				this._enterCompleted = true;
				this._currentScene.enter(data);
				Laya.Resource.destroyUnusedResources();
			}, () => {
				this._enterCompleted = true;
				if (confirm(`场景 ${ type } 加载失败，是否重试?`))
					this.enterScene(type, data);
			});
		}
	}
}

export const logicSceneMgr = new LogicSceneMgr()
windowImmit("logicSceneMgr", logicSceneMgr);