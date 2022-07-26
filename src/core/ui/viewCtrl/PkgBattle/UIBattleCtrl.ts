import { BattleMsg, BattleProcessor } from "../../../battle/BattleProcessor";
import { NotifyConst } from "../../../common/NotifyConst";
import { InsertNotify } from "../../../libs/event/EventMgr";
import { storage } from "../../../libs/localStorage/LocalStorage";
import { LocalStorageKey } from "../../../libs/localStorage/LocalStorageKey";
import { GetColorStr } from "../../../libs/utils/Util";
import { BattleType } from "../../../playerData/Interface";
import { tableMgr } from "../../../table/TableManager";
import { BaseViewCtrl, InsertKeyEvent, KeyEventType } from "../../core/BaseViewCtrl";
import { UIUtility } from "../../tool/UIUtility";
import { UIBattleMsg, UIBattleView } from "../../view/PkgBattle/UIBattleView";
import { RenderLiLianView } from "../../view/PkgMain/Renders/RenderLiLianView";
import { BattleLevel } from "./UIChooseBattleCtrl";

export interface UIBattleData {
	battleType: BattleType;
	cfg: BattleLevel;
}

export class UIBattleCtrl extends BaseViewCtrl<UIBattleView, UIBattleData> {
	private _logTime: number = 0;
	private _logDelta: number;
	private _useFrame: boolean;
	private _frameUpdate: number;

	/**战斗速度 */
	private set battleSpeed(value: number) {
		value = value > 0 ? value : 1;
		this._logDelta = 1000 / value;
		this._useFrame = this._logDelta < 16.666666;
		if (this._useFrame) {
			this._frameUpdate = Math.floor(16.666666 / this._logDelta);
		}
	}

	private logs: string[] = [];
	private prelogs: string[] = [];
	private logIndex: number;
	private battleProcessor = new BattleProcessor();
	private beiSu: number[] = tableMgr.Const[1006].Value.split(",").map((v) => Number(v));

	onAwake(): void {
		super.onAwake();
		this.addMessageListener(UIBattleMsg.OnCmbBeiSuDropDownDisplay, this.UIBattle_OnCmbBeiSuDropDownDisplay);
		this.addMessageListener(UIBattleMsg.OnBtnOfflineClick, this.UIBattle_OnBtnOfflineClick);
		this.addMessageListener(UIBattleMsg.OnBtnEnemyInfoClick, this.UIBattle_OnBtnEnemyInfoClick);
		this.addMessageListener(UIBattleMsg.OnBtnQuitBattleClick, this.UIBattle_OnBtnQuitBattleClick);
		this.view.refreshTitle(this.data.cfg);
		let tempSpeed = storage.get(LocalStorageKey.BattleSpeed) || this.beiSu[0];
		tempSpeed = this.beiSu.indexOf(tempSpeed) == -1 ? this.beiSu[0] : tempSpeed;
		this.battleSpeed = tempSpeed;
		UIUtility.SetCombox(this.view.CmbBeiSu, this.beiSu.map(v => v + "倍速"), this.beiSu, this, this.setBeiSu, tempSpeed);
		this.battleProcessor.init(this.data.cfg);
		this.doBattle();
	}

	onEnable(): void {
		super.onEnable();
	}

	onUpdate(): void {
		if (this.logIndex >= -1) {
			const { battleInfos } = this.battleProcessor;
			if (this._useFrame) {
				for (let i = this._frameUpdate; i >= 0; i--) {
					battleInfos.length && battleInfos.shift().event().recover();
					this.prelogs.length && this.logs.push(this.prelogs.shift());
					this.logIndex--;
				}
				this.refreshLogList();
			} else {
				this._logTime += Laya.timer.delta;
				if (this._logTime >= this._logDelta) {
					this.logIndex--;
					this._logTime -= this._logDelta;
					battleInfos.length && battleInfos.shift().event().recover();
					if (this.prelogs.length) {
						this.logs.push(this.prelogs.shift());
						this.refreshLogList();
					}
				}
			}
		} else this.doBattle();
	}

	private listRenderer(index: number, item: RenderLiLianView) {
		item.title.text = this.logs[index];
	}

