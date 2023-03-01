import { tableMgr } from "../core/table/TableManager";
import { TimeUtil } from "./TimeUtil";

export class GameUtil {
    static isEquip(id: number) { return !!tableMgr.Equipment[ id ]; }
    static isProp(id: number) { return !!tableMgr.Props[ id ]; }
    static isFood(id: number) { return !!tableMgr.Food[ id ]; }
    static isSkillBook(id: number) { return !!tableMgr.SkillBook[ id ]; }
    static isXinFaBook(id: number) { return !!tableMgr.XinFaBook[ id ]; }

    /**
     * 检查当前境界是否满足物品境界需求
     * @param data 用户数据
     * @param id 物品id
     * @returns 
     */
    static checkJingJieEnough(data: IUser, id: number): boolean {
        const item = tableMgr.Item[ id ];
        if (!item) return false;
        const { jingJie: checkedJingJie, cengJi: checkedCengJi } = item.UseRequire;
        const { jingJie, cengJi } = data.base;
        return jingJie > checkedJingJie || (jingJie == checkedJingJie && cengJi >= checkedCengJi);
    }

    /** 获取可使用的物品 */
    static getUsableItem(id: number) {
        const [ prop, food, skillBook, xinFaBook ] = [
            tableMgr.Props[ id ], tableMgr.Food[ id ], tableMgr.SkillBook[ id ], tableMgr.XinFaBook[ id ],
        ];
        return prop || food || skillBook || xinFaBook;
    }

    /** 获取离线奖励 */
    static getOffline(data: IUser): IOffline {
        if (!data.account.lastOnlineTime) return null;
        const timeOffset = ((TimeUtil.getTimeStamp() - data.account.lastOnlineTime) / 1000) << 0;
        if (timeOffset <= 5) return null;
        else return this.cantSyncObj({ offlineTime: timeOffset, vigor: (this.getVigorRecoveryRate(data) * timeOffset) << 0 });
    }

    /** 获取精力回复速率 */
    static getVigorRecoveryRate(data: IUser) {
        const citta = data.base.citta;
        let xinFaJLHF = 0;
        Object.keys(citta).forEach(v => xinFaJLHF += (citta[ v ] * tableMgr.XinFaBook[ v ].JLHFAdd));
        return 1 + xinFaJLHF;
    }

    /** 获取最大精力值 */
    static getMaxVigro(data:IUser) {
        const citta = data.base.citta;
        let xinFaJL = 0;
        Object.keys(citta).forEach(v => xinFaJL += (citta[ v ] * tableMgr.XinFaBook[ v ].JLAdd));
        return Math.floor(86400 + xinFaJL);
    }

    /**境界转等级 */
    static jingJieToLevel(jingJie: number, cengJi: number) {
        return (jingJie - 1) * (+tableMgr.Const[ 1005 ].Value) + cengJi;
    }

    /**等级转境界 */
    static levelToJingJie(level: number) {
        let jingJie = 0;
        let cengJi = 0;
        const maxCengJie = +tableMgr.Const[ 1005 ].Value;
        if (level % maxCengJie == 0) {
            jingJie = level / maxCengJie;
            cengJi = maxCengJie;
        } else {
            jingJie = Math.floor(level / maxCengJie);
            cengJi = level - jingJie * maxCengJie;
            jingJie += 1;
        }
        return { jingJie, cengJi };
    }

    static cantSyncObj<T>(obj: T) {
        if (typeof obj == "object") {
            Object.defineProperty(obj, "CantSyncObj", {
                configurable: false,
                enumerable: false,
                value: true,
            });
        }
        return obj;
    }
}