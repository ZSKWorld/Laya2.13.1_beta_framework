import { NetMessage } from "../../../../net/enum/NetMessage";
import { BaseProxy } from "../../../core/BaseProxy";
import { UISettingCtrl } from "../controller/UISettingCtrl";

export class UISettingProxy extends BaseProxy<UISettingCtrl> {
    @RegisterEvent(NetMessage.ClearAccount)
    private clearAccount(output: IClearAccountOutput, input: IClearAccountInput) {
        this.viewCtrl.removeSelf();
    }

    @RegisterEvent(NetMessage.ClearAccountError)
    private clearAccountError(output: IClearAccountOutput, input: IClearAccountInput) {

    }
}