import { MathUtil } from "../../../libs/math/MathUtil";
import { BaseViewCtrl } from "../../core/BaseViewCtrl";
import { IView } from "../../core/Interfaces";
import { UILoading1View } from "../../view/PkgCommon/UILoading1View";

export interface UILoading1Data {
    updateHandler: Laya.Handler;
}

type Loading1Type = IView & Partial<UILoading1View>;

export class UILoading1Ctrl<V extends Loading1Type, D extends UILoading1Data> extends BaseViewCtrl<V, D>{
    private _tips = [
        "123",
        "456",
        "789",
        "0abc",
    ];
    private _progressHandler: Laya.Handler;

    protected deltaTime = 2000;
    protected curTime = 0;

    override onAwake(): void {
        if (!this._progressHandler) {
            this._progressHandler = Laya.Handler.create(this, this.onProgress, null, false);
        }
        this.data.updateHandler = this._progressHandler;
    }

    override onEnable(): void {
        this.curTime = this.deltaTime;
    }

    override onUpdate(): void {
        this.curTime += Laya.timer.delta;
        if (this.curTime >= this.deltaTime) {
            this.curTime = 0;
            this.view.TxtTip.text = this._tips[ MathUtil.RandomInt(0, this._tips.length - 1) ];
        }
    }

    override onDisable(): void {

    }

    override onDestroy(): void {

    }

    private onProgress(progress: number) {
        this.view.ProLoad.value = progress * 100;
    }

}