import { ResPath } from "../../core/common/ResPath";
import { platformMgr } from "../../platform/PlatformManager";
import { LogicSceneBase } from "../LogicSceneBase";
import { logicSceneMgr } from "../LogicSceneManager";
import { LogicScene } from "../LogicSceneType";

export interface ScenePreScreenData {

}

/** 首屏逻辑场景 */
export class LogicScenePreScreen extends LogicSceneBase<ScenePreScreenData>{
    private _audioSound: Laya.WebAudioSound;
    private _soundChanel: Laya.WebAudioSoundChannel;

    protected override getConstResArray() {
        const resArray: string[] = [
            ResPath.PrescreenPath.Prescreen,
            ResPath.SoundPath.Button45,
        ];
        return resArray;
    }

    protected override onEnter() {
        platformMgr.init();
        Laya.stage.on(Laya.Event.CLICK, this, this.onStageClick);
        logicSceneMgr.enterScene(LogicScene.InitScene);
    }

    private onStageClick(e: Laya.Event) {
        if (!this._audioSound)
            this._audioSound = Laya.loader.getRes(ResPath.SoundPath.Button45);
        this._soundChanel = this._audioSound.play(0, 1, this._soundChanel) as Laya.WebAudioSoundChannel;
    }

}