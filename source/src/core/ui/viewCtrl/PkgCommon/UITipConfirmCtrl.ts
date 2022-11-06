import { Logger } from "../../../libs/utils/Logger";
import { BaseViewCtrl } from "../../core/BaseViewCtrl";
import { UITipConfirmMsg, UITipConfirmView } from "../../view/PkgCommon/UITipConfirmView";

export interface UITipConfirmData {
    text: string;
    title?: string;
    callback?: Laya.Handler;
}

const logger = Logger.Create("UITipConfirmCtrl", true);

export class UITipConfirmCtrl extends BaseViewCtrl<UITipConfirmView, UITipConfirmData>{
    private _confirmDatas: UITipConfirmData[] = [];
    private _curConfirm: UITipConfirmData;

    override onAwake(): void {
        this.addMessageListener(UITipConfirmMsg.OnBtnBgClick, this.onBtnCloseClick, [ false ]);
        this.addMessageListener(UITipConfirmMsg.OnBtnConfirmClick, this.onBtnCloseClick, [ true ]);
    }

    override onEnable(): void {
        this.view.playAni();
    }

    override onForeground(): void {
        if (this._curConfirm) this._confirmDatas.unshift(this._curConfirm);
        this._confirmDatas.unshift(this.data);
        this.data = null;
        this.showConfirm();
    }

    override onDisable(): void {
        this._curConfirm = null;
        this._confirmDatas.length = 0;
    }

    private showConfirm() {
        this._curConfirm = this._confirmDatas.shift();
        if (this._curConfirm) this.view.setContent(this._curConfirm.text, this._curConfirm.title);
        else this.view.playAni(true).then(() => this.removeSelf());
    }

    private onBtnCloseClick(result: boolean) {
        result && this._curConfirm.callback?.run();
        this.showConfirm();
    }
}