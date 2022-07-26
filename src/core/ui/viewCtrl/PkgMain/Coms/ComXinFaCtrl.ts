import { GetLang } from "../../../../libs/utils/Util";
import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { UIUtility } from "../../../tool/UIUtility";
import { ComXinFaMsg, ComXinFaView } from "../../../view/PkgMain/Coms/ComXinFaView";

export interface ComXinFaData {

}

export class ComXinFaCtrl extends BaseViewCtrl<ComXinFaView, ComXinFaData>{
	private _upgradeId: number;

	onAwake(): void {
		super.onAwake();
		this.addMessageListener(ComXinFaMsg.OnBtnXinFa0Click, this.showUpgrade, [6000]);
		this.addMessageListener(ComXinFaMsg.OnBtnXinFa1Click, this.showUpgrade, [6001]);
		this.addMessageListener(ComXinFaMsg.OnBtnXinFa2Click, this.showUpgrade, [6002]);
		this.addMessageListener(ComXinFaMsg.OnBtnXinFa3Click, this.showUpgrade, [6003]);
		this.addMessageListener(ComXinFaMsg.OnBtnXinFa4Click, this.showUpgrade, [6004]);
		this.addMessageListener(ComXinFaMsg.OnBtnXinFa5Click, this.showUpgrade, [6005]);
		this.addMessageListener(ComXinFaMsg.OnBtnXinFa6Click, this.showUpgrade, [6006]);
		this.addMessageListener(ComXinFaMsg.OnBtnXinFa7Click, this.showUpgrade, [6007]);
		this.addMessageListener(ComXinFaMsg.OnBtnXinFa8Click, this.showUpgrade, [6008]);

		this.addMessageListener(ComXinFaMsg.OnBtnUpgradeBgClick, this.ComXinFa_OnBtnUpgradeBgClick);
		this.addMessageListener(ComXinFaMsg.OnBtnSkill0Click, this.ComXinFa_OnBtnSkill0Click);
		this.addMessageListener(ComXinFaMsg.OnBtnSkill1Click, this.ComXinFa_OnBtnSkill1Click);
		this.addMessageListener(ComXinFaMsg.OnBtnSkill2Click, this.ComXinFa_OnBtnSkill2Click);
		this.addMessageListener(ComXinFaMsg.OnBtnSkill3Click, this.ComXinFa_OnBtnSkill3Click);

		this.addMessageListener(ComXinFaMsg.OnBtnUpgrade0Click, this.upgradeXinFa, [1]);
		this.addMessageListener(ComXinFaMsg.OnBtnUpgrade1Click, this.upgradeXinFa, [10]);
		this.addMessageListener(ComXinFaMsg.OnBtnUpgrade2Click, this.upgradeXinFa, [100]);
	}

	onEnable(): void {
		super.onEnable();
		this.view.refresh();
	}

	private showUpgrade(id: number) {
		this._upgradeId = id;
		this.view.showUpgrade(id);
	}

	private ComXinFa_OnBtnUpgradeBgClick(): void {
		this.view.hideUpgrade();
	}

	private ComXinFa_OnBtnSkill0Click(): void {

	}

	private ComXinFa_OnBtnSkill1Click(): void {

	}

	private ComXinFa_OnBtnSkill2Click(): void {

	}

	private ComXinFa_OnBtnSkill3Click(): void {

	}

	private upgradeXinFa(count: number): void {
		const errorCode = this.userData.upgradeXinFa(this._upgradeId, count);
		if (errorCode) UIUtility.ShowTipInfo(GetLang(errorCode));
		else this.showUpgrade(this._upgradeId);
	}

	onDisable(): void {
		super.onDisable();
	}

	onDestroy(): void {
		super.onDestroy();
	}
}