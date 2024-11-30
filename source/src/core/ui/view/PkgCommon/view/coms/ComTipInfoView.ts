import ComTipInfo from "../../../../ui/PkgCommon/ComTipInfo";

export const enum ComTipInfoMsg {

}

export class ComTipInfoView extends ExtensionClass<IView, ComTipInfo>(ComTipInfo) {
    static readonly pkgRes = ResPath.PkgPath.PkgCommon;

    override onCreate() {
        this.touchable = false;
    }

    setAlpha(alpha: number) {
        this.alpha = alpha;
    }

    setContent(text: string, color = "#ffffff") {
        this.txt_title.text = text;
        this.txt_title.color = color;
    }

}
