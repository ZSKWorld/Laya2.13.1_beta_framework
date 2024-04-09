import { GameUtil } from "../common/GameUtil";
import { ClassName, DecodeObject } from "./DecodeObject";

class MapData<T> extends DecodeObject<T> {
    protected override onDecode(data: T, key: keyof T): T[keyof T] {
        const that = this as unknown as T;
        Object.keys(data[key]).forEach(v => that[key][v] = data[key][v]);
        return that[key];
    }
}

class Level extends MapData<ILevelData> implements ILevel {

}

class Copy extends MapData<ICopyData> implements ICopy {
    usedMap: KeyMap<number> = {};

    getLastCount(id: number): number {
        const cfg = cfgMgr.Copy[id];
        return cfg.battleCount - (this.usedMap[id] || 0);
    }
}

let a = new Copy()
a.decode(null)

class Secret extends MapData<ISecretData> implements ISecret {
    usedMap: KeyMap<number> = {};

    getLastCount(id: number): number {
        const cfg = cfgMgr.Secret[id];
        return cfg.battleCount - (this.usedMap[id] || 0);
    }

}

class Boss extends MapData<IBossData> implements IBoss {
    lastChallengeTime: KeyMap<number> = {};

    lastCooldownTime(id: number): number {
        const lastTime = this.lastChallengeTime[id];
        if (!lastTime) return 0;
        const cfg = cfgMgr.Boss[id];
        return Math.max(cfg.coolTime - (GameUtil.GetSecondStamp() - lastTime), 0);
    }
}

class Gather extends MapData<IGatherData> implements IGather {
    startTimeMap: KeyMap<number> = {};
    gatherTimeMap: KeyMap<number> = {};

    remainTime(id: number) {
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