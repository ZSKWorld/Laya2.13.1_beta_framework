import { SceneType } from "../../../../../scene/SceneDefine";
import { sceneMgr } from "../../../../../scene/SceneManager";
import { localData } from "../../../../game/localData/LocalData";
import { LocalDataKey } from "../../../../game/localData/LocalDataKey";
import { NetCMD } from "../../../../net/enum/NetCMD";
import { BaseProxy } from "../../../core/BaseProxy";
import { UILoginCtrl } from "../controller/UILoginCtrl";
import { UILoginEvent } from "../event/UILoginEvent";

export class UILoginProxy extends BaseProxy<UILoginCtrl> {

    @RegisterEvent(NetCMD.Login)
    private login(output: ILoginOutput, input: ILoginInput) {
        const param = { account: input.account, password: input.password };
        localData.set(LocalDataKey.LastLoginAccount, param);
        sceneMgr.enterScene(SceneType.MainScene);
    }

    @RegisterEvent(NetCMD.LoginError)
    private loginError(output: ILoginOutput, input: ILoginInput) {
        this.sendMessage(UILoginEvent.OnLoginFailed);
    }

    @RegisterEvent(NetCMD.Register)
    private register(output: IRegisterOutput, input: IRegisterInput) {
        this.sendMessage(UILoginEvent.Login, input);
    }
}