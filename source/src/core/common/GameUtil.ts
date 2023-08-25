import { MathUtil } from "../libs/math/MathUtil";
import { AttributeEnum } from "../net/enum/AttributeEnum";
import { richStrMgr } from "../ui/tool/RichStrManager";
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

export class GameUtil {
    static GetServerTime() {
        return Date.now();
    }

    static GenerateUUID() {
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

    static GetLang(id: number) { return cfgMgr.Lang[ id ].Text; }

    static GetColorStr(id: number, text: string) {
        return richStrMgr.start(text).color(cfgMgr.Color[ id ].Color).end();
    }

    static GetItemCountStr(item: IItemBaseData) {
        const { Name, Quality } = cfgMgr.Item[ item.id ];
        const color = GameUtil.GetColorStr(Quality, Name);
        return richStrMgr.start().space().combineSpace(`${ color } x${ item.count }`).space().end();
    }
    static GetAttributeName = (function () {
        const strs = [ "", "攻击", "防御", "生命", "体力", "力量", "耐力", "身法", "命中", "闪避", "暴击", "暴抗", "暴伤", "吸收", "金攻",
            "木攻", "水攻", "火攻", "土攻", "金防", "木防", "水防", "火防", "土防", "五行攻击", "五行防御", "所有属性", "最终伤害", "增加命中",
            "增加暴击", "减免伤害", "减五行攻防", ];
        return function (attriType: AttributeEnum) {
            return strs[ attriType ];
        }
    })();

    /**获取多个物品字符串 */
    static GetItemString(items: { id: number, count: number }[], hasCount = true, color = false) {
        let str = "";
        items.forEach((v, index) => str += (color ? this.GetColorStr(cfgMgr.Item[ v.id ].Quality, cfgMgr.Item[ v.id ].Name) : cfgMgr.Item[ v.id ].Name)
            + (hasCount ? `x${ v.count }` : "") + (index == items.length - 1 ? "" : "、"));
        return str;
    }

    /** 境界转等级 */
    static JingJieToLevel(jingJie: number, cengJi: number) {
        return (jingJie - 1) * (+cfgMgr.Const[ 1005 ].Value) + cengJi;
    }

    /** 等级转境界 */
    static LevelToJingJie(level: number) {
        let jingJie = 0;
        let cengJi = 0;
        const maxCengJie = +cfgMgr.Const[ 1005 ].Value;
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
        if (!cfgMgr.JingJie[ jingJie + 1 ]) return 0;
        else return UserDataFormula.Exp(this.JingJieToLevel(jingJie, cengJi));
    }

    /** 获取境界字符串 */
    static GetJingJieStr(jingJie: number, cengJi: number) {
        return cfgMgr.JingJie[ jingJie ].Name + (cengJi ? (MathUtil.ToChineseNum(cengJi) + "层") : "");
    }

    static IsEquip(id: number) {
        return !!cfgMgr.Equipment[ id ];
    }

    static CanUseItem(id: number) {
        return !!(cfgMgr.Props[ id ] || cfgMgr.Food[ id ] || cfgMgr.SkillBook[ id ] || cfgMgr.XinFaBook[ id ]);
    }

    /** 物理分辨率x坐标转逻辑分辨率x坐标 */
    static PRX2LRX(x: number) {
        return Math.round(x * Laya.stage.width / Laya.Browser.clientWidth);
    }

    /** 物理分辨率y坐标转逻辑分辨率y坐标 */
    static PRY2LRY(y: number) {
        return Math.round(y * Laya.stage.height / Laya.Browser.clientHeight);
    }

    /** 逻辑分辨率x坐标转物理分辨率x坐标 */
    static LRX2PRX(x: number) {
        return Math.round(x / (Laya.stage.width / Laya.Browser.clientWidth));
    }

    /** 逻辑分辨率y坐标转物理分辨率y坐标 */
    static LRY2PRY(y: number) {
        return Math.round(y / (Laya.stage.height / Laya.Browser.clientHeight));
    }
}
windowImmit("GameUtil", GameUtil);