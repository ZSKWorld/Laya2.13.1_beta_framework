import BtnTxt from "../../../../ui/PkgCommon/BtnTxt";
import { ResPath } from "../../../../../common/ResPath";

export const enum BtnTxtMsg {

}

export class BtnTxtView extends ExtensionClass<IView, BtnTxt>(BtnTxt) {
    static readonly PkgRes = ResPath.PkgPath.PkgCommon;

	override onCreate() {
        
    }

}
