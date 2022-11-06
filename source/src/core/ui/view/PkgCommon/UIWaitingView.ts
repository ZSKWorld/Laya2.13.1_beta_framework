import { ResPath } from "../../../common/ResPath";
import { ExtensionClass } from "../../../libs/utils/Util";
import { ViewExtension } from "../../core/Interfaces";
import UIWaiting from "../../ui/PkgCommon/UIWaiting";

export const enum UIWaitingMsg {

}

export class UIWaitingView extends ExtensionClass<ViewExtension, UIWaiting>(UIWaiting) {
    static readonly PkgRes = ResPath.UIPath.PkgCommon;
    static readonly DontDestroy = true;

    override onCreate(): void {

    }

    refreshText(text: string) {
        this.TxtInfo.text = text;
    }

}
