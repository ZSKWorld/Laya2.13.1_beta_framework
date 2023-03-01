import { GameUtil } from "../../utils/GameUtil";

class BattleData implements IBattleData {
    constructor() {
        GameUtil.cantSyncObj(this);
    }
}

export class Battle implements IBattle {
    /**关卡数据 */
    level: IBattleData = new BattleData();
    /**副本数据 */
    copy: IBattleData = new BattleData();
    /**秘境数据 */
    secret: IBattleData = new BattleData();
    /**boss数据 */
    boss: IBattleData = new BattleData();
}