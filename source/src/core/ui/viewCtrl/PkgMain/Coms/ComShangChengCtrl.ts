import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { ComShangChengMsg, ComShangChengView } from "../../../view/PkgMain/Coms/ComShangChengView";

export interface ComShangChengData {

}

export class ComShangChengCtrl extends BaseViewCtrl<ComShangChengView, ComShangChengData>{

    override onAwake(): void {
		this.addMessageListener(ComShangChengMsg.OnBtnPropClick, this.onBtnPropClick);
		this.addMessageListener(ComShangChengMsg.OnBtnGemClick, this.onBtnGemClick);
		this.addMessageListener(ComShangChengMsg.OnBtnMaterialClick, this.onBtnMaterialClick);
		this.addMessageListener(ComShangChengMsg.OnBtnMiJiClick, this.onBtnMiJiClick);
		this.addMessageListener(ComShangChengMsg.OnBtnOtherClick, this.onBtnOtherClick);
		this.addMessageListener(ComShangChengMsg.OnBtnHeiShiClick, this.onBtnHeiShiClick);
		this.addMessageListener(ComShangChengMsg.OnBtnXianJieClick, this.onBtnXianJieClick);
		this.addMessageListener(ComShangChengMsg.OnBtnZBQHClick, this.onBtnZBQHClick);
		this.addMessageListener(ComShangChengMsg.OnBtnBSJGClick, this.onBtnBSJGClick);
		this.addMessageListener(ComShangChengMsg.OnBtnJSClick, this.onBtnJSClick);
		this.addMessageListener(ComShangChengMsg.OnBtnTSDJClick, this.onBtnTSDJClick);
		this.addMessageListener(ComShangChengMsg.OnBtnGemLv1Click, this.onBtnGemLv1Click);
		this.addMessageListener(ComShangChengMsg.OnBtnGemLv2Click, this.onBtnGemLv2Click);
		this.addMessageListener(ComShangChengMsg.OnBtnGemLv3Click, this.onBtnGemLv3Click);
		this.addMessageListener(ComShangChengMsg.OnBtnGemLv4Click, this.onBtnGemLv4Click);
		this.addMessageListener(ComShangChengMsg.OnBtnSGCLClick, this.onBtnSGCLClick);
		this.addMessageListener(ComShangChengMsg.OnBtnTSCLClick, this.onBtnTSCLClick);
		this.addMessageListener(ComShangChengMsg.OnBtnZWClick, this.onBtnZWClick);
		this.addMessageListener(ComShangChengMsg.OnBtnQHCLClick, this.onBtnQHCLClick);
		this.addMessageListener(ComShangChengMsg.OnBtnTJClick, this.onBtnTJClick);
		this.addMessageListener(ComShangChengMsg.OnBtnXFClick, this.onBtnXFClick);
		this.addMessageListener(ComShangChengMsg.OnBtnJNClick, this.onBtnJNClick);
		this.addMessageListener(ComShangChengMsg.OnBtnQTClick, this.onBtnQTClick);
		this.addMessageListener(ComShangChengMsg.OnBtnYRClick, this.onBtnYRClick);
    }

    override onEnable(): void {
        
    }

    override onDisable(): void {
        
    }

    override onDestroy(): void {
        
    }

	private onBtnPropClick(): void {
	
	}

	private onBtnGemClick(): void {
	
	}

	private onBtnMaterialClick(): void {
	
	}

	private onBtnMiJiClick(): void {
	
	}

	private onBtnOtherClick(): void {
	
	}

	private onBtnHeiShiClick(): void {
	
	}

	private onBtnXianJieClick(): void {
	
	}

	private onBtnZBQHClick(): void {
	
	}

	private onBtnBSJGClick(): void {
	
	}

	private onBtnJSClick(): void {
	
	}

	private onBtnTSDJClick(): void {
	
	}

	private onBtnGemLv1Click(): void {
	
	}

	private onBtnGemLv2Click(): void {
	
	}

	private onBtnGemLv3Click(): void {
	
	}

	private onBtnGemLv4Click(): void {
	
	}

	private onBtnSGCLClick(): void {
	
	}

	private onBtnTSCLClick(): void {
	
	}

	private onBtnZWClick(): void {
	
	}

	private onBtnQHCLClick(): void {
	
	}

	private onBtnTJClick(): void {
	
	}

	private onBtnXFClick(): void {
	
	}

	private onBtnJNClick(): void {
	
	}

	private onBtnQTClick(): void {
	
	}

	private onBtnYRClick(): void {
	
	}

}