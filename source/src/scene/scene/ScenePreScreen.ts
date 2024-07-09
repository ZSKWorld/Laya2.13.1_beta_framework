import { LogicSceneBase } from "../SceneBase";
import { SceneType } from "../SceneDefine";
import { sceneMgr } from "../SceneManager";

export interface ScenePreScreenData {

}

/** 首屏逻辑场景 */
export class ScenePreScreen extends LogicSceneBase<ScenePreScreenData> {
    override readonly type = SceneType.PreScreen;
    private _prescreen: fgui.GLoader;

    protected override getNormalResArray() {
        const resArray: string[] = [
            ResPath.PrescreenPath.Prescreen,
        ];
        return resArray;
    }

    protected override onEnter() {
        this.showPreScreen();
        // Laya.stage.on(Laya.Event.CLICK, this, this.onStageClick);
        Laya.timer.once(250, sceneMgr, sceneMgr.enterScene, [SceneType.InitScene]);
    }

    protected override onExit() {
        if (this._prescreen) {
            this._prescreen.dispose();
            this._prescreen = null;
        }
    }

    private showPreScreen() {
        if (!this._prescreen) {
            const pscreen = this._prescreen = new fgui.GLoader();
            pscreen.url = ResPath.PrescreenPath.Prescreen;
            pscreen.setSize(Laya.stage.width, Laya.stage.height);
            // pscreen.addRelation(groot, fgui.RelationType.Size);
            pscreen.fill = fgui.LoaderFillType.ScaleFree;
            Laya.stage.addChild(this._prescreen.displayObject);
        }
    }

    private onStageClick(e: Laya.Event) {
        Laya.SoundManager.playSound(ResPath.SoundPath.Button45)
    }

}