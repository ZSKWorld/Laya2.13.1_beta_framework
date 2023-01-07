import { LogicScene } from "../../../../logicScene/LogicSceneType";
import { GameEvent } from "../../../common/GameEvent";
import { Event } from "../../../libs/event/EventMgr";
import { localData } from "../../../libs/localData/LocalData";
import { LocalDataKey } from "../../../libs/localData/LocalDataKey";
import { NetResponse } from "../../../net/NetResponse";
import { BaseProxy } from "../../core/BaseProxy";
import { UILoginMainMsg } from "../../view/PkgLogin/UILoginMainView";
import { UILoginMainCtrl } from "../../viewCtrl/PkgLogin/UILoginMainCtrl";

export class UILoginMainProxy extends BaseProxy<UILoginMainCtrl>{

    @Event(NetResponse.Response_Login)
    private loginResponse() {
        const { TxtAccount, TxtPassword } = this.viewCtrl.view;
        const param = { account: TxtAccount.text, password: TxtPassword.text };
        localData.set(LocalDataKey.LastLoginAccount, param);
        this.dispatch(GameEvent.EnterScene, LogicScene.MainScene);
    }

    @Event(NetResponse.Response_Register)
    private registerResponse() {
        this.viewCtrl.view.afterRegister();
        this.sendMessage(UILoginMainMsg.OnBtnLoginClick);
    }
}