import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { ComSkillMsg, ComSkillView } from "../../../view/PkgMain/Coms/ComSkillView";

export interface ComSkillData {

}

export class ComSkillCtrl extends BaseViewCtrl<ComSkillView, ComSkillData>{

	override onAwake(): void {
		this.addMessage(ComSkillMsg.OnBtnNormal0Click, this.onBtnNormal0Click);
		this.addMessage(ComSkillMsg.OnBtnNormal1Click, this.onBtnNormal1Click);
		this.addMessage(ComSkillMsg.OnBtnNormal2Click, this.onBtnNormal2Click);
		this.addMessage(ComSkillMsg.OnBtnNormal3Click, this.onBtnNormal3Click);
		this.addMessage(ComSkillMsg.OnBtnNormal4Click, this.onBtnNormal4Click);
		this.addMessage(ComSkillMsg.OnBtnXian0Click, this.onBtnXian0Click);
		this.addMessage(ComSkillMsg.OnBtnXian1Click, this.onBtnXian1Click);
		this.addMessage(ComSkillMsg.OnBtnXian2Click, this.onBtnXian2Click);
		this.addMessage(ComSkillMsg.OnBtnXian3Click, this.onBtnXian3Click);
		this.addMessage(ComSkillMsg.OnBtnXian4Click, this.onBtnXian4Click);
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