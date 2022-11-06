import { ResPath } from "../../../../common/ResPath";
import { ExtensionClass } from "../../../../libs/utils/Util";
import { ViewExtension } from "../../../core/Interfaces";
import ComTipInfo from "../../../ui/PkgCommon/ComTipInfo";

export const enum ComTipInfoMsg {

}

export class ComTipInfoView extends ExtensionClass<ViewExtension, ComTipInfo>(ComTipInfo) {
    static readonly PkgRes = ResPath.UIPath.PkgCommon;

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
