import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { ComZhiZuoMsg, ComZhiZuoView } from "../../../view/PkgMain/Coms/ComZhiZuoView";

export interface ComZhiZuoData {

}

export class ComZhiZuoCtrl extends BaseViewCtrl<ComZhiZuoView, ComZhiZuoData>{

    override onAwake(): void {
		this.addMessageListener(ComZhiZuoMsg.OnBtnFJZBClick, this.onBtnFJZBClick);
		this.addMessageListener(ComZhiZuoMsg.OnBtnFJBSClick, this.onBtnFJBSClick);
		this.addMessageListener(ComZhiZuoMsg.OnBtnYJHCClick, this.onBtnYJHCClick);
		this.addMessageListener(ComZhiZuoMsg.OnBtnJPYLClick, this.onBtnJPYLClick);
		this.addMessageListener(ComZhiZuoMsg.OnBtnDZZBClick, this.onBtnDZZBClick);
		this.addMessageListener(ComZhiZuoMsg.OnBtnZJZBClick, this.onBtnZJZBClick);
		this.addMessageListener(ComZhiZuoMsg.OnBtnCZZBClick, this.onBtnCZZBClick);
		this.addMessageListener(ComZhiZuoMsg.OnBtnBSHCClick, this.onBtnBSHCClick);
		this.addMessageListener(ComZhiZuoMsg.OnBtnZZTZClick, this.onBtnZZTZClick);
    }

    override onEnable(): void {
        
    }

    override onDisable(): void {
        
    }

    override onDestroy(): void {
        
    }

	private onBtnFJZBClick(): void {
	
	}

	private onBtnFJBSClick(): void {
	
	}

	private onBtnYJHCClick(): void {
	
	}

	private onBtnJPYLClick(): void {
	
	}

	private onBtnDZZBClick(): void {
	
	}

	private onBtnZJZBClick(): void {
	
	}

	private onBtnCZZBClick(): void {
	
	}

	private onBtnBSHCClick(): void {
	
	}

	private onBtnZZTZClick(): void {
	
	}

}