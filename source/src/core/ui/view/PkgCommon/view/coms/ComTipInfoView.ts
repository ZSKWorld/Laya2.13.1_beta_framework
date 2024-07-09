import ComTipInfo from "../../../../ui/PkgCommon/ComTipInfo";

export const enum ComTipInfoMsg {

}

export class ComTipInfoView extends ExtensionClass<IView, ComTipInfo>(ComTipInfo) {
    static readonly PkgRes = ResPath.PkgPath.PkgCommon;

    setAlpha(alpha: number) {
        this.alpha = alpha;
    }

    setContent(text: string, color = "#ffffff") {
        this.txt_title.text = text;
        this.txt_title.color = color;
    }

}
