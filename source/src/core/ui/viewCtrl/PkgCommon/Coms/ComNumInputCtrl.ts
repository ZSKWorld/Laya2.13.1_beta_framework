import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { ComNumInputMsg, ComNumInputView } from "../../../view/PkgCommon/Coms/ComNumInputView";

export interface ComNumInputData {
	title: string;
	min: number;
	max: number;
	callback?: Laya.Handler;
}

export class ComNumInputCtrl extends BaseViewCtrl<ComNumInputView, ComNumInputData>{

	override onAwake(): void {
		this.addMessageListener(ComNumInputMsg.OnBtnBgClick, this.onBtnBgClick);
		this.addMessageListener(ComNumInputMsg.OnBtnSubmitClick, this.onBtnSubmitClick);
	}

	override onEnable(): void {
		const { title, min, max } = this.data;
		this.view.refresh(title, min, max);
	}

	override onDisable(): void {
        this.doCallback(null);
	}

	override onDestroy(): void {

	}

	private onBtnBgClick(): void {
		this.doCallback(null);
		this.removeSelf();
	}

	private onBtnSubmitClick(): void {
        this.doCallback(this.view.Slider.value);
        this.removeSelf();
	}
    private doCallback(value: number) {
        this.data?.callback?.runWith(value);
        this.data = null;
    }

}