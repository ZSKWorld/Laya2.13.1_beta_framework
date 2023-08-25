import { GameUtil } from "../../utils/GameUtil";

class BattleData implements IBattleItem {
    constructor() {
        GameUtil.cantSyncObj(this);
    }
}

export class Battle implements IBattle {
    /**关卡数据 */
    level = new BattleData();
    /**副本数据 */
    copy = new BattleData();
    /**秘境数据 */
    secret = new BattleData();
    /**boss数据 */
    boss = new BattleData();
    encode(): IBattle {
        return this;
    }

    decode(data: IBattle): IBattle {
        if (data)
            Object.keys(data).forEach(v => this[ v ] = data[ v ]);
        return this;
    }
}