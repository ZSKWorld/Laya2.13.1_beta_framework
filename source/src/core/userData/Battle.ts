import { GameUtil } from "../common/GameUtil";
import { Decode } from "./Decode";

export class Battle extends Decode<IBattle> implements IBattle {
    private static readonly ClassName = "BattleData";
    level: IBattleItem;
    copy: IBattleItem;
    secret: IBattleItem;
    boss: IBattleItem;

    getCopyTime(copyId: number) {
        if (!this.copy[ copyId ]) return cfgMgr.FuBen[ copyId ].battleCount;
        return cfgMgr.FuBen[ copyId ].battleCount - (this.copy[ copyId ] ?? 0);
    }

    getSecretTime(secretId: number) {
        if (!this.secret[ secretId ]) return cfgMgr.MiJing[ secretId ].battleCount;
        return cfgMgr.MiJing[ secretId ].battleCount - (this.secret[ secretId ] ?? 0);
    }

    getBossCoolDown(bossId: number) {
        if (!this.boss[ bossId ]) return 0;
        return Math.max(cfgMgr.Boss[ bossId ].coolTime - Math.floor(GameUtil.GetServerTime() / 1000 - (this.boss[ bossId ] ?? 0)), 0);
    }

}