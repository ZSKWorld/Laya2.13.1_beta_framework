import RenderBag from "../../../../ui/PkgMain/RenderBag";
import { ResPath } from "../../../../../common/ResPath";

export const enum RenderBagMsg {

}

export class RenderBagView extends ExtensionClass<IView, RenderBag>(RenderBag) {
    static readonly PkgRes = ResPath.PkgPath.PkgMain;

	override onCreate() {
        
    }

}
