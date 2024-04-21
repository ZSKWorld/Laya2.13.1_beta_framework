import { Observer } from "../core/game/event/Observer";
import { IScene, SceneEvent, SceneType } from "./SceneDefine";

/** 逻辑场景管理类 */
class SceneManager extends Observer {
	private _currentType: SceneType;
	private _sceneMap: Map<SceneType, IScene>;

	init(sceneMap: IScene[]) {
		if (!this._sceneMap) this._sceneMap = new Map();
		sceneMap.forEach(v => this._sceneMap.set(v.type, v));
	}

	registerSceneView(type: SceneType, view: string) {
		const scene = this._sceneMap.get(type);
		if (scene) scene.views.add(view);
	}

	enterScene(type: SceneType, data?: any) {
		if (this._currentType != type) {
			const newScene = this._sceneMap.get(type);
			newScene.load().then(() => {
				const curScene = this._sceneMap.get(this._currentType);
				curScene?.exit();
				this._currentType = type;
				newScene.enter(data);
			}, () => {
				showConfirm("提示", `${ type } 场景加载失败，是否重试?`).then(result => {
					if (result) this.enterScene(type, data);
					else newScene.exit();
				});
			});
		}
	}

	@RegisterEvent(SceneEvent.OnLoadBegin, false, [SceneEvent.OnLoadBegin])
	@RegisterEvent(SceneEvent.OnLoadEnd, false, [SceneEvent.OnLoadEnd])
	@RegisterEvent(SceneEvent.OnEnter, false, [SceneEvent.OnEnter])
	@RegisterEvent(SceneEvent.OnExit, false, [SceneEvent.OnExit])
	private onEvent(...args) {
		console.error(...args);
	}
}
export const sceneMgr = new SceneManager();
windowImmit("logicSceneMgr", sceneMgr);