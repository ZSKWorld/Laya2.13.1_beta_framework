import { BaseViewCtrl } from "../../core/BaseViewCtrl";
import { UILoading1View } from "../../view/PkgCommon/UILoading1View";

export interface UILoading1Data {
    updateHandler: Laya.Handler;
}

export class UILoading1Ctrl extends BaseViewCtrl<UILoading1View, UILoading1Data>{
    private _progressHandler: Laya.Handler;

    override onAwake(): void {
        if (!this._progressHandler) {
            this._progressHandler = Laya.Handler.create(this, this.onProgress, null, false);
        }
        this.data.updateHandler = this._progressHandler;
    }

    override onEnable(): void {

    }

    override onDisable(): void {

    }

    override onDestroy(): void {

    }

    private onProgress(progress: number) {
        this.view.ProLoad.value = progress * 100;
    }

}