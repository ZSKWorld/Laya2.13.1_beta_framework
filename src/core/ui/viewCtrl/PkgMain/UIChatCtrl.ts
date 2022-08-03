import { websocket } from "../../../net/WebSocket";
import { BaseViewCtrl } from "../../core/BaseViewCtrl";
import { UIUtility } from "../../tool/UIUtility";
import { UIChatMsg, UIChatView } from "../../view/PkgMain/UIChatView";

export interface UIChatData {

}

export class UIChatCtrl extends BaseViewCtrl<UIChatView, UIChatData>{

    onAwake(): void {
        super.onAwake();
        this.addMessageListener(UIChatMsg.OnBtnSendClick, this.UIChat_OnBtnSendClick);
        this.addMessageListener(UIChatMsg.OnBtnBackClick, this.removeTop);
    }

    onEnable(): void {
        super.onEnable();
    }

    private UIChat_OnBtnSendClick(): void {
        const text = this.view.InputMsg.text;
        if (!text) UIUtility.ShowTipInfo("不能发送空消息");
        websocket.sendMsg({ cmd: 111, data: text });
        this.view.InputMsg.text = "";
    }

    private UIChat_OnBtnBackClick(): void {

    }

    onDisable(): void {
        super.onDisable();
    }

    onDestroy(): void {
        super.onDestroy();
    }
}