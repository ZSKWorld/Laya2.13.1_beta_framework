import UIWaiting from "../../../ui/PkgCommon/UIWaiting";

export const enum UIWaitingMsg {

}

export class UIWaitingView extends ExtensionClass<IView, UIWaiting>(UIWaiting) {
    static readonly pkgRes = ResPath.PkgPath.PkgCommon;
    override readonly layer = Layer.Alert;

    override onCreate() {

    }

    refreshText(text: string) {
        this.txt_info.text = text;
    }

}
