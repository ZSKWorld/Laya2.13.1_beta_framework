import { BaseViewCtrl } from "../../../../core/BaseViewCtrl";
import { ComNumInputMsg, ComNumInputView } from "../../view/coms/ComNumInputView";

export interface ComNumInputData {

}

export class ComNumInputCtrl extends BaseViewCtrl<ComNumInputView, ComNumInputData>{

    override onAdded() {
		this.addMessage(ComNumInputMsg.OnBtnSubmitClick, this.onBtnSubmitClick);
    }

	private onBtnSubmitClick() {
	
	}

}