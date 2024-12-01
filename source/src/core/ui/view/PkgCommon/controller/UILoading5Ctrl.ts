import { UILoading5View } from "../view/UILoading5View";
import { UILoading1Ctrl } from "./UILoading1Ctrl";

export interface UILoading5Data {

}

export class UILoading5Ctrl extends UILoading1Ctrl<UILoading5View> {

    protected override onProgress(progress: number) {
        this.view.img_mask.width = (1 - progress) * 936;
    }

}