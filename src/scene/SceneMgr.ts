import { NotifyConst } from '../core/common/NotifyConst'
import { InsertNotify } from '../core/libs/event/EventMgr'
import { Observer } from '../core/libs/event/Observer'
import { IScene } from './IScene'
import { SceneType } from './SceneConst'

/**
 *@Author zsk
 *@Date 2022/7/25 21:42
 *@Description 场景管理
 */
class SceneMgr extends Observer {
	private _currentType: SceneType;
	private _currentScene: IScene;
	private _enterCompleted: boolean = true;
	private _sceneMap: Map<SceneType, IScene>;

	init(sceneMap: [ SceneType, IScene ][]) {
		if (!this._sceneMap)
			this._sceneMap = new Map(sceneMap);
	}

	@InsertNotify(NotifyConst.EnterScene)
	enterScene(type: SceneType, data?: any) {		
		if (!this._enterCompleted) return;
		if (this._currentType != type) {
			this._enterCompleted = false;
			const newScene = this._sceneMap.get(type);
			newScene.load().then(() => {
				this._currentType = type;
				if (this._currentScene)
					this._currentScene.exit();
				this._currentScene = newScene;
				this._enterCompleted = true;
				this._currentScene.enter(data);
			});
		}
	}
}

export const sceneMgr = new SceneMgr()