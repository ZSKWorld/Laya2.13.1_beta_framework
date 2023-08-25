import ComChar from "../../../../ui/PkgMain/ComChar";
import { ResPath } from "../../../../../common/ResPath";

export const enum ComCharMsg {

}

export class ComCharView extends ExtensionClass<IView, ComChar>(ComChar) {
    static readonly PkgRes = ResPath.PkgPath.PkgMain;

	override onCreate() {
        
    }

}
