import { GameUtil } from "../common/GameUtil";
import { MathUtil } from "../libs/math/MathUtil";
import { tableMgr } from "../table/TableManager";
import { UserDataFormula } from "./UserDataFormula";

export class UserDataUtil {
    /** 境界转等级 */
    static jingJieToLevel(jingJie: number, cengJi: number) {
        return (jingJie - 1) * (+tableMgr.Const[ 1005 ].Value) + cengJi;
    }

    /** 等级转境界 */
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

    /** 获取升级经验 */
    static getUpgradExp(jingJie: number, cengJi: number) {
        if (!tableMgr.JingJie[ jingJie + 1 ]) return 0;
        else return UserDataFormula.exp(this.jingJieToLevel(jingJie, cengJi));
    }

    /** 获取境界字符串 */
    static getJingJieStr(jingJie: number, cengJi: number) {
        return tableMgr.JingJie[ jingJie ].Name + (cengJi ? (MathUtil.ToChineseNum(cengJi) + "层") : "");
    }

    /** 获取最大精力 */
    static getMaxVigro(citta: KeyData) {
        let xinFaJL = 0;
        Object.keys(citta).forEach(v => xinFaJL += (citta[ v ] * tableMgr.XinFaBook[ v ].JLAdd));
        return Math.floor(86400 + xinFaJL);
    }

    /** 获取精力恢复 */
    static jingLiHuiFu(citta: KeyData) {
        let xinFaJLHF = 0;
        Object.keys(citta).forEach(v => xinFaJLHF += (citta[ v ] * tableMgr.XinFaBook[ v ].JLHFAdd));
        return 1 + xinFaJLHF;
    }

    /** 副本剩余次数 */
    static getCopyTime(copyId: number, copy: KeyData) {
        return tableMgr.FuBen[ copyId ].BattleCount - (copy[ copyId ] ?? 0);
    }
    /** 秘境剩余次数 */
    static getSecretTime(secretId: number, secret: KeyData) {
        return tableMgr.FuBen[ secretId ].BattleCount - (secret[ secretId ] ?? 0);
    }
    /** 获取boss剩余冷却时间 */
    static getBossCoolDown(bossId: number, boss: KeyData) {
        return Math.max(tableMgr.Boss[ bossId ].CoolTime - Math.floor(GameUtil.getServerTime() / 1000 - (boss[ bossId ] ?? 0)), 0);
    }
}