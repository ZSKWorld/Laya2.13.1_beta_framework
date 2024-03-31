import { NetCMD } from "../../../../net/enum/NetCMD";
import { BaseProxy } from "../../../core/BaseProxy";
import { UISettingCtrl } from "../controller/UISettingCtrl";

export class UISettingProxy extends BaseProxy<UISettingCtrl> {
    @RegisterEvent(NetCMD.ClearAccount)
    private clearAccount(output: IClearAccountOutput, input: IClearAccountInput) {
        this.viewCtrl.removeSelf();
    }

    @RegisterEvent(NetCMD.ClearAccountError)
    private clearAccountError(output: IClearAccountOutput, input: IClearAccountInput) {

    }
}