import { ResPath } from "../../core/common/ResPath";
import { CfgManager } from "../../core/config/CfgManager";
import { layerMgr, Layer } from "../../core/ui/core/LayerManager";
import { UserData } from "../../core/userData/UserData";
import { platformMgr } from "../../platform/PlatformManager";
import { LogicSceneBase } from "../LogicSceneBase";
import { logicSceneMgr } from "../LogicSceneManager";
import { LogicScene } from "../LogicSceneType";

export interface ScenePreScreenData {

}

/** 首屏逻辑场景 */
export class LogicScenePreScreen extends LogicSceneBase<ScenePreScreenData>{
	private _prescreen: fgui.GLoader;

    protected override getConstResArray() {
        const resArray: string[] = [
            ResPath.ConfigPath.Config,
            ResPath.PkgPath.PkgCommon,
        ];
        resArray.push(...platformMgr.platform.res);
        return resArray;
    }

    protected onEnter() {
        windowImmit("cfgMgr", new CfgManager());
        windowImmit("userData", new UserData());
        this.showPreScreen();
		Laya.timer.once(100, this, () => logicSceneMgr.enterScene(LogicScene.LoginScene));
    }

    protected onExit() {
        if (this._prescreen) {
            this._prescreen.dispose();
            this._prescreen = null;
        }
    }

	private showPreScreen() {
		if (!this._prescreen) {
			const groot = fgui.GRoot.inst;
			const pscreen = this._prescreen = new fgui.GLoader();
			pscreen.url = ResPath.PrescreenPath.Prescreen;
			pscreen.setSize(groot.width, groot.height);
			pscreen.addRelation(groot, fgui.RelationType.Size);
			pscreen.fill = fgui.LoaderFillType.ScaleFree;
			layerMgr.addObject(this._prescreen, Layer.Bottom);
		}
	}

}