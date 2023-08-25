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
        this.addMessage(UITipConfirmMsg.OnBtnBgClick, this.onBtnCloseClick, [ false ]);
        this.addMessage(UITipConfirmMsg.OnBtnConfirmClick, this.onBtnCloseClick, [ true ]);
    }

    override onEnable(): void {

    }

    override onForeground(): void {
        if (this._curConfirm) this._confirmDatas.unshift(this._curConfirm);
        this._confirmDatas.unshift(this.data);
        this.data = null;
        this.refreshContent();
    }

    override onDisable(): void {
        this._curConfirm = null;
        this._confirmDatas.length = 0;
    }

	override onOpenAni(): Promise<void> {
		return new Promise<void>((resolve) => this.view.EffectShow.play(Laya.Handler.create(null, resolve)));
	}

	override onCloseAni(): Promise<void> {
		return new Promise<void>((resolve) => this.view.EffectShow.playReverse(Laya.Handler.create(null, resolve)));
	}

    private refreshContent() {
        this._curConfirm = this._confirmDatas.shift();
        if (this._curConfirm) this.view.setContent(this._curConfirm.text, this._curConfirm.title);
        else this.removeSelf();
    }

    private onBtnCloseClick(result: boolean) {
        result && this._curConfirm.callback?.run();
        this.refreshContent();
    }
}