import UIConfirm from "../../../ui/PkgCommon/UIConfirm";
import { ResPath } from "../../../../common/ResPath";

export const enum UIConfirmMsg {

}

export class UIConfirmView extends ExtensionClass<IView, UIConfirm>(UIConfirm) {
    static readonly PkgRes = ResPath.PkgPath.PkgCommon;

	override onCreate() {

    }

}
