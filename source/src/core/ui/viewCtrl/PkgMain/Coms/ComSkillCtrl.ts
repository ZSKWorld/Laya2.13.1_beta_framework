import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { ComSkillMsg, ComSkillView } from "../../../view/PkgMain/Coms/ComSkillView";

export interface ComSkillData {

}

export class ComSkillCtrl extends BaseViewCtrl<ComSkillView, ComSkillData>{

    override onAwake(): void {
		this.addMessageListener(ComSkillMsg.OnBtnNormal0Click, this.onBtnNormal0Click);
		this.addMessageListener(ComSkillMsg.OnBtnNormal1Click, this.onBtnNormal1Click);
		this.addMessageListener(ComSkillMsg.OnBtnNormal2Click, this.onBtnNormal2Click);
		this.addMessageListener(ComSkillMsg.OnBtnNormal3Click, this.onBtnNormal3Click);
		this.addMessageListener(ComSkillMsg.OnBtnNormal4Click, this.onBtnNormal4Click);
		this.addMessageListener(ComSkillMsg.OnBtnXian0Click, this.onBtnXian0Click);
		this.addMessageListener(ComSkillMsg.OnBtnXian1Click, this.onBtnXian1Click);
		this.addMessageListener(ComSkillMsg.OnBtnXian2Click, this.onBtnXian2Click);
		this.addMessageListener(ComSkillMsg.OnBtnXian3Click, this.onBtnXian3Click);
		this.addMessageListener(ComSkillMsg.OnBtnXian4Click, this.onBtnXian4Click);
    }

    override onEnable(): void {
        
    }

    override onDisable(): void {
        
    }

    override onDestroy(): void {
        
    }

	private onBtnNormal0Click(): void {
	
	}

	private onBtnNormal1Click(): void {
	
	}

	private onBtnNormal2Click(): void {
	
	}

	private onBtnNormal3Click(): void {
	
	}

	private onBtnNormal4Click(): void {
	
	}

	private onBtnXian0Click(): void {
	
	}

	private onBtnXian1Click(): void {
	
	}

	private onBtnXian2Click(): void {
	
	}

	private onBtnXian3Click(): void {
	
	}

	private onBtnXian4Click(): void {
	
	}

}