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
		this.addMessageListener(ComNumInputMsg.OnBtnBattleClick, this.onBtnBattleClick);
    }

    override onEnable(): void {
        
    }

    override onDisable(): void {
        
    }

    override onDestroy(): void {
        
    }

	private onBtnBgClick(): void {
	
	}

	private onBtnBattleClick(): void {
	
	}

}