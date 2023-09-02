import { TimeUtil } from "../../utils/TimeUtil";
import { cfgMgr } from "../config/CfgManager";
import { BattleType } from "../enum/BattleEnums";
import { Decode } from "./Decode";
class Level extends Decode<ILevelData, ILevel> implements ILevel {
    startBattle(id: number): void {
    }
}

class Copy extends Decode<ICopyData, ICopy> implements ICopy {
    usedMap: KeyMap<number> = null;

    getLastCount(id: number): number {
        const cfg = cfgMgr.FuBen[ id ];
        if (!this.usedMap) return cfg.battleCount;
        return cfg.battleCount - (this.usedMap[ id ] || 0);
    }

    startBattle(id: number) {
        const usedMap = this.usedMap || {};
        const oldCnt = usedMap[ id ] || 0;
        usedMap[ id ] = oldCnt + 1;
        this.usedMap = usedMap;
    }

    reset(): void {
        this.usedMap = null;
    }
}

class Secret extends Decode<ISecretData, ISecret> implements ISecret {
    usedMap: KeyMap<number> = null;

    getLastCount(id: number): number {
        const cfg = cfgMgr.MiJing[ id ];
        if (!this.usedMap) return cfg.battleCount;
        return cfg.battleCount - (this.usedMap[ id ] || 0);
    }

    startBattle(id: number) {
        const usedMap = this.usedMap || {};
        const oldCnt = usedMap[ id ] || 0;
        usedMap[ id ] = oldCnt + 1;
        this.usedMap = usedMap;
    }

    reset(): void {
        this.usedMap = null;
    }
}

class Boss extends Decode<IBossData, IBoss> implements IBoss {
    lastChallengeTime: KeyMap<number> = null;

    lastCoolTime(id: number) {
        if (!this.lastChallengeTime) return 0;
        const lastTime = this.lastChallengeTime[ id ];
        if (!lastTime) return 0;
        const cfg = cfgMgr.Boss[ id ];
        return Math.max(cfg.coolTime - (TimeUtil.getSecondStamp() - lastTime), 0);
    }

    startBattle(id: number) {
        const lastChallengeTime = this.lastChallengeTime || {};
        lastChallengeTime[ id ] = TimeUtil.getSecondStamp();
        this.lastChallengeTime = lastChallengeTime;
    }

    reset(): void {
        this.lastChallengeTime = null;
    }
}

class Gather extends Decode<IGatherData, IGather> implements IGather {
    usedMap: KeyMap<number> = null;
    startTimeMap: KeyMap<number> = null;

    getLastCount(id: number): number {
        const cfg = cfgMgr.CaiJi[ id ];
        if (!this.usedMap) return cfg.gatherCount;
        return cfg.gatherCount - (this.usedMap[ id ] || 0);
    }

    lastGatherTime(id: number) {
        if (!this.startTimeMap) return 0;
        const startTime = this.startTimeMap[ id ];
        if (!startTime) return 0;
        const cfg = cfgMgr.CaiJi[ id ];
        return Math.max(cfg.gatherTime - (TimeUtil.getSecondStamp() - startTime), 0);
    }

    startBattle(id: number) {
        const usedMap = this.usedMap || {};
        const oldCnt = usedMap[ id ] || 0;
        usedMap[ id ] = oldCnt + 1;
        this.usedMap = usedMap;

        const startTimeMap = this.startTimeMap || {};
        startTimeMap[ id ] = TimeUtil.getSecondStamp();
        this.startTimeMap = startTimeMap;
    }

    reset(): void {
        this.usedMap = null;
    }
}

export class Battle extends Decode<IBattleData, IBattle> implements IBattle {
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
            case BattleType.GuanQia: return cfgMgr.Level[ id ];
            case BattleType.FuBen: return cfgMgr.FuBen[ id ];
            case BattleType.MiJing: return cfgMgr.MiJing[ id ];
            case BattleType.Boss: return cfgMgr.Boss[ id ];
            case BattleType.CaiJi: return cfgMgr.CaiJi[ id ];
            default: return null;
        }
    }

    getLastCount(type: BattleType, id: number) {
        switch (type) {
            case BattleType.GuanQia: return Number.MAX_SAFE_INTEGER;
            case BattleType.FuBen: return this.copy.getLastCount(id);
            case BattleType.MiJing: return this.secret.getLastCount(id);
            case BattleType.Boss: return Number.MAX_SAFE_INTEGER;
            case BattleType.CaiJi: return this.gather.getLastCount(id);
            default: return 0;
        }
    }

    getIsCooldown(type: BattleType, id: number) {
        switch (type) {
            case BattleType.Boss: return this.boss.lastCoolTime(id) <= 0;
            case BattleType.CaiJi: return this.gather.lastGatherTime(id) <= 0;
            default: return true;
        }
    }

    getVigorCost(type: BattleType, id: number) {
        switch (type) {
            case BattleType.CaiJi: return 0;
            default: return this.getConfig(type, id).vigorCost;
        }
    }

    resetData() {
        this.copy.reset();
        this.secret.reset();
        this.gather.reset();
    }

    protected override onDecode(data: IBattleData, key: keyof IBattleData) {
        return this[ key ].decode(data[ key ] as any);
    }
}