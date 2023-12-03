import { sceneMgr } from "../../../scene/SceneManager";

export class ViewLogicRegister {
    static Init() {

    }

    private static Register() {
        const registerView = sceneMgr.registerSceneView.bind(sceneMgr);
        // registerView(LogicScene.InitScene)

        // registerView(LogicScene.LoginScene, ViewID.LoginView)

        // registerView(LogicScene.MainScene)

        // registerView(LogicScene.GameScene)
    }
}