import UIConfirm from "../../../ui/PkgCommon/UIConfirm";

export const enum UIConfirmMsg {

}

export class UIConfirmView extends ExtensionClass<IView, UIConfirm>(UIConfirm) {
    static readonly pkgRes = ResPath.PkgPath.PkgCommon;

    override onCreate() {

    }

}
