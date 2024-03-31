import { ProxyKey } from "../../utils/ProxyMgr";
import { TimeUtil } from "../../utils/TimeUtil";
import { cfgMgr } from "../config/CfgManager";
import { BattleType } from "../enum/BattleEnums";
import { DecodeObject } from "./DecodeObject";
class Level extends DecodeObject<ILevelData, ILevel> implements ILevel {
    enterBattle(id: number): void {
    }
}

class Copy extends DecodeObject<ICopyData, ICopy> implements ICopy {
    usedMap: KeyMap<number> = {};

    getLastCount(id: number): number {
        const cfg = cfgMgr.Copy[id];
        return cfg.battleCount - (this.usedMap[id] || 0);
    }

    enterBattle(id: number) {
        const oldCnt = this.usedMap[id] || 0;
        this.usedMap[id] = oldCnt + 1;
    }

    reset(): void {
        this.usedMap = {};
    }

    protected override onDecode(data: ICopyData, key: keyof ICopyData): KeyMap<number> {
        Object.keys(data).forEach(v => this[key][v] = data[v]);
        return this[key];
    }
}

class Secret extends DecodeObject<ISecretData, ISecret> implements ISecret {
    usedMap: KeyMap<number> = {};

    getLastCount(id: number): number {
        const cfg = cfgMgr.Secret[id];
        return cfg.battleCount - (this.usedMap[id] || 0);
    }

    enterBattle(id: number) {
        const oldCnt = this.usedMap[id] || 0;
        this.usedMap[id] = oldCnt + 1;
    }

    reset(): void {
        this.usedMap = {};
    }

    protected override onDecode(data: ISecretData, key: keyof ISecretData): KeyMap<number> {
        Object.keys(data).forEach(v => this[key][v] = data[v]);
        return this[key];
    }
}

class Boss extends DecodeObject<IBossData, IBoss> implements IBoss {
    lastChallengeTime: KeyMap<number> = {};

    lastCoolTime(id: number) {
        const lastTime = this.lastChallengeTime[id];
        if (!lastTime) return 0;
        const cfg = cfgMgr.Boss[id];
        return Math.max(cfg.coolTime - (TimeUtil.getSecondStamp() - lastTime), 0);
    }

    enterBattle(id: number) {
        this.lastChallengeTime[id] = TimeUtil.getSecondStamp();
    }

    reset(): void {
        this.lastChallengeTime = {};
    }

    protected override onDecode(data: IBossData, key: keyof IBossData): KeyMap<number> {
        Object.keys(data).forEach(v => this[key][v] = data[v]);
        return this[key];
    }
}

class Gather extends DecodeObject<IGatherData, IGather> implements IGather {
    startTimeMap: KeyMap<number> = {};
    gatherTimeMap: KeyMap<number> = {};

    remainTime(id: number) {
        const startTime = this.startTimeMap[id];
        if (!startTime) return 0;
        return Math.max(this.gatherTimeMap[id] - (TimeUtil.getSecondStamp() - startTime), 0);
    }

    startGather(id: number, gatherTime: number) {
        this.startTimeMap[id] = TimeUtil.getSecondStamp();
        this.gatherTimeMap[id] = gatherTime;
    }

    breakOffGather(id: number): void {
        this.startTimeMap[id] = null;
        this.gatherTimeMap[id] = null;
    }

    protected override onDecode(data: IGatherData, key: keyof IGatherData): KeyMap<number> {
        Object.keys(data).forEach(v => this[key][v] = data[v]);
        return this[key];
    }
}

export class Battle extends DecodeObject<IBattleData, IBattle> implements IBattle {
    /**关卡数据 */
    level = new Level();
    /**副本数据 */
    copy = new Copy();
    /**秘境数据 */
    secret = new Secret();
    /**boss数据 */
    boss = new Boss();
    /**采集数据 */
    gather = new Gather();

    getConfig(type: BattleType, id: number) {
        switch (type) {
            case BattleType.Level: return cfgMgr.Level[id];
            case BattleType.Copy: return cfgMgr.Copy[id];
            case BattleType.Secret: return cfgMgr.Secret[id];
            case BattleType.Boss: return cfgMgr.Boss[id];
            case BattleType.Gather: return cfgMgr.Gather[id];
            default: return null;
        }
    }

    getLastCount(type: BattleType, id: number) {
        switch (type) {
            case BattleType.Level: return Number.MAX_SAFE_INTEGER;
            case BattleType.Copy: return this.copy.getLastCount(id);
            case BattleType.Secret: return this.secret.getLastCount(id);
            case BattleType.Boss: return Number.MAX_SAFE_INTEGER;
            default: return 0;
        }
    }

    getIsCooldown(type: BattleType, id: number) {
        switch (type) {
            case BattleType.Boss: return this.boss.lastCoolTime(id) <= 0;
            case BattleType.Gather: return this.gather.remainTime(id) <= 0;
            default: return true;
        }
    }

    getVigorCost(type: BattleType, id: number) {
        switch (type) {
            case BattleType.Gather: return 0;
            default: return this.getConfig(type, id).vigorCost;
        }
    }

    resetData() {
        this.copy.reset();
        this.secret.reset();
    }

    protected override onDecode(data: IBattleData, key: keyof IBattleData) {
        return this[key].decode(data[key] as any);
    }
}