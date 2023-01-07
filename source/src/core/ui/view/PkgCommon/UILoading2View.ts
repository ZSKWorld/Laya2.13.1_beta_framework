import { ExtensionClass } from "../../../libs/utils/Util";
import { ViewExtension } from "../../core/Interfaces";
import UILoading2 from "../../ui/PkgCommon/UILoading2";
import { ResPath } from "../../../common/ResPath";

export const enum UILoading2Msg {

}

export class UILoading2View extends ExtensionClass<ViewExtension, UILoading2>(UILoading2) {
    static readonly PkgRes = ResPath.UIPath.PkgCommon;

	override onCreate(): void {
        
    }

}
