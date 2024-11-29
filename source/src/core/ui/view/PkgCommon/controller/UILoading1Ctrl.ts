import { SceneEvent } from "../../../../../scene/SceneDefine";
import { MathUtil } from "../../../../game/math/MathUtil";
import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { UILoading1View } from "../view/UILoading1View";

export class UILoading1Ctrl<V extends IView & Partial<UILoading1View> = UILoading1View> extends BaseViewCtrl<V, null> {
    private _tips = [];
    protected curTime = 0;
    protected deltaTime = 2000;

    override onEnable() {
        this.curTime = this.deltaTime;
    }

    override onUpdate() {
        this.curTime += Laya.timer.delta;
        if (this.curTime >= this.deltaTime) {
            this.curTime = 0;
            if (this._tips.length)
                this.view.txt_tip.text = this._tips[MathUtil.randomInt(0, this._tips.length - 1)];
        }
    }

    override onDisable() {

    }

    override onDestroy() {

    }

    @RegisterEvent(SceneEvent.OnLoadProgress)
    private onProgress(progress: number) {
        this.view.pro_loading.value = progress * 100;
    }

}