	private doBattle() {
		if (this.battleProcessor.battleFinished == false) {
			this.battleProcessor.startBattle();
			let hurtNum = 0;
			this.battleProcessor.battleInfos.forEach(v => {
				if (v.isStart) {
					v.event();
					this._logTime = 0;
					this.logs.length = 0;
					this.prelogs.length = 0;
					this.prelogs.push("即将开始挑战 " + v.data[0]);
				} else if (v.isHurt) {
					let [gamerAttack, hurt, isCri, _, __, attackName] = v.data;
					if (gamerAttack)
						this.prelogs.push(`[${++hurtNum}]你使用[color=#308930]基本剑术[/color]对怪物造成[color=#308930]${hurt}[/color]${isCri ? "[color=#FF0000][暴][/color]" : ""}点伤害`);
					else
						this.prelogs.push(`[${++hurtNum}]怪物使用[color=#0000FF]${attackName}[/color]对你造成[color=#0000FF]${hurt}[/color]点伤害`);
				} else if (v.isSuccess) {
					this.prelogs.push("你赢得了这场战斗！");
					if (v.data[1] > 0)
						this.prelogs.push(`[color=#E2FF45]剩余${v.data[1]}波[/color]`);
				} else if (v.isOut) {
					this.prelogs.push(`${v.data}：和你战斗太无聊了`);
					this.prelogs.push(`[color=#FF0000]挑战失败！[/color]`);
				} else if (v.isEnd) {
					this.prelogs.push(v.data ? "[color=#66FF00]挑战成功！[/color]" : "[color=#FF0000]你被击败了！[/color]");
				}
			});
			this.logIndex = this.prelogs.length;
			this.refreshLogList();
		}
	}

	@InsertNotify(BattleMsg.Battle_WaveSuccess)
	private waveSuccess() {
		this.data.battleType == BattleType.GuanQia && this.userData.passLevel(BattleType.GuanQia, this.data.cfg.ID);

		let mainLogs: string[] = [];
		const rewards = this.userData.battleWaveSuccess(this.data.battleType, this.data.cfg.ID);
		rewards.forEach((v, index) => {
			this.logIndex++;
			const { Name, Quality } = tableMgr.Item[v.id];
			this.prelogs.splice(1 + index, 0, Name + " + " + v.count);
			if (v.special) {
				if (this.data.battleType != BattleType.Boss)
					mainLogs.push(`在&nbsp;${this.data.cfg.Name}&nbsp;战胜&nbsp;${this.battleProcessor.enemyCfg.Name}
                    &nbsp;获得&nbsp;${GetColorStr(Quality, Name)}&nbsp;x${v.count}`);
				else
					mainLogs.push(`战胜BOSS&nbsp;${this.battleProcessor.enemyCfg.Name}&nbsp;获得&nbsp;${GetColorStr(Quality, Name)}&nbsp;x${v.count}`);
			}
		});
		mainLogs.length && this.dispatch(NotifyConst.AddMainLog, [mainLogs]);
	}

	@InsertNotify(BattleMsg.Battle_End)
	private battleEnd(success: boolean) {
		if (success) this.userData.passLevel(this.data.battleType, this.data.cfg.ID);
	}

	private refreshLogList() {
		UIUtility.SetList(this.view.ListItem, this.logs.length, this, this.listRenderer);
		this.logs.length && this.view.ListItem.scrollToView(this.logs.length - 1, false);
	}

	private setBeiSu() {
		const speed = this.beiSu[this.view.CmbBeiSu.selectedIndex];
		this.battleSpeed = speed;
		storage.set(LocalStorageKey.BattleSpeed, speed);
		this.dispatch(NotifyConst.AddMainLog, `战斗速度调整为${speed}倍速`);
	}

	private UIBattle_OnCmbBeiSuDropDownDisplay(): void {
		const { selectedIndex, dropdown } = this.view.CmbBeiSu;
		dropdown.getChild("list").asList._children.forEach(
			(v, index) => v.asCom.getController("ctrlSelected").selectedIndex = Number(selectedIndex == index)
		);
	}

	private UIBattle_OnBtnOfflineClick(): void {

	}

	private UIBattle_OnBtnEnemyInfoClick(): void {

	}

	@InsertKeyEvent(KeyEventType.KeyUp, Laya.Keyboard.ESCAPE)
	private UIBattle_OnBtnQuitBattleClick(): void {
		this.removeTop();
	}

	onDisable(): void {
		super.onDisable();
	}

	onDestroy(): void {
		super.onDestroy();
	}
}