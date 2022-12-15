import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { ComXinFaMsg, ComXinFaView } from "../../../view/PkgMain/Coms/ComXinFaView";

export interface ComXinFaData {

}

export class ComXinFaCtrl extends BaseViewCtrl<ComXinFaView, ComXinFaData>{

	override onAwake(): void {
		this.addMessage(ComXinFaMsg.OnBtnXinFa0Click, this.onBtnXinFa0Click);
		this.addMessage(ComXinFaMsg.OnBtnXinFa1Click, this.onBtnXinFa1Click);
		this.addMessage(ComXinFaMsg.OnBtnXinFa2Click, this.onBtnXinFa2Click);
		this.addMessage(ComXinFaMsg.OnBtnXinFa3Click, this.onBtnXinFa3Click);
		this.addMessage(ComXinFaMsg.OnBtnXinFa4Click, this.onBtnXinFa4Click);
		this.addMessage(ComXinFaMsg.OnBtnXinFa5Click, this.onBtnXinFa5Click);
		this.addMessage(ComXinFaMsg.OnBtnXinFa6Click, this.onBtnXinFa6Click);
		this.addMessage(ComXinFaMsg.OnBtnXinFa7Click, this.onBtnXinFa7Click);
		this.addMessage(ComXinFaMsg.OnBtnXinFa8Click, this.onBtnXinFa8Click);
		this.addMessage(ComXinFaMsg.OnBtnUpgradeBgClick, this.onBtnUpgradeBgClick);
		this.addMessage(ComXinFaMsg.OnBtnSkill0Click, this.onBtnSkill0Click);
		this.addMessage(ComXinFaMsg.OnBtnSkill1Click, this.onBtnSkill1Click);
		this.addMessage(ComXinFaMsg.OnBtnSkill2Click, this.onBtnSkill2Click);
		this.addMessage(ComXinFaMsg.OnBtnSkill3Click, this.onBtnSkill3Click);
		this.addMessage(ComXinFaMsg.OnBtnUpgrade0Click, this.onBtnUpgrade0Click);
		this.addMessage(ComXinFaMsg.OnBtnUpgrade1Click, this.onBtnUpgrade1Click);
		this.addMessage(ComXinFaMsg.OnBtnUpgrade2Click, this.onBtnUpgrade2Click);
	}

	override onEnable(): void {

	}

	override onDisable(): void {

	}

	override onDestroy(): void {

	}

	private onBtnXinFa0Click(): void {

	}

	private onBtnXinFa1Click(): void {

	}

	private onBtnXinFa2Click(): void {

	}

	private onBtnXinFa3Click(): void {

	}

	private onBtnXinFa4Click(): void {

	}

	private onBtnXinFa5Click(): void {

	}

	private onBtnXinFa6Click(): void {

	}

	private onBtnXinFa7Click(): void {

	}

	private onBtnXinFa8Click(): void {

	}

	private onBtnUpgradeBgClick(): void {

	}

	private onBtnSkill0Click(): void {

	}

	private onBtnSkill1Click(): void {

	}

	private onBtnSkill2Click(): void {

	}

	private onBtnSkill3Click(): void {

	}

	private onBtnUpgrade0Click(): void {

	}

	private onBtnUpgrade1Click(): void {

	}

	private onBtnUpgrade2Click(): void {

	}

}