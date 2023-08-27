import { ResPath } from "../../../../common/ResPath";
import UIChooseNum from "../../../ui/PkgCommon/UIChooseNum";

export const enum UIChooseNumMsg {
    OnGraphBgClick = "UIChooseNum_OnGraphBgClick",
    OnBtnSubmitClick = "UIChooseNum_OnBtnSubmitClick",
}

export class UIChooseNumView extends ExtensionClass<IView, UIChooseNum>(UIChooseNum) {
    static readonly PkgRes = ResPath.PkgPath.PkgCommon;

    override onCreate() {
        const { graph_bg, btn_submit } = this;
        graph_bg.onClick(this, this.sendMessage, [ UIChooseNumMsg.OnGraphBgClick ]);
        btn_submit.onClick(this, this.sendMessage, [ UIChooseNumMsg.OnBtnSubmitClick ]);
    }

    refresh(title: string, min: number, max: number) {
        this.txt_title.text = title;
        this.slider_num.min = min;
        this.slider_num.max = max;
    }

}
