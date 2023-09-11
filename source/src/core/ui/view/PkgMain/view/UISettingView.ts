import { ResPath } from "../../../../common/ResPath";
import UISetting from "../../../ui/PkgMain/UISetting";

export const enum UISettingMsg {
}

export class UISettingView extends ExtensionClass<IView, UISetting>(UISetting) {
    static readonly PkgRes = ResPath.PkgPath.PkgMain;

    override onCreate() {

    }

}
