import { Notifier } from "../libs/event/Notifier";
import { tableMgr } from "../table/TableManager";
import { BattleLevel } from "../ui/viewCtrl/PkgBattle/UIChooseBattleCtrl";
import { EnemyData } from "./EnemyData";
import { GamerData } from "./GamerData";

export const enum BattleMsg {
	/** 战斗波次开始 */
	Battle_WaveStart = "Battle_WaveStart",
	/** 战斗伤害信息 */
	Battle_Hurt = "Battle_Hurt",
	/** 战斗波次成功 */
	Battle_WaveSuccess = "Battle_WaveSuccess",
	/** 战斗波次超时 */
	Battle_WaveOut = "Battle_WaveOut",
	/** 战斗结束 */
	Battle_End = "Battle_End",
}

export class BattleInfo extends Notifier {
	private _eventName: string;
	private _data: any;
	private _isStart: boolean;
	private _isHurt: boolean;
	private _isSuccess: boolean;
	private _isOut: boolean;
	private _isEnd: boolean;

	get eventName() {
		return this._eventName;
	}

	get data() {
		return this._data;
	}

	get isStart() {
		return this._isStart;
	}

	get isHurt() {
		return this._isHurt;
	}

	get isSuccess() {
		return this._isSuccess;
	}

	get isOut() {
		return this._isOut;
	}

	get isEnd() {
		return this._isEnd;
	}

	constructor(eventName: string, start = false, hurt = false, success = false, out = false, end = false) {
		super();
		this._eventName = eventName;
		this._isStart = start;
		this._isHurt = hurt;
		this._isSuccess = success;
		this._isOut = out;
		this._isEnd = end;
	}

	setData(data: any) {
		this._data = data;
		return this;
	}

	event() {
		this._eventName && this.dispatch(this._eventName, this._data);
		return this;
	}

	recover() {
		this._data = null;
		Laya.Pool.recoverByClass(this);
	}
}

class WaveStartInfo extends BattleInfo {
	constructor() {
		super(BattleMsg.Battle_WaveStart, true);
	}
}

class HurtInfo extends BattleInfo {
	constructor() {
		super(BattleMsg.Battle_Hurt, false, true);
	}
}

class WaveSuccessInfo extends BattleInfo {
	constructor() {
		super(BattleMsg.Battle_WaveSuccess, false, false, true);
	}
}

class WaveOutInfo extends BattleInfo {
	constructor() {
		super(BattleMsg.Battle_WaveOut, false, false, false, true);
	}
}

class EndInfo extends BattleInfo {
	constructor() {
		super(BattleMsg.Battle_End, false, false, false, false, true);
	}
}

export class BattleProcessor extends Notifier {
	/**已战斗回合 */
	private _huiHe: number;
	/**最大战斗回合 */
	private _maxHuiHe: number;
	/**已战斗的波次 */
	private _wave: number;
	/***最大战斗波次 */
	private _waveMax: number;
	/**战斗是否结束 */
	private _battleFinished: boolean;
	/**是否该玩家攻击 */
	private _gamerAttack: boolean;
	/**战斗数据 */
	private _battleInfos: BattleInfo[] = [];
	/**可出现的怪物id */
	private _enemys: number[];
	/**玩家数据 */
	private _gamer = new GamerData();
	/**怪物数据 */
	private _enemy = new EnemyData();
	private _enemyCfg: ConfigEnemyData;
	private _enemyIndex: number;

	get enemyCfg() {
		return this._enemyCfg;
	}

	get battleInfos() {
		return this._battleInfos;
	}

	get battleFinished() {
		return this._battleFinished;
	}

	init(enemyCfg: BattleLevel) {
		this._wave = 0;
		this._enemyIndex = 0;
		this._enemyCfg = null;
		this._battleFinished = false;
		this._enemys = enemyCfg.Enemy;
		this._maxHuiHe = enemyCfg.MaxHuiHe;
		this._waveMax = enemyCfg.BattleWave;
		this._gamer.resetData();
	}

	startBattle() {
		this._huiHe = 0;
		this._battleInfos.forEach(v => v.recover());
		this._battleInfos.length = 0;
		this.checkBattleEnd();
		if (this._battleFinished == false) {
			this._gamerAttack = true;
			this._gamer.resetData();
			this._enemyIndex >= this._enemys.length && (this._enemyIndex = 0);
			this._enemyCfg = tableMgr.Enemy[this._enemys[this._enemyIndex++]];
			this._enemy.setData(this._enemyCfg);

			this.pushInfo(WaveStartInfo, [this._enemy.name, this._enemy.level, this._gamer.maxHP, this._enemy.maxHP, this._enemyCfg]);
		}
		while (this._battleFinished == false && this._enemy.isDead == false) {
			let hurt: number = 0;
			let isCri: boolean = false;
			if (this._gamerAttack) {
				hurt = this._enemy.getHurt(this._gamer.hurtValue);
				isCri = this._enemy.hurtCri;
				this._gamer.xiShou(hurt);
			} else {
				hurt = this._gamer.getHurt(this._enemy.hurtValue);
				isCri = this._gamer.hurtCri;
				this._huiHe++;
			}
			this.pushInfo(HurtInfo, [this._gamerAttack, hurt, isCri, this._gamer.curHp, this._enemy.curHp, this._enemy.attackName]);
			this._gamerAttack = !this._gamerAttack;
			if (this._enemy.isDead) {
				this._wave = this._waveMax != -1 ? (this._wave + 1) : 0;
				this.pushInfo(WaveSuccessInfo, [this._wave, this._waveMax - this._wave]);
			}
			this.checkBattleEnd();
		}
	}

	private checkBattleEnd() {
		const gamerDead = this._gamer.isDead;
		const maxHuiHe = this._maxHuiHe != -1 && (this._huiHe >= this._maxHuiHe);
		const maxWave = this._waveMax != -1 && (this._wave >= this._waveMax);
		if (gamerDead || maxHuiHe || maxWave) {
			this._battleFinished = true;
			if (maxHuiHe) this.pushInfo(WaveOutInfo, this._enemy.name);
			else this.pushInfo(EndInfo, this._gamer.isDead == false);
		}
	}

	private pushInfo(type: new () => BattleInfo, data: any) {
		let info = Laya.Pool.createByClass(type);
		this._battleInfos.push(info.setData(data));
	}
}