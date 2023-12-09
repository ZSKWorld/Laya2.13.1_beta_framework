import { MathUtil } from "../../../../libs/math/MathUtil";
import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { UILoading1View } from "../view/UILoading1View";

export interface UILoading1Data {
    updateHandler: Laya.Handler;
}

type Loading1Type = IView & Partial<UILoading1View>;

export class UILoading1Ctrl<V extends Loading1Type = UILoading1View, D extends UILoading1Data = UILoading1Data> extends BaseViewCtrl<V, D>{
    private _tips = [];
    private _progressHandler: Laya.Handler;

    protected deltaTime = 2000;
    protected curTime = 0;

    override onAwake() {
    }

    override onEnable() {
        this.curTime = this.deltaTime;
        if (!this._progressHandler) {
            this._progressHandler = Laya.Handler.create(this, this.onProgress, null, false);
        }
        this.data.updateHandler = this._progressHandler;
    }

    override onUpdate() {
        this.curTime += Laya.timer.delta;
        if (this.curTime >= this.deltaTime) {
            this.curTime = 0;
            if (this._tips.length)
                this.view.txt_tip.text = this._tips[MathUtil.RandomInt(0, this._tips.length - 1)];
        }
    }

    override onDisable() {

    }

    override onDestroy() {

    }

    private onProgress(progress: number) {
        this.view.pro_loading.value = progress * 100;
    }

}