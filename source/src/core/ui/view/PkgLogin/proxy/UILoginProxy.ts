import { logicSceneMgr } from "../../../../../logicScene/LogicSceneManager";
import { LogicScene } from "../../../../../logicScene/LogicSceneType";
import { localData } from "../../../../libs/localData/LocalData";
import { LocalDataKey } from "../../../../libs/localData/LocalDataKey";
import { NetMessage } from "../../../../net/enum/NetMessage";
import { AccountService } from "../../../../net/Services";
import { BaseProxy } from "../../../core/BaseProxy";
import { UILoginCtrl } from "../controller/UILoginCtrl";

export class UILoginProxy extends BaseProxy<UILoginCtrl>{

    @RegisterEvent(NetMessage.Login)
    private loginResponse(output: LoginOutput, input: LoginInput) {
        const param = { account: input.account, password: input.password };
        localData.set(LocalDataKey.LastLoginAccount, param);
        logicSceneMgr.enterScene(LogicScene.MainScene);
    }

    @RegisterEvent(NetMessage.Register)
    private registerResponse(_, input: RegisterInput) {
        AccountService.Inst.login({ account: input.account, password: input.password });
    }
}