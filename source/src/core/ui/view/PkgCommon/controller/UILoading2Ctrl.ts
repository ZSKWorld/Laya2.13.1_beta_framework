import { UILoading2View } from "../view/UILoading2View";
import { UILoading1Ctrl } from "./UILoading1Ctrl";

export interface UILoading2Data {
    updateHandler: Laya.Handler;
}

export class UILoading2Ctrl extends UILoading1Ctrl<UILoading2View, UILoading2Data>{

}