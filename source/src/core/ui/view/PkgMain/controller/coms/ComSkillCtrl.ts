import { BaseViewCtrl } from "../../../../core/BaseViewCtrl";
import { ComSkillMsg, ComSkillView } from "../../view/coms/ComSkillView";

export interface ComSkillData {

}

export class ComSkillCtrl extends BaseViewCtrl<ComSkillView, ComSkillData>{

    override onAdded() {
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

	private onBtnNormal0Click() {

	}

	private onBtnNormal1Click() {

	}

	private onBtnNormal2Click() {

	}

	private onBtnNormal3Click() {

	}

	private onBtnNormal4Click() {

	}

	private onBtnXian0Click() {

	}

	private onBtnXian1Click() {

	}

	private onBtnXian2Click() {

	}

	private onBtnXian3Click() {

	}

	private onBtnXian4Click() {

	}

}