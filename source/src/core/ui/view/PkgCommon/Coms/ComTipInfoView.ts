import { ResPath } from "../../../../common/ResPath";
import ComTipInfo from "../../../ui/PkgCommon/ComTipInfo";

export const enum ComTipInfoMsg {

}

export class ComTipInfoView extends ExtensionClass<IView, ComTipInfo>(ComTipInfo) {
    static readonly PkgRes = ResPath.PkgPath.PkgCommon;

    override onCreate(): void {

    }
    setAlpha(alpha: number) {
        this.alpha = alpha;
    }
    setContent(text: string, color = "#ffffff") {
        this.title.text = text;
        this.title.color = color;
    }

}
