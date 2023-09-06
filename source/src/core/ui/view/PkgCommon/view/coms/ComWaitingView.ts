import ComWaiting from "../../../../ui/PkgCommon/ComWaiting";
import { ResPath } from "../../../../../common/ResPath";

export const enum ComWaitingMsg {

}

export class ComWaitingView extends ExtensionClass<IView, ComWaiting>(ComWaiting) {
    static readonly PkgRes = ResPath.PkgPath.PkgCommon;

	override onCreate() {
        
    }

}
