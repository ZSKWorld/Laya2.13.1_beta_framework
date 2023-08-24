import { logicSceneMgr } from "../../../logicScene/LogicSceneManager";

export class ViewLogicRegister {
    static Init() {

    }

    private static Register() {
        const registerView = logicSceneMgr.registerSceneView.bind(logicSceneMgr);
        // registerView(LogicScene.InitScene)

        // registerView(LogicScene.LoginScene, ViewID.LoginView)

        // registerView(LogicScene.MainScene)

        // registerView(LogicScene.GameScene)
    }
}