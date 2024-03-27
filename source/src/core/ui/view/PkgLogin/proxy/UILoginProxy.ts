import { SceneType } from "../../../../../scene/SceneDefine";
import { sceneMgr } from "../../../../../scene/SceneManager";
import { localData } from "../../../../game/localData/LocalData";
import { LocalDataKey } from "../../../../game/localData/LocalDataKey";
import { NetMessage } from "../../../../net/enum/NetMessage";
import { BaseProxy } from "../../../core/BaseProxy";
import { UILoginCtrl } from "../controller/UILoginCtrl";
import { UILoginEvent } from "../event/UILoginEvent";

export class UILoginProxy extends BaseProxy<UILoginCtrl> {

    @RegisterEvent(NetMessage.Login)
    private login(output: LoginOutput, input: LoginInput) {
        const param = { account: input.account, password: input.password };
        localData.set(LocalDataKey.LastLoginAccount, param);
        sceneMgr.enterScene(SceneType.MainScene);
    }

    @RegisterEvent(NetMessage.LoginError)
    private loginError(output: LoginOutput, input: LoginInput) {
        this.sendMessage(UILoginEvent.OnLoginFailed);
    }

    @RegisterEvent(NetMessage.Register)
    private register(output: RegisterOutput, input: RegisterInput) {
        this.sendMessage(UILoginEvent.Login, input);
    }
}