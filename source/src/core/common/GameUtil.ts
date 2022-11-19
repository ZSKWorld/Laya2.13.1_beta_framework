import { MathUtil } from "../libs/math/MathUtil";
import { AttributeEnum } from "../net/enum/AttributeEnum";
import { tableMgr } from "../table/TableManager";
import { RichStrMgr } from "../ui/tool/RichStrMgr";
/** 玩家数值计算公式 */
export class UserDataFormula {

    /** x ^ 4 * 10 */
    static exp(level: number) {
        return level ** 4 * 100;
    }

    /** i ^ 2.3 * 100 */
    static baseATK(level: number) {
        return Math.floor(level ** 2.3 * 100);
    }

    /** i ^ 3 * 100 */
    static baseHP(level: number) {
        return level ** 3 * 100;
    }
}

export class GameUtil {
    static getServerTime() {
        return Date.now();
    }

    static generateUUID() {
        let d = new Date().getTime();
        if (window.performance && typeof window.performance.now === "function") {
            d += performance.now(); //use high-precision timer if available
        }
        const temp = 36;
        const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * temp) % temp | 0;
            d = Math.floor(d / temp);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(temp);
        });
        return uuid;
    }

    static getLang(id: number) { return tableMgr.Lang[ id ].Text; }

    static getColorStr(id: number, text: string) {
        return RichStrMgr.start(text).color(tableMgr.Color[ id ].Color).end();
    }

    static getItemCountStr(item: IItemBase) {
        const { Name, Quality } = tableMgr.Item[ item.id ];
        const color = GameUtil.getColorStr(Quality, Name);
        return RichStrMgr.start().space().combineSpace(`${ color } x${ item.count }`).space().end();
    }
    static getAttributeName = (function () {
        const strs = [ "", "攻击", "防御", "生命", "体力", "力量", "耐力", "身法", "命中", "闪避", "暴击", "暴抗", "暴伤", "吸收", "金攻",
            "木攻", "水攻", "火攻", "土攻", "金防", "木防", "水防", "火防", "土防", "五行攻击", "五行防御", "所有属性", "最终伤害", "增加命中",
            "增加暴击", "减免伤害", "减五行攻防", ];
        return function (attriType: AttributeEnum) {
            return strs[ attriType ];
        }
    })();

    /**获取多个物品字符串 */
    static getItemString(items: { id: number, count: number }[], hasCount = true, color = false) {
        let str = "";
        items.forEach((v, index) => str += (color ? this.getColorStr(tableMgr.Item[ v.id ].Quality, tableMgr.Item[ v.id ].Name) : tableMgr.Item[ v.id ].Name)
            + (hasCount ? `x${ v.count }` : "") + (index == items.length - 1 ? "" : "、"));
        return str;
    }

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

    static isEquip(id: number) {
        return !!tableMgr.Equipment[ id ];
    }

    static canUseItem(id: number) {
        return !!(tableMgr.Props[ id ] || tableMgr.Food[ id ] || tableMgr.SkillBook[ id ] || tableMgr.XinFaBook[ id ]);
    }
}
windowImmit("GameUtil", GameUtil);