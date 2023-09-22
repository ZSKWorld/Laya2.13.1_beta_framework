import { logicSceneMgr } from "../../../../../logicScene/LogicSceneManager";
import { LogicScene } from "../../../../../logicScene/LogicSceneType";
import { localData } from "../../../../libs/localData/LocalData";
import { LocalDataKey } from "../../../../libs/localData/LocalDataKey";
import { NetMessage } from "../../../../net/enum/NetMessage";
import { BaseProxy } from "../../../core/BaseProxy";
import { UILoginCtrl } from "../controller/UILoginCtrl";

export class UILoginProxy extends BaseProxy<UILoginCtrl>{

    @RegisterEvent(NetMessage.Login)
    private login(output: LoginOutput, input: LoginInput) {
        const param = { account: input.account, password: input.password };
        localData.set(LocalDataKey.LastLoginAccount, param);
        logicSceneMgr.enterScene(LogicScene.MainScene);
    }

    @RegisterEvent(NetMessage.LoginError)
    private loginError(output: LoginOutput, input: LoginInput) {
        this.viewCtrl.onLoginError();
    }

    @RegisterEvent(NetMessage.Register)
    private register(output: RegisterOutput, input: RegisterInput) {
        this.viewCtrl.toLogin(input);
    }
}