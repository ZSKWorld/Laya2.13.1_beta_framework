import UISetting from "../../../ui/PkgMain/UISetting";
import { ResPath } from "../../../../common/ResPath";

export const enum UISettingMsg {
}

export class UISettingView extends ExtensionClass<IView, UISetting>(UISetting) {
    static readonly PkgRes = ResPath.PkgPath.PkgMain;

	override onCreate() {
    }

}
