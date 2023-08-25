import BtnCheck from "../../../../ui/PkgMain/BtnCheck";
import { ResPath } from "../../../../../common/ResPath";

export const enum BtnCheckMsg {

}

export class BtnCheckView extends ExtensionClass<IView, BtnCheck>(BtnCheck) {
    static readonly PkgRes = ResPath.PkgPath.PkgMain;

	override onCreate() {
        
    }

}
