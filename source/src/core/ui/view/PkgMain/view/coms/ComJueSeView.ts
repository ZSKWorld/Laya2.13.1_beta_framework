import ComJueSe from "../../../../ui/PkgMain/ComJueSe";
import { ResPath } from "../../../../../common/ResPath";

export const enum ComJueSeMsg {

}

export class ComJueSeView extends ExtensionClass<IView, ComJueSe>(ComJueSe) {
    static readonly PkgRes = ResPath.PkgPath.PkgMain;

	override onCreate() {
        
    }

}
