import { GameUtil } from "../common/GameUtil";
import { MathUtil } from "../libs/math/MathUtil";
import { AttributeEnum } from "../net/enum/AttributeEnum";
/** 玩家数值计算公式 */
export class UserDataFormula {

    /** x ^ 4 * 10 */
    static Exp(level: number) {
        return level ** 4 * 100;
    }

    /** i ^ 2.3 * 100 */
    static BaseATK(level: number) {
        return Math.floor(level ** 2.3 * 100);
    }

    /** i ^ 3 * 100 */
    static BaseHP(level: number) {
        return level ** 3 * 100;
    }
}

export class UserUtil {

    /** 境界转等级 */
    static JingJieToLevel(jingJie: number, cengJi: number) {
        return (jingJie - 1) * (+cfgMgr.Const[1005].value) + cengJi;
    }

    /** 等级转境界 */
    static LevelToJingJie(level: number) {
        let jingJie = 0;
        let cengJi = 0;
        const maxCengJie = +cfgMgr.Const[1005].value;
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
    static GetUpgradExp(jingJie: number, cengJi: number) {
        if (!cfgMgr.JingJie[jingJie + 1]) return 0;
        else return UserDataFormula.Exp(this.JingJieToLevel(jingJie, cengJi));
    }

    /** 获取境界字符串 */
    static GetJingJieStr(jingJie: number, cengJi: number) {
        return cfgMgr.JingJie[jingJie].name + (cengJi ? (MathUtil.ToChineseNum(cengJi) + "层") : "");
    }

    static GetAttributeName = (function () {
        const strs = ["", "攻击", "防御", "生命", "体力", "力量", "耐力", "身法", "命中", "闪避", "暴击", "暴抗", "暴伤", "吸收", "金攻",
            "木攻", "水攻", "火攻", "土攻", "金防", "木防", "水防", "火防", "土防", "五行攻击", "五行防御", "所有属性", "最终伤害", "增加命中",
            "增加暴击", "减免伤害", "减五行攻防",];
        return function (attriType: AttributeEnum) {
            return strs[attriType];
        }
    })();

    static IsEquip(id: number) {
        return !!cfgMgr.Equipment[id];
    }

    static CanUseItem(id: number) {
        return !!(cfgMgr.Props[id] || cfgMgr.Food[id] || cfgMgr.SkillBook[id] || cfgMgr.XinFaBook[id]);
    }

    static getEquipInfoStr(equip: IEquipment, hasGem: boolean) {
        let str = "";
        if (equip) {
            const dressed = userData.body.getDressedEquip(equip.part) == equip;
            str = `
                ${ equip.colorLevelName }${ dressed ? "&nbsp;(已装备)" : "" }<br>
			    ${ this.getEquipStartStr(equip.star) }<br>
                ${ equip.infoStr }
            `;
            const gems = hasGem ? userData.body.getEquipGems(equip.part) : null;
            if (gems) {
                const tableItem = cfgMgr.Item;
                const [gem0, gem1, gem2, gem3] = gems;
                const { quality: quality0, name: name0 } = gem0 ? tableItem[gem0] : {} as any;
                const { quality: quality1, name: name1 } = gem1 ? tableItem[gem1] : {} as any;
                const { quality: quality2, name: name2 } = gem2 ? tableItem[gem2] : {} as any;
                const { quality: quality3, name: name3 } = gem3 ? tableItem[gem3] : {} as any;
                str += `
                    孔1:${ gem0 ? GameUtil.GetColorStr(quality0, name0) : "空" }<br>
                    孔2:${ gem1 ? GameUtil.GetColorStr(quality1, name1) : "空" }<br>
                    孔3:${ gem2 ? GameUtil.GetColorStr(quality2, name2) : "空" }<br>
                    孔4:${ gem3 ? GameUtil.GetColorStr(quality3, name3) : "空" }<br>
                `;
            }
            str += "评分:2.5万";
        }
        return str;
    }

    private static getEquipStartStr(star: number) {
        const maxStar = +cfgMgr.Const[1010].value;
        star = MathUtil.Clamp(star, 0, maxStar);
        let result = "";
        for (let i = 1; i <= maxStar; i++) {
            result += (star >= i ? "★" : "☆");
        }
        return result;
    }
}