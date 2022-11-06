import { BaseViewCtrl } from "../../core/BaseViewCtrl";
import { UISphereToolMsg, UISphereToolView } from "../../view/PkgMain/UISphereToolView";

export interface UISphereToolData {

}

export class UISphereToolCtrl extends BaseViewCtrl<UISphereToolView, UISphereToolData>{

    override onAwake(): void {
		this.addMessageListener(UISphereToolMsg.OnBtnBgClick, this.onBtnBgClick);
		this.addMessageListener(UISphereToolMsg.OnBtnClearLogClick, this.onBtnClearLogClick);
		this.addMessageListener(UISphereToolMsg.OnBtnHFJLClick, this.onBtnHFJLClick);
		this.addMessageListener(UISphereToolMsg.OnBtnCreateClick, this.onBtnCreateClick);
		this.addMessageListener(UISphereToolMsg.OnBtnClearClick, this.onBtnClearClick);
		this.addMessageListener(UISphereToolMsg.OnBtnPercentClick, this.onBtnPercentClick);
		this.addMessageListener(UISphereToolMsg.OnBtnCheck0Click, this.onBtnCheck0Click);
		this.addMessageListener(UISphereToolMsg.OnBtnCheck1Click, this.onBtnCheck1Click);
		this.addMessageListener(UISphereToolMsg.OnBtnCheck2Click, this.onBtnCheck2Click);
		this.addMessageListener(UISphereToolMsg.OnBtnCheck3Click, this.onBtnCheck3Click);
		this.addMessageListener(UISphereToolMsg.OnBtnCheck4Click, this.onBtnCheck4Click);
		this.addMessageListener(UISphereToolMsg.OnBtnCheck5Click, this.onBtnCheck5Click);
		this.addMessageListener(UISphereToolMsg.OnBtnCheck6Click, this.onBtnCheck6Click);
		this.addMessageListener(UISphereToolMsg.OnBtnCheck7Click, this.onBtnCheck7Click);
		this.addMessageListener(UISphereToolMsg.OnBtnCheck8Click, this.onBtnCheck8Click);
		this.addMessageListener(UISphereToolMsg.OnBtnCheck9Click, this.onBtnCheck9Click);
		this.addMessageListener(UISphereToolMsg.OnBtnCheck10Click, this.onBtnCheck10Click);
		this.addMessageListener(UISphereToolMsg.OnBtnCheck11Click, this.onBtnCheck11Click);
		this.addMessageListener(UISphereToolMsg.OnBtnCheck12Click, this.onBtnCheck12Click);
		this.addMessageListener(UISphereToolMsg.OnBtnCheck13Click, this.onBtnCheck13Click);
		this.addMessageListener(UISphereToolMsg.OnBtnCheck14Click, this.onBtnCheck14Click);
		this.addMessageListener(UISphereToolMsg.OnBtnCheck15Click, this.onBtnCheck15Click);
		this.addMessageListener(UISphereToolMsg.OnBtnCheck16Click, this.onBtnCheck16Click);
		this.addMessageListener(UISphereToolMsg.OnBtnCheck17Click, this.onBtnCheck17Click);
		this.addMessageListener(UISphereToolMsg.OnBtnCheck18Click, this.onBtnCheck18Click);
		this.addMessageListener(UISphereToolMsg.OnBtnCheck19Click, this.onBtnCheck19Click);
		this.addMessageListener(UISphereToolMsg.OnBtnCheck20Click, this.onBtnCheck20Click);
		this.addMessageListener(UISphereToolMsg.OnBtnCheck21Click, this.onBtnCheck21Click);
		this.addMessageListener(UISphereToolMsg.OnBtnCheck22Click, this.onBtnCheck22Click);
		this.addMessageListener(UISphereToolMsg.OnBtnCheck23Click, this.onBtnCheck23Click);
		this.addMessageListener(UISphereToolMsg.OnBtnCheck24Click, this.onBtnCheck24Click);
		this.addMessageListener(UISphereToolMsg.OnBtnCheck25Click, this.onBtnCheck25Click);
		this.addMessageListener(UISphereToolMsg.OnBtnCheck26Click, this.onBtnCheck26Click);
		this.addMessageListener(UISphereToolMsg.OnBtnCheck27Click, this.onBtnCheck27Click);
		this.addMessageListener(UISphereToolMsg.OnBtnCheck28Click, this.onBtnCheck28Click);
		this.addMessageListener(UISphereToolMsg.OnBtnCheck31Click, this.onBtnCheck31Click);
		this.addMessageListener(UISphereToolMsg.OnBtnCheck32Click, this.onBtnCheck32Click);
		this.addMessageListener(UISphereToolMsg.OnBtnAddClick, this.onBtnAddClick);
		this.addMessageListener(UISphereToolMsg.OnBtnSubmitClick, this.onBtnSubmitClick);
		this.addMessageListener(UISphereToolMsg.OnBtnRemoveClick, this.onBtnRemoveClick);
		this.addMessageListener(UISphereToolMsg.OnBtnRemoveAllClick, this.onBtnRemoveAllClick);
    }

    override onEnable(): void {
        
    }

    override onDisable(): void {
        
    }

    override onDestroy(): void {
        
    }

	private onBtnBgClick(): void {
	
	}

	private onBtnClearLogClick(): void {
	
	}

	private onBtnHFJLClick(): void {
	
	}

	private onBtnCreateClick(): void {
	
	}

	private onBtnClearClick(): void {
	
	}

	private onBtnPercentClick(): void {
	
	}

	private onBtnCheck0Click(): void {
	
	}

	private onBtnCheck1Click(): void {
	
	}

	private onBtnCheck2Click(): void {
	
	}

	private onBtnCheck3Click(): void {
	
	}

	private onBtnCheck4Click(): void {
	
	}

	private onBtnCheck5Click(): void {
	
	}

	private onBtnCheck6Click(): void {
	
	}

	private onBtnCheck7Click(): void {
	
	}

	private onBtnCheck8Click(): void {
	
	}

	private onBtnCheck9Click(): void {
	
	}

	private onBtnCheck10Click(): void {
	
	}

	private onBtnCheck11Click(): void {
	
	}

	private onBtnCheck12Click(): void {
	
	}

	private onBtnCheck13Click(): void {
	
	}

	private onBtnCheck14Click(): void {
	
	}

	private onBtnCheck15Click(): void {
	
	}

	private onBtnCheck16Click(): void {
	
	}

	private onBtnCheck17Click(): void {
	
	}

	private onBtnCheck18Click(): void {
	
	}

	private onBtnCheck19Click(): void {
	
	}

	private onBtnCheck20Click(): void {
	
	}

	private onBtnCheck21Click(): void {
	
	}

	private onBtnCheck22Click(): void {
	
	}

	private onBtnCheck23Click(): void {
	
	}

	private onBtnCheck24Click(): void {
	
	}

	private onBtnCheck25Click(): void {
	
	}

	private onBtnCheck26Click(): void {
	
	}

	private onBtnCheck27Click(): void {
	
	}

	private onBtnCheck28Click(): void {
	
	}

	private onBtnCheck31Click(): void {
	
	}

	private onBtnCheck32Click(): void {
	
	}

	private onBtnAddClick(): void {
	
	}

	private onBtnSubmitClick(): void {
	
	}

	private onBtnRemoveClick(): void {
	
	}

	private onBtnRemoveAllClick(): void {
	
	}

}