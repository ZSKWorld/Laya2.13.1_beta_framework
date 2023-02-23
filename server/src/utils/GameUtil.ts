import { tableMgr } from "../core/table/TableManager";
import { TimeUtil } from "./TimeUtil";

export class GameUtil {
    static isEquip(id: number) { return !!tableMgr.Equipment[ id ]; }
    static isProp(id: number) { return !!tableMgr.Props[ id ]; }
    static isFood(id: number) { return !!tableMgr.Food[ id ]; }
    static isSkillBook(id: number) { return !!tableMgr.SkillBook[ id ]; }
    static isXinFaBook(id: number) { return !!tableMgr.XinFaBook[ id ]; }

    /** 获取可使用的物品 */
    static getUsableItem(id: number) {
        const [ prop, food, skillBook, xinFaBook ] = [
            tableMgr.Props[ id ], tableMgr.Food[ id ], tableMgr.SkillBook[ id ], tableMgr.XinFaBook[ id ],
        ];
        return prop || food || skillBook || xinFaBook;
    }

    /** 获取离线奖励 */
    static getOffline(data: IUser): IOffline {
        if (!data.lastOnlineTime) return null;
        const timeOffset = ((TimeUtil.getTimeStamp() - data.lastOnlineTime) / 1000) << 0;
        if (timeOffset <= 5) return null;
        else return { offlineTime: timeOffset, vigor: (this.getVigorRecoveryRate(data) * timeOffset) << 0 };
    }

    /** 获取精力回复速率 */
    static getVigorRecoveryRate(data: IUser) {
        const citta = data.citta;
        let xinFaJLHF = 0;
        Object.keys(citta).forEach(v => xinFaJLHF += (citta[ v ] * tableMgr.XinFaBook[ v ].JLHFAdd));
        return 1 + xinFaJLHF;
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
}