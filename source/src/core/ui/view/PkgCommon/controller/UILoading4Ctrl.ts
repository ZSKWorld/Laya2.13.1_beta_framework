import { UILoading4View } from "../view/UILoading4View";
import { UILoading1Ctrl } from "./UILoading1Ctrl";

export interface UILoading4Data {

}

export class UILoading4Ctrl extends UILoading1Ctrl<UILoading4View> {
    private _blocks: fgui.GGraph[] = [];

    override onAwake() {
        for (let i = 0; i < 50; i++) {
            this._blocks.push(this.view.getChildAt(2 + i).asGraph);
        }
    }

    protected override onProgress(progress: number) {
        this.onProgress1(progress);
    }

    protected onProgress1(progress: number) {
        const pIndex = Math.floor(progress * 100 * 0.5);
        this._blocks.forEach((v, index) => {
            const oldVisible = v.visible;
            v.visible = pIndex >= (index + 1);
            if (v.visible && oldVisible != v.visible) {
                v.height = 0;
                Laya.Tween.to(v, { height: 50 }, 100, null, null, 0, true);
            }
        });
    }

    protected onProgress2(progress: number) {
        const pIndex = Math.floor(progress * 100 * 0.5);
        this._blocks.forEach((v, index) => {
            const oldVisible = v.visible;
            v.visible = pIndex >= (index + 1);
            if (v.visible && oldVisible != v.visible) {
                v.x = 1025;
                v.alpha = 0;
                Laya.Tween.to(v, { x: 65 + 20 * index, alpha: 1 }, 100, null, null, 0, true);
            }
        });
    }

}