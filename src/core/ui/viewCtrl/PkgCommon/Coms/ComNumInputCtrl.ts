import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { UIPoolKey } from "../../../tool/UIPoolKey";
import { ComNumInputMsg, ComNumInputView } from "../../../view/PkgCommon/Coms/ComNumInputView";

export interface ComNumInputData {
    title: string;
    min: number;
    max: number;
    callback: Function;
}

export class ComNumInputCtrl extends BaseViewCtrl<ComNumInputView, ComNumInputData>{

    onAwake(): void {
        super.onAwake();
        this.addMessageListener(ComNumInputMsg.OnBtnBgClick, this.ComNumInput_OnBtnBgClick);
        this.addMessageListener(ComNumInputMsg.OnBtnBattleClick, this.ComNumInput_OnBtnBattleClick);
    }

    onEnable(): void {
        super.onEnable();
        const { title, min, max } = this.data;
        this.view.refresh(title, min, max);
    }

    private ComNumInput_OnBtnBgClick(): void {
        this.doCallback(null);
        this.view.removeFromParent();
    }

    private ComNumInput_OnBtnBattleClick(): void {
        this.doCallback(this.view.Slider.value);
        this.view.removeFromParent();
    }
    private doCallback(value: number) {
        this.data?.callback?.(value);
        this.data = null;
    }

    onDisable(): void {
        super.onDisable();
        this.doCallback(null);
        Laya.Pool.recover(UIPoolKey.NumInput, this.view);
    }

    onDestroy(): void {
        super.onDestroy();
    }
}