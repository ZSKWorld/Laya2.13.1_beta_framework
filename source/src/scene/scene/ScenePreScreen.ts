import { ResPath } from "../../core/common/ResPath";
import { LogicSceneBase } from "../SceneBase";
import { SceneType } from "../SceneDefine";
import { sceneMgr } from "../SceneManager";

export interface ScenePreScreenData {

}

/** 首屏逻辑场景 */
export class ScenePreScreen extends LogicSceneBase<ScenePreScreenData>{

    protected override getConstResArray() {
        const resArray: string[] = [
            ResPath.PrescreenPath.Prescreen,
        ];
        return resArray;
    }

    protected override onEnter() {
        Laya.stage.on(Laya.Event.CLICK, this, this.onStageClick);
        sceneMgr.enterScene(SceneType.InitScene);
    }

    private onStageClick(e: Laya.Event) {
        Laya.SoundManager.playSound(ResPath.SoundPath.Button45)
    }

}