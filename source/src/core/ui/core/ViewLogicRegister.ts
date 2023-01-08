import { logicSceneMgr } from "../../../logicScene/LogicSceneMgr";
import { LogicScene } from "../../../logicScene/LogicSceneType";
import { Logger } from "../../libs/utils/Logger";
import { ViewID } from "./ViewID";

const logger = Logger.Create("ViewLogicRegister", true);

export class ViewLogicRegister {
    static init() {
        
    }

    private static register() {
        const registerView = logicSceneMgr.registerSceneView.bind(logicSceneMgr);
        // registerView(LogicScene.InitScene)

        registerView(LogicScene.LoginScene, ViewID.LoginMainView)

        registerView(LogicScene.MainScene)
        
        registerView(LogicScene.GameScene)
    }
}