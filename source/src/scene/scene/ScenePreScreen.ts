import { LogicSceneBase } from "../SceneBase";
import { SceneEvent, SceneType } from "../SceneDefine";
import { sceneMgr } from "../SceneManager";

export interface ScenePreScreenData {

}

/** 首屏逻辑场景 */
export class ScenePreScreen extends LogicSceneBase<ScenePreScreenData> {
    override readonly type = SceneType.PreScreen;
    private _prescreen: Laya.Sprite;

    protected override getConstResArray() {
        const resArray: string[] = [
            ResPath.PrescreenPath.Prescreen,
        ];
        return resArray;
    }

    protected override onEnter() {
        this.showPreScreen();
        // Laya.stage.on(Laya.Event.CLICK, this, this.onStageClick);
        sceneMgr.enterScene(SceneType.InitScene);
        this.on(SceneEvent.OnEnterScene, this, this.clearPreScreen);
    }

    private showPreScreen() {
        if (this._prescreen) return;
        const pscreen = this._prescreen = new Laya.Sprite();
        pscreen.zOrder = 999;
        pscreen.mouseEnabled = true;
        pscreen.size(Laya.stage.width, Laya.stage.height);
        pscreen.loadImage(ResPath.PrescreenPath.Prescreen);
        Laya.stage.addChild(pscreen);
    }

    private clearPreScreen(type: SceneType) {
        if (type != SceneType.LoginScene) return;
        this._prescreen && this._prescreen.destroy();
        this._prescreen = null;
        Laya.loader.clearRes(ResPath.PrescreenPath.Prescreen);
        this.off(SceneEvent.OnEnterScene, this, this.clearPreScreen);
    }

    private onStageClick(e: Laya.Event) {
        Laya.SoundManager.playSound(ResPath.SoundPath.Button45)
    }

}