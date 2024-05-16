import { TimeUtil } from "../common/TimeUtil";
import { ClassName, DecodeObject } from "./DecodeObject";

class MapData<T> extends DecodeObject<T> {
    protected override onDecode(data: T, key: OriginDataKeys<T>) {
        const that = this as unknown as T;
        Object.keys(data[key]).forEach(v => that[key][v] = data[key][v]);
        return that[key];
    }
}

class Level extends MapData<ILevel> implements ILevel {

}

class Copy extends MapData<ICopy> implements ICopy {
    usedMap: KeyMap<number> = {};

    getLastCount(id: number): number {
        const cfg = cfgMgr.Copy[id];
        return cfg.battleCount - (this.usedMap[id] || 0);
    }
}

class Secret extends MapData<ISecret> implements ISecret {
    usedMap: KeyMap<number> = {};

    getLastCount(id: number): number {
        const cfg = cfgMgr.Secret[id];
        return cfg.battleCount - (this.usedMap[id] || 0);
    }
}

class Boss extends MapData<IBoss> implements IBoss {
    lastChallengeTime: KeyMap<number> = {};

    lastCoolTime(id: number): number {
        const lastTime = this.lastChallengeTime[id];
        if (!lastTime) return 0;
        const cfg = cfgMgr.Boss[id];
        return Math.max(cfg.coolTime - (TimeUtil.second() - lastTime), 0);
    }
}

class Gather extends MapData<IGather> implements IGather {
    startTimeMap: KeyMap<number> = {};
    gatherTimeMap: KeyMap<number> = {};

    remainTime(id: number) {
        const startTime = this.startTimeMap[id];
        if (!startTime) return 0;
        return Math.max(this.gatherTimeMap[id] - (TimeUtil.second() - startTime), 0);
    }
}

@ClassName("Battle")
export class Battle extends DecodeObject<IBattle> implements IBattle {
    battleSpeed: number = 1;
    level = new Level();
    copy = new Copy();
    secret = new Secret();
    boss = new Boss();
    gather = new Gather();

    protected override onDecode(data: OriginData<IBattle>, key: OriginDataKeys<IBattle>) {
        switch (key) {
            case "battleSpeed": return data[key];
            default: return this[key].decode(data[key] as any);
        }
    }

}