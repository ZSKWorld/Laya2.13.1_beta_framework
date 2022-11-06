import { BaseViewCtrl } from "../../core/BaseViewCtrl";
import { UIChooseBattleMsg, UIChooseBattleView } from "../../view/PkgBattle/UIChooseBattleView";

export interface UIChooseBattleData {

}

export class UIChooseBattleCtrl extends BaseViewCtrl<UIChooseBattleView, UIChooseBattleData>{

    override onAwake(): void {
		this.addMessageListener(UIChooseBattleMsg.OnBtnBackClick, this.onBtnBackClick);
		this.addMessageListener(UIChooseBattleMsg.OnBtnConfirmBgClick, this.onBtnConfirmBgClick);
		this.addMessageListener(UIChooseBattleMsg.OnBtnBuyFoodClick, this.onBtnBuyFoodClick);
		this.addMessageListener(UIChooseBattleMsg.OnBtnBuyTimesClick, this.onBtnBuyTimesClick);
		this.addMessageListener(UIChooseBattleMsg.OnBtnSaoDangClick, this.onBtnSaoDangClick);
		this.addMessageListener(UIChooseBattleMsg.OnBtnBattleClick, this.onBtnBattleClick);
    }

    override onEnable(): void {
        
    }

    override onDisable(): void {
        
    }

    override onDestroy(): void {
        
    }

	private onBtnBackClick(): void {
	
	}

	private onBtnConfirmBgClick(): void {
	
	}

	private onBtnBuyFoodClick(): void {
	
	}

	private onBtnBuyTimesClick(): void {
	
	}

	private onBtnSaoDangClick(): void {
	
	}

	private onBtnBattleClick(): void {
	
	}

}