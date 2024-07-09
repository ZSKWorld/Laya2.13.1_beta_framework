import { SceneType } from "../../../scene/SceneDefine";
import { sceneMgr } from "../../../scene/SceneManager";

class SceneViewRegister {
    init() {
        this.registerSceneView();
    }

    private registerSceneView() {
        const registerView = sceneMgr.registerSceneView.bind(sceneMgr) as (type: SceneType, view: string) => void;
        // registerView(SceneType.InitScene)

        // registerView(SceneType.LoginScene, ViewID.UILoginView);

        // registerView(SceneType.MainScene, ViewID.UIChatView);
        // registerView(SceneType.MainScene, ViewID.UIEquipmentInfoView);
        // registerView(SceneType.MainScene, ViewID.UIGoodsInfoView);
        // registerView(SceneType.MainScene, ViewID.UIMainView);
        // registerView(SceneType.MainScene, ViewID.UIPlayerInfoView);
        // registerView(SceneType.MainScene, ViewID.UISectView);
        // registerView(SceneType.MainScene, ViewID.UISettingView);
        // registerView(SceneType.MainScene, ViewID.UISphereToolView);

        // registerView(SceneType.GameScene, ViewID.UIBattleConfirmView);
        // registerView(SceneType.GameScene, ViewID.UIBattleView);
        // registerView(SceneType.GameScene, ViewID.UIChooseBattleView);

        // registerView(SceneType.LittleGameScene, ViewID.UILittleGameView);
        // registerView(SceneType.LittleGameScene, ViewID.UITenWaterView);
    }
}

export const sceneViewRegister = new SceneViewRegister();