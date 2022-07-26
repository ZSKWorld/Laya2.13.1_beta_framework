import { BattleMsg } from "../../../battle/BattleProcessor";
import { ResPath } from "../../../common/ResPath";
import { InsertNotify } from "../../../libs/event/EventMgr";
import { ExtensionClass, GetItemString, GetJingJieString } from "../../../libs/utils/Util";
import { ViewExtension } from "../../core/interfaces";
import UIBattle from "../../ui/PkgBattle/UIBattle";
import { BattleLevel } from "../../viewCtrl/PkgBattle/UIChooseBattleCtrl";

export const enum UIBattleMsg {
	OnBtnOfflineClick = "UIBattle_OnBtnOfflineClick",
	OnBtnEnemyInfoClick = "UIBattle_OnBtnEnemyInfoClick",
	OnBtnQuitBattleClick = "UIBattle_OnBtnQuitBattleClick",
	OnCmbBeiSuDropDownDisplay = "UIBattle_OnCmbBeiSuDropDownDisplay",
}

export class UIBattleView extends ExtensionClass<ViewExtension, UIBattle>(UIBattle) {
	static PkgRes = ResPath.Ui_PkgBattle;
	private _dropStr: string;

	onCreate(): void {
		const { BtnOffline, BtnEnemyInfo, BtnQuitBattle, CmbBeiSu, BtnCloseInfo } = this;
		BtnOffline.onClick(this, this.sendMessage, [UIBattleMsg.OnBtnOfflineClick]);
		BtnEnemyInfo.onClick(this, this.sendMessage, [UIBattleMsg.OnBtnEnemyInfoClick]);
		BtnQuitBattle.onClick(this, this.sendMessage, [UIBattleMsg.OnBtnQuitBattleClick]);
		CmbBeiSu.dropdown.on(Laya.Event.DISPLAY, this, this.sendMessage, [UIBattleMsg.OnCmbBeiSuDropDownDisplay]);
		BtnCloseInfo.onClick(this, this.onBtnCloseInfo);
	}

	refreshTitle(data: BattleLevel) {
		this._dropStr = GetItemString(data.RandomDropOut ? data.BaseDropOut.concat(data.RandomDropOut) : data.BaseDropOut, false);
		this.TxtInfo.text = `消耗：${data.VigorCost}精力<br>掉落：${this._dropStr}<br>${data.Description}`;
		this.ProWave.max = data.BattleWave == -1 ? 0 : data.BattleWave;
		this.ProWave.value = 0;
	}

	@InsertNotify(BattleMsg.Battle_WaveSuccess)
	private refreshExp() {
		this.ProExp.max = this.userData.base.upgradeExp;
		this.ProExp.value = this.userData.base.exp;
	}

	@InsertNotify(BattleMsg.Battle_WaveStart)
	private battleWaveStart(enemyName: string, enemyLevel: string, playerMaxHp: number, enemyMaxHP: number, enemyData: ConfigEnemyData) {
		this.refreshExp();
		this.ProSelfHp.max = playerMaxHp;
		this.ProSelfHp.value = playerMaxHp;
		this.ProEnemyHp.max = enemyMaxHP;
		this.ProEnemyHp.value = enemyMaxHP;
		this.TxtEnemyName.text = "Lv." + enemyLevel + " " + enemyName;
		const { jingJie, cengJi } = this.userData.base;
		this.TxtSelfName.text = GetJingJieString(jingJie, cengJi) + " " + this.userData.account.nickName;

		this.TxtEnemy.text = `
			名字：${enemyData.Name}
			掉落：${this._dropStr}
			攻击：${enemyData.ATK}
			防御：${enemyData.Defense}
			生命：${enemyData.HP}
			金攻/防：${enemyData.JinATK}/${enemyData.JinDef}
			木攻/防：${enemyData.MuATK}/${enemyData.MuDef}
			水攻/防：${enemyData.ShuiATK}/${enemyData.ShuiDef}
			火攻/防：${enemyData.HuoATK}/${enemyData.HuoDef}
			土攻/防：${enemyData.TuATK}/${enemyData.TuDef}
			角色命中：${(enemyData.HitRate * 100).toFixed(2)}%
			角色暴击：${(enemyData.CriRate * 100).toFixed(2)}%
			角色闪避：${(enemyData.DodRate * 100).toFixed(2)}%
		`;
	}

	@InsertNotify(BattleMsg.Battle_Hurt)
	private battleHurt(_, __, ___, gamerHp: number, enemyHp: number) {
		this.ProSelfHp.value = gamerHp;
		this.ProEnemyHp.value = enemyHp;
	}

	@InsertNotify(BattleMsg.Battle_WaveSuccess)
	private battleWaveSuccess(wave: number) {
		this.ProWave.value = wave;
	}

	private onBtnCloseInfo() {
		this.ctrlState.selectedIndex = 0;
	}

}
