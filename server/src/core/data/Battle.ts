import { GameUtil } from "../../utils/GameUtil";
import { Decode } from "./Decode";

class BattleData implements IBattleItem {
    constructor() {
        GameUtil.cantSyncObj(this);
    }
}

export class Battle extends Decode<IBattleData, IBattle> implements IBattle {
    /**关卡数据 */
    level = new BattleData();
    /**副本数据 */
    copy = new BattleData();
    /**秘境数据 */
    secret = new BattleData();
    /**boss数据 */
    boss = new BattleData();

    protected override onDecode(data: IBattleData, key: keyof IBattleData) {
        const value = this[ key ];
        Object.keys(data[ key ]).forEach(v => {
            value[ key ] = data[ key ];
        });
        return value;
    }
}