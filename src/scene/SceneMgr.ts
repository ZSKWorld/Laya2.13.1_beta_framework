import { NotifyConst } from '../core/common/NotifyConst'
import { InsertNotify } from '../core/libs/event/EventMgr'
import { Observer } from '../core/libs/event/Observer'
import { IScene } from './IScene'
import { SceneType } from './SceneType'

/**
 *@Author zsk
 *@Date 2022/7/25 21:42
 *@Description 场景管理
 */
class SceneMgr extends Observer {
	private currentType: SceneType;
	private currentScene: IScene;
	private enterCompleted: boolean = true;
	private sceneMap: Map<SceneType, IScene>;

	init(sceneMap: [ SceneType, IScene ][]) {
		if (!this.sceneMap)
			this.sceneMap = new Map(sceneMap);
	}

	@InsertNotify(NotifyConst.EnterScene)
	enterScene(type: SceneType, data?: any) {		
		if (!this.enterCompleted) return;
		if (this.currentType != type) {
			this.enterCompleted = false;
			const newScene = this.sceneMap.get(type);
			newScene.load().then(() => {
				this.currentType = type;
				if (this.currentScene)
					this.currentScene.exit();
				this.currentScene = newScene;
				this.enterCompleted = true;
				this.currentScene.enter(data);
			}, () => (this.enterCompleted = true));
		}
	}
}

export const sceneMgr = new SceneMgr()