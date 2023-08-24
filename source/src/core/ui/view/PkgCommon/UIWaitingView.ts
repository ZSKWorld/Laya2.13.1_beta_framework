import { ResPath } from "../../../common/ResPath";
import UIWaiting from "../../ui/PkgCommon/UIWaiting";

export const enum UIWaitingMsg {

}

export class UIWaitingView extends ExtensionClass<IView, UIWaiting>(UIWaiting) {
    static readonly PkgRes = ResPath.PkgPath.PkgCommon;

    override onCreate(): void {

    }

    refreshText(text: string) {
        this.TxtInfo.text = text;
    }

}
