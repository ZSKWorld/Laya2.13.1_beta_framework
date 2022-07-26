import { BaseViewCtrl } from "../../core/BaseViewCtrl";
import { UIPlayerInfoMsg, UIPlayerInfoView } from "../../view/PkgMain/UIPlayerInfoView";

export interface UIPlayerInfoData {

}

export class UIPlayerInfoCtrl extends BaseViewCtrl<UIPlayerInfoView, UIPlayerInfoData>{

    onAwake(): void {
        super.onAwake();
        this.addMessageListener(UIPlayerInfoMsg.OnBtnExplainClick, this.UIPlayerInfo_OnBtnExplainClick);
        this.addMessageListener(UIPlayerInfoMsg.OnBtnCopyIDClick, this.UIPlayerInfo_OnBtnCopyIDClick);
        this.addMessageListener(UIPlayerInfoMsg.OnBtnGiftClick, this.UIPlayerInfo_OnBtnGiftClick);
    }

    onEnable(): void {
        super.onEnable();
    }

    private UIPlayerInfo_OnBtnExplainClick(): void {

    }

    private UIPlayerInfo_OnBtnCopyIDClick(): void {

    }

    private UIPlayerInfo_OnBtnGiftClick(): void {

    }

    onDisable(): void {
        super.onDisable();
    }

    onDestroy(): void {
        super.onDestroy();
    }
}