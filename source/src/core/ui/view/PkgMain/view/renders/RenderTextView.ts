import RenderText from "../../../../ui/PkgMain/RenderText";
import { ResPath } from "../../../../../common/ResPath";

export const enum RenderTextMsg {

}

export class RenderTextView extends ExtensionClass<IView, RenderText>(RenderText) {
    static readonly PkgRes = ResPath.PkgPath.PkgMain;

	override onCreate() {
        
    }

}
