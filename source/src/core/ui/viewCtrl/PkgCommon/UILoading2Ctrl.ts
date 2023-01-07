import { BaseViewCtrl } from "../../core/BaseViewCtrl";
import { UILoading2Msg, UILoading2View } from "../../view/PkgCommon/UILoading2View";

export interface UILoading2Data {
    updateHandler: Laya.Handler;
}

export class UILoading2Ctrl extends BaseViewCtrl<UILoading2View, UILoading2Data>{
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