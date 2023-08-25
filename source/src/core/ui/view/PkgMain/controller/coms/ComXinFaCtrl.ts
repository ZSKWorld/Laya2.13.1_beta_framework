import { BaseViewCtrl } from "../../../../core/BaseViewCtrl";
import { ComXinFaMsg, ComXinFaView } from "../../view/coms/ComXinFaView";

export interface ComXinFaData {

}

export class ComXinFaCtrl extends BaseViewCtrl<ComXinFaView, ComXinFaData>{

    override onAdded() {
		this.addMessage(ComXinFaMsg.OnBtnXinFa0Click, this.onBtnXinFa0Click);
		this.addMessage(ComXinFaMsg.OnBtnXinFa1Click, this.onBtnXinFa1Click);
		this.addMessage(ComXinFaMsg.OnBtnXinFa2Click, this.onBtnXinFa2Click);
		this.addMessage(ComXinFaMsg.OnBtnXinFa3Click, this.onBtnXinFa3Click);
		this.addMessage(ComXinFaMsg.OnBtnXinFa4Click, this.onBtnXinFa4Click);
		this.addMessage(ComXinFaMsg.OnBtnXinFa5Click, this.onBtnXinFa5Click);
		this.addMessage(ComXinFaMsg.OnBtnXinFa6Click, this.onBtnXinFa6Click);
		this.addMessage(ComXinFaMsg.OnBtnXinFa7Click, this.onBtnXinFa7Click);
		this.addMessage(ComXinFaMsg.OnBtnXinFa8Click, this.onBtnXinFa8Click);
		this.addMessage(ComXinFaMsg.OnBtnSkill0Click, this.onBtnSkill0Click);
		this.addMessage(ComXinFaMsg.OnBtnSkill1Click, this.onBtnSkill1Click);
		this.addMessage(ComXinFaMsg.OnBtnSkill2Click, this.onBtnSkill2Click);
		this.addMessage(ComXinFaMsg.OnBtnSkill3Click, this.onBtnSkill3Click);
		this.addMessage(ComXinFaMsg.OnBtnUpgrade0Click, this.onBtnUpgrade0Click);
		this.addMessage(ComXinFaMsg.OnBtnUpgrade1Click, this.onBtnUpgrade1Click);
		this.addMessage(ComXinFaMsg.OnBtnUpgrade2Click, this.onBtnUpgrade2Click);
    }

	private onBtnXinFa0Click() {
	
	}

	private onBtnXinFa1Click() {
	
	}

	private onBtnXinFa2Click() {
	
	}

	private onBtnXinFa3Click() {
	
	}

	private onBtnXinFa4Click() {
	
	}

	private onBtnXinFa5Click() {
	
	}

	private onBtnXinFa6Click() {
	
	}

	private onBtnXinFa7Click() {
	
	}

	private onBtnXinFa8Click() {
	
	}

	private onBtnSkill0Click() {
	
	}

	private onBtnSkill1Click() {
	
	}

	private onBtnSkill2Click() {
	
	}

	private onBtnSkill3Click() {
	
	}

	private onBtnUpgrade0Click() {
	
	}

	private onBtnUpgrade1Click() {
	
	}

	private onBtnUpgrade2Click() {
	
	}

}