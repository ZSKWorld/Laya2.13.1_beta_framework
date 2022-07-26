import { BaseViewCtrl } from "../../core/BaseViewCtrl";
import { UIPoolKey } from "../../tool/UIPoolKey";
import { UITipConfirmMsg, UITipConfirmView } from "../../view/PkgCommon/UITipConfirmView";

export interface UITipConfirmData {
    text: string;
    title?: string;
    callback?: Function;
}

export class UITipConfirmCtrl extends BaseViewCtrl<UITipConfirmView, UITipConfirmData>{

    onAwake(): void {
        super.onAwake();
        this.addMessageListener(UITipConfirmMsg.OnBtnBgClick, this.onBtnCloseClick, [false]);
        this.addMessageListener(UITipConfirmMsg.OnBtnConfirmClick, this.onBtnCloseClick, [true]);
    }

    onEnable(): void {
        super.onEnable();
        this.view.setContent(this.data.text, this.data.title);
        this.view.playAni();
    }

    private onBtnCloseClick(result: boolean, e: Laya.Event) {
        this.doCallback(result);
        this.view.playAni(true).then(() => this.view.removeFromParent());
    }
    private doCallback(result: boolean) {
        this.data?.callback?.(result);
        this.data = null;
    }

    onDisable(): void {
        super.onDisable();
        this.doCallback(false);
        Laya.Pool.recover(UIPoolKey.TipConfirm, this.view);
    }

    onDestroy(): void {
        super.onDestroy();
    }
}