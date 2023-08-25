import UIWaiting from "../../../ui/PkgCommon/UIWaiting";
import { ResPath } from "../../../../common/ResPath";

export const enum UIWaitingMsg {

}

export class UIWaitingView extends ExtensionClass<IView, UIWaiting>(UIWaiting) {
    static readonly PkgRes = ResPath.PkgPath.PkgCommon;

	override onCreate() {
        
    }

}
