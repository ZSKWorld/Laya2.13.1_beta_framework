import UISetting from "../../../ui/PkgMain/UISetting";

export const enum UISettingMsg {
}

export class UISettingView extends ExtensionClass<IView, UISetting>(UISetting) {
    static readonly pkgRes = ResPath.PkgPath.PkgMain;

}
