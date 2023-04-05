import { logicSceneMgr } from "../../../../logicScene/LogicSceneManager";
import { LogicScene } from "../../../../logicScene/LogicSceneType";
import { Event } from "../../../libs/event/EventManager";
import { localData } from "../../../libs/localData/LocalData";
import { LocalDataKey } from "../../../libs/localData/LocalDataKey";
import { NetMessage } from "../../../net/enum/NetMessage";
import { BaseProxy } from "../../core/BaseProxy";
import { UILoginMainMsg } from "../../view/PkgLogin/UILoginMainView";
import { UILoginMainCtrl } from "../../viewCtrl/PkgLogin/UILoginMainCtrl";

export class UILoginMainProxy extends BaseProxy<UILoginMainCtrl>{

    @Event(NetMessage.Login)
    private loginResponse() {
        const { TxtAccount, TxtPassword } = this.viewCtrl.view;
        const param = { account: TxtAccount.text, password: TxtPassword.text };
        localData.set(LocalDataKey.LastLoginAccount, param);
        logicSceneMgr.enterScene(LogicScene.MainScene);
    }

    @Event(NetMessage.Register)
    private registerResponse() {
        this.viewCtrl.view.afterRegister();
        this.sendMessage(UILoginMainMsg.OnBtnLoginClick);
    }
}