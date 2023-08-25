import { ResPath } from "../../../common/ResPath";
import { ExtensionClass } from "../../../libs/utils/Util";
import { ViewExtension } from "../../core/Interfaces";
import UILoading2 from "../../ui/PkgCommon/UILoading2";

export const enum UILoading2Msg {

}

export class UILoading2View extends ExtensionClass<ViewExtension, UILoading2>(UILoading2) {
    static readonly PkgRes = ResPath.PkgPath.PkgCommon;

    override onCreate(): void {

    }

}
