import { ResPath } from "../../core/common/ResPath";
import { uiMgr } from "../../core/ui/core/UIManager";
import { ViewID } from "../../core/ui/core/ViewID";
import { platformMgr } from "../../platform/PlatformManager";
import { LogicSceneBase } from "../SceneBase";
import { SceneEvent, SceneType } from "../SceneDefine";
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
        this.showConfirm();
        this.showPreScreen();
        platformMgr.init();
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

    @RegisterEvent(SceneEvent.OnEnter)
    private showConfirm(type?: SceneType) {
        if (type) {
            if (type == SceneType.InitScene) {
                this.off(SceneEvent.OnEnter, this, this.showConfirm);
                windowImmit("showConfirm", (title, msg, cancel = true) => new Promise<boolean>(resolve => {
                    uiMgr.showView(ViewID.UIConfirmView, {
                        title,
                        content: msg,
                        cancel: cancel,
                        onCancel: cancel ? Laya.Handler.create(null, resolve, [false]) : null,
                        onConfirm: Laya.Handler.create(null, resolve, [true]),
                    });
                }));
            }
        } else
            windowImmit("showConfirm", (title, msg) => platformMgr.showConfirm(title, msg));
    }

    private onStageClick(e: Laya.Event) {
        Laya.SoundManager.playSound(ResPath.SoundPath.Button45)
    }

}