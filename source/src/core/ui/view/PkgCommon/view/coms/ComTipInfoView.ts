import ComTipInfo from "../../../../ui/PkgCommon/ComTipInfo";
import { ResPath } from "../../../../../common/ResPath";

export const enum ComTipInfoMsg {

}

export class ComTipInfoView extends ExtensionClass<IView, ComTipInfo>(ComTipInfo) {
    static readonly PkgRes = ResPath.PkgPath.PkgCommon;

	override onCreate() {
        
    }

}
