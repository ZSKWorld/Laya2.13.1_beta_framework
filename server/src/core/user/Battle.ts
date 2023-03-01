import { CantSyncObj } from "./CantSyncObj";

export class Battle extends CantSyncObj implements IBattle{
    /**关卡数据 */
    level: KeyData = {};
    /**副本数据 */
    copy: KeyData = {};
    /**秘境数据 */
    secret: KeyData = {};
    /**boss数据 */
    boss: KeyData = {};
}