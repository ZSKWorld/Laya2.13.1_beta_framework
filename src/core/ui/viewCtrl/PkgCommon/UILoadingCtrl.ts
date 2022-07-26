import { BaseViewCtrl } from "../../core/BaseViewCtrl";
import { UILoadingMsg, UILoadingView } from "../../view/PkgCommon/UILoadingView";

export interface UILoadingData{

}

export class UILoadingCtrl extends BaseViewCtrl<UILoadingView, UILoadingData>{

    onAwake(): void {
        super.onAwake();

    }

    onEnable(): void {
        super.onEnable();
    }


    onDisable(): void {
        super.onDisable();
    }

    onDestroy(): void {
        super.onDestroy();
    }
}