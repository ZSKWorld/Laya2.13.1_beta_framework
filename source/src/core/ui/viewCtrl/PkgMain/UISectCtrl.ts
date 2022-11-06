import { BaseViewCtrl } from "../../core/BaseViewCtrl";
import { UISectMsg, UISectView } from "../../view/PkgMain/UISectView";

export interface UISectData {

}

export class UISectCtrl extends BaseViewCtrl<UISectView, UISectData>{

    override onAwake(): void {
		this.addMessageListener(UISectMsg.OnBtnSect0Click, this.onBtnSect0Click);
		this.addMessageListener(UISectMsg.OnBtnSect1Click, this.onBtnSect1Click);
		this.addMessageListener(UISectMsg.OnBtnSect2Click, this.onBtnSect2Click);
		this.addMessageListener(UISectMsg.OnBtnSect3Click, this.onBtnSect3Click);
		this.addMessageListener(UISectMsg.OnBtnSect4Click, this.onBtnSect4Click);
		this.addMessageListener(UISectMsg.OnBtnSect5Click, this.onBtnSect5Click);
		this.addMessageListener(UISectMsg.OnBtnSubmitClick, this.onBtnSubmitClick);
    }

    override onEnable(): void {
        
    }

    override onDisable(): void {
        
    }

    override onDestroy(): void {
        
    }

	private onBtnSect0Click(): void {
	
	}

	private onBtnSect1Click(): void {
	
	}

	private onBtnSect2Click(): void {
	
	}

	private onBtnSect3Click(): void {
	
	}

	private onBtnSect4Click(): void {
	
	}

	private onBtnSect5Click(): void {
	
	}

	private onBtnSubmitClick(): void {
	
	}

}