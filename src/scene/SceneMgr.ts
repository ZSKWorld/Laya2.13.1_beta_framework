import { SceneType } from './SceneConst'
import { IScene } from './IScene'
import { loadMgr } from '../core/libs/load/LoadMgr'
import { InsertNotify } from '../core/libs/event/EventMgr'
import { NotifyConst } from '../core/common/NotifyConst'
import { Observer } from '../core/libs/event/Observer'

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
		if ( !this._sceneMap )
			this._sceneMap = new Map(sceneMap);
	}

	@InsertNotify(NotifyConst.EnterScene)
	enterScene(type: SceneType, data?: any) {
		console.log(type)
		if ( !this._enterCompleted ) return;
		if ( this._currentType != type ) {
			this._enterCompleted = false;
			const newScene = this._sceneMap.get(type);
			this.loadScene(newScene).then(() => {
				this._currentType = type;
				if ( this._currentScene )
					this._currentScene.exit();
				this._enterCompleted = true;
				this._currentScene = newScene;
				this._currentScene.enter(data);
			});
		}
	}

	/** 加载资源 */
	private loadScene(scene: IScene) {
		const resArr = scene.getResArray();
		const normalRes: string[] = [], uiRes: string[] = [];
		resArr.forEach(res => {
			if ( res.startsWith("res/ui/") ) uiRes.push(res);
			else normalRes.push(res);
		});
		// let totalProgress = 0;
		// const progressHandler = Laya.Handler.create(this, (progress: number) => {
		// 	totalProgress += progress;
		// }, null, false);
		return Promise.all([
			loadMgr.load(normalRes),
			loadMgr.loadPackage(uiRes),
		]);
	}
}

export const sceneMgr = new SceneMgr()