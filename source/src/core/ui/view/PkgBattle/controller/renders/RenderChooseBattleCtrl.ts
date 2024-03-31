import { BattleType } from "../../../../../net/enum/BattleEnums";
import { BattleService } from "../../../../../net/Services";
import { BaseViewCtrl } from "../../../../core/BaseViewCtrl";
import { ViewID } from "../../../../core/ViewID";
import { RenderChooseBattleMsg, RenderChooseBattleView } from "../../view/renders/RenderChooseBattleView";
import { UIBattleConfirmData } from "../UIBattleConfirmCtrl";

export class RenderChooseBattleCtrl extends BaseViewCtrl<RenderChooseBattleView, BattleType> {
	private _cfgData: BattleCfgData;
	private _time: number = 0;

	override onAdded() {
		this.addMessage(RenderChooseBattleMsg.OnGraphTouchClick, this.onGraphBgClick);
		this.addMessage(RenderChooseBattleMsg.OnBtnBreakClick, this.onBtnBreakClick);
	}

	override onUpdate() {
		this._time += Laya.timer.delta;
		if (this._time >= 1000) {
			this._time = 0;
			const { _cfgData, data, view } = this;
			switch (data) {
				case BattleType.Boss: view.refreshBossCool(_cfgData as CfgBossData); break;
				case BattleType.Gather: view.refreshGatherCool(_cfgData as CfgGatherData); break;
			}
		}
	}

	setData(data: BattleType, cfgData: BattleCfgData) {
		this.data = data;
		this._cfgData = cfgData;
		this.view.refreshByType(this.data, cfgData);
	}

	override onDisable() {
		this._cfgData = null;
	}

	private onGraphBgClick() {
		this.showView<UIBattleConfirmData>(ViewID.UIBattleConfirmView, { type: this.data, data: this._cfgData });
	}

	private onBtnBreakClick() {
		BattleService.Inst.breakOffGather({ id: this._cfgData.id });
	}

}