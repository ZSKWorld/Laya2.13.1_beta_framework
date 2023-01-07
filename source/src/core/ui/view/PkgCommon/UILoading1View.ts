import { ExtensionClass } from "../../../libs/utils/Util";
import { ViewExtension } from "../../core/Interfaces";
import UILoading1 from "../../ui/PkgCommon/UILoading1";
import { ResPath } from "../../../common/ResPath";

export const enum UILoading1Msg {

}

export class UILoading1View extends ExtensionClass<ViewExtension, UILoading1>(UILoading1) {
    static readonly PkgRes = ResPath.UIPath.PkgCommon;

	override onCreate(): void {
        
    }

}
