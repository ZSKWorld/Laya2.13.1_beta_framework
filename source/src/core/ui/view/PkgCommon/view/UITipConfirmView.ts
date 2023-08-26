import { ResPath } from "../../../../common/ResPath";
import UITipConfirm from "../../../ui/PkgCommon/UITipConfirm";

export const enum UITipConfirmMsg {
    OnGraphBgClick = "UITipConfirm_OnGraphBgClick",
    OnBtnConfirmClick = "UITipConfirm_OnBtnConfirmClick",
}

export class UITipConfirmView extends ExtensionClass<IView, UITipConfirm>(UITipConfirm) {
    static readonly PkgRes = ResPath.PkgPath.PkgCommon;

    override onCreate() {
        const { graph_bg, btn_confirm } = this;
        graph_bg.onClick(this, this.sendMessage, [ UITipConfirmMsg.OnGraphBgClick ]);
        btn_confirm.onClick(this, this.sendMessage, [ UITipConfirmMsg.OnBtnConfirmClick ]);
    }

    refreshContent(text: string, title: string) {
        this.txt_content.text = text;
        this.txt_title.text = title || "提示";
    }
}
