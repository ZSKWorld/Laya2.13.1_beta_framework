import { Observer } from "../core/game/event/Observer";
import { IScene, SceneType } from "./SceneDefine";

/** 逻辑场景管理类 */
class SceneManager extends Observer {
	private _currentType: SceneType;
	private _currentScene: IScene;
	private _loadCompleted: boolean = true;
	private _sceneMap: Map<SceneType, IScene>;

	init(sceneMap: [SceneType, IScene][]) {
		if (!this._sceneMap) {
			this._sceneMap = new Map(sceneMap);
		}
	}

	registerSceneView(type: SceneType, view: string) {
		const scene = this._sceneMap.get(type);
		if (scene) scene.views.add(view);
	}

	enterScene(type: SceneType, data?: any) {
		if (!this._loadCompleted) return;
		if (this._currentType != type) {
			this._loadCompleted = false;
			const newScene = this._sceneMap.get(type);
			newScene.preEnter();
			newScene.load().then(() => {
				this._currentType = type;
				this._currentScene?.exit();
				this._currentScene = newScene;
				this._loadCompleted = true;
				this._currentScene.enter(data);
			}, () => {
				this._loadCompleted = true;
				showConfirm("提示", `${ type } 场景加载失败，是否重试?`).then(result => {
					if (result) this.enterScene(type, data);
					else newScene.exit();
				});
			});
		}
	}
}
export const sceneMgr = new SceneManager();
windowImmit("logicSceneMgr", sceneMgr);