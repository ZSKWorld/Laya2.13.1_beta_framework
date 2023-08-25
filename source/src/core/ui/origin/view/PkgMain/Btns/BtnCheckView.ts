import { ExtensionClass } from "../../../../libs/utils/Util";
import { ViewExtension } from "../../../core/Interfaces";
import BtnCheck from "../../../ui/PkgMain/BtnCheck";
import { ResPath } from "../../../../common/ResPath";

export const enum BtnCheckMsg {

}

export class BtnCheckView extends ExtensionClass<ViewExtension, BtnCheck>(BtnCheck) {
    static readonly PkgRes = ResPath.PkgPath.PkgMain;

	override onCreate(): void {
        
    }

}
