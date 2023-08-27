import { GameUtil } from "../../utils/GameUtil";
import { Decode } from "./Decode";

class BattleData extends Decode<IBattleItemData, IBattleItem> implements IBattleItem {
    constructor() {
        super();
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
        return this[key].decode(data[key]);
    }
}