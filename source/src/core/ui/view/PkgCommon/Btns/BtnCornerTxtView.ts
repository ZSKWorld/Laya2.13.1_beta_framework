import { ExtensionClass } from "../../../../libs/utils/Util";
import { ViewExtension } from "../../../core/Interfaces";
import BtnCornerTxt from "../../../ui/PkgCommon/BtnCornerTxt";
import { ResPath } from "../../../../common/ResPath";

export const enum BtnCornerTxtMsg {

}

export class BtnCornerTxtView extends ExtensionClass<ViewExtension, BtnCornerTxt>(BtnCornerTxt) {
    static readonly PkgRes = ResPath.PkgPath.PkgCommon;

	override onCreate(): void {
        
    }

}
