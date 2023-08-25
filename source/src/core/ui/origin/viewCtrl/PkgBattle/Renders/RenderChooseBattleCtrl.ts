import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { RenderChooseBattleMsg, RenderChooseBattleView } from "../../../view/PkgBattle/Renders/RenderChooseBattleView";

export interface RenderChooseBattleData {

}

export class RenderChooseBattleCtrl extends BaseViewCtrl<RenderChooseBattleView, RenderChooseBattleData>{
	private _secTime: number;

	override onAwake(): void {
		this.addMessage(RenderChooseBattleMsg.OnBtnBreakClick, this.onBtnBreakClick);
	}

	override onEnable(): void {
		this._secTime = 0;
	}

	override onUpdate(): void {
		this._secTime += Laya.timer.delta;
		if (this._secTime >= 1000) {
			this._secTime = 0;
			this.sendMessage(RenderChooseBattleMsg.OnSecondUpdate);
		}
	}

	override onDisable(): void {

	}

	override onDestroy(): void {

	}

	private onBtnBreakClick(): void {

	}

}