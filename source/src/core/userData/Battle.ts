import { GameUtil } from "../common/GameUtil";
import { ClassName, DecodeObject } from "./DecodeObject";

class Level extends DecodeObject<ILevelData> implements ILevel {

}

class Copy extends DecodeObject<ICopyData> implements ICopy {
    usedMap: KeyMap<number> = null;

    getLastCount(id: number): number {
        const cfg = cfgMgr.Copy[id];
        if (!this.usedMap) return cfg.battleCount;
        return cfg.battleCount - (this.usedMap[id] || 0);
    }
}

class Secret extends DecodeObject<ISecretData> implements ISecret {
    usedMap: KeyMap<number> = null;

    getLastCount(id: number): number {
        const cfg = cfgMgr.Secret[id];
        if (!this.usedMap) return cfg.battleCount;
        return cfg.battleCount - (this.usedMap[id] || 0);
    }
}

class Boss extends DecodeObject<IBossData> implements IBoss {
    lastChallengeTime: KeyMap<number> = null;

    lastCooldownTime(id: number): number {
        if (!this.lastChallengeTime) return 0;
        const lastTime = this.lastChallengeTime[id];
        if (!lastTime) return 0;
        const cfg = cfgMgr.Boss[id];
        return Math.max(cfg.coolTime - (GameUtil.GetSecondStamp() - lastTime), 0);
    }
}

class Gather extends DecodeObject<IGatherData> implements IGather {
    startTimeMap: KeyMap<number> = null;
    gatherTimeMap: KeyMap<number> = null;

    remainTime(id: number) {
        if (!this.startTimeMap) return 0;
        const startTime = this.startTimeMap[id];
        if (!startTime) return 0;
        return Math.max(this.gatherTimeMap[id] - (GameUtil.GetSecondStamp() - startTime), 0);
    }
}

@ClassName("BattleData")
export class Battle extends DecodeObject<IBattleData> implements IBattle {
    level = new Level();
    copy = new Copy();
    secret = new Secret();
    boss = new Boss();
    gather = new Gather();

    protected override onDecode(data: IBattleData, key: keyof IBattleData) {
        return this[key].decode(data[key] as any);
    }

}