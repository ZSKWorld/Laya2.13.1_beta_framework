import { GameUtil } from "../common/GameUtil";
import { Decode } from "./Decode";

class Level extends Decode<ILevelData> implements ILevel {

}

class Copy extends Decode<ICopyData> implements ICopy {
    usedMap: KeyMap<number> = null;

    getLastCount(id: number): number {
        const cfg = cfgMgr.FuBen[ id ];
        if (!cfg) return 0;
        if (!this.usedMap) return cfg.battleCount;
        return cfg.battleCount - (this.usedMap[ id ] || 0);
    }
}

class Secret extends Decode<ISecretData> implements ISecret {
    usedMap: KeyMap<number> = null;

    getLastCount(id: number): number {
        const cfg = cfgMgr.MiJing[ id ];
        if (!cfg) return 0;
        if (!this.usedMap) return cfg.battleCount;
        return cfg.battleCount - (this.usedMap[ id ] || 0);
    }
}

class Boss extends Decode<IBossData> implements IBoss {
    usedMap: KeyMap<number> = null;
    lastChallengeTime: KeyMap<number> = null;

    lastCooldownTime(id: number): number {
        const cfg = cfgMgr.Boss[ id ];
        if (!cfg) return Number.MAX_SAFE_INTEGER;
        if (!this.lastChallengeTime) return 0;
        const lastTime = this.lastChallengeTime[ id ];
        if (!lastTime) return 0;
        return cfg.coolTime - (GameUtil.GetSecondStamp() - lastTime);
    }

    isCooldown(id: number): boolean {
        const cfg = cfgMgr.Boss[ id ];
        if (!cfg) return false;
        if (!this.lastChallengeTime) return true;
        const lastTime = this.lastChallengeTime[ id ];
        if (!lastTime) return true;
        return (GameUtil.GetSecondStamp() - lastTime) >= cfg.coolTime;
    }
}

class Gather extends Decode<IGatherData> implements IGather {
    usedMap: KeyMap<number> = null;
    startTimeMap: KeyMap<number> = null;

    getLastCount(id: number): number {
        const cfg = cfgMgr.CaiJi[ id ];
        if (!this.usedMap) return cfg.gatherCount;
        return cfg.gatherCount - (this.usedMap[ id ] || 0);
    }

    isGathering(id: number) {
        if (!this.startTimeMap) return false;
        return this.startTimeMap[ id ] != null;
    }

    lastGatherTime(id: number) {
        if (!this.startTimeMap) return 0;
        const startTime = this.startTimeMap[ id ];
        if (!startTime) return 0;
        const cfg = cfgMgr.CaiJi[ id ];
        return Math.max(cfg.gatherTime - (GameUtil.GetSecondStamp() - startTime), 0);
    }
}

export class Battle extends Decode<IBattleData> implements IBattle {
    private static readonly ClassName = "BattleData";
    level = new Level();
    copy = new Copy();
    secret = new Secret();
    boss = new Boss();
    gather = new Gather();

    protected override onDecode(data: IBattleData, key: keyof IBattleData) {
        return this[ key ].decode(data[ key ] as any);
    }

}