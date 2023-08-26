import { GameUtil } from "../common/GameUtil";
import { Decode } from "./Decode";

export class Battle extends Decode<IBattle> implements IBattle {
    private static readonly ClassName = "BattleData";
    level: IBattleItem;
    copy: IBattleItem;
    secret: IBattleItem;
    boss: IBattleItem;

    getCopyTime(copyId: number) {
        return cfgMgr.FuBen[ copyId ].battleCount - (this.copy[ copyId ] ?? 0);
    }

    getSecretTime(secretId: number) {
        return cfgMgr.MiJing[ secretId ].battleCount - (this.secret[ secretId ] ?? 0);
    }

    getBossCoolDown(bossId: number) {
        return Math.max(cfgMgr.Boss[ bossId ].coolTime - Math.floor(GameUtil.GetServerTime() / 1000 - (this.boss[ bossId ] ?? 0)), 0);
    }

}