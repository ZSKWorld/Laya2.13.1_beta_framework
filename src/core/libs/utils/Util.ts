import { AttributeType } from "../../playerData/Interface";
import { tableMgr } from "../../table/TableManager";
import { MathUtil } from "../math/MathUtil";


/**
 * 扩展类字段，用于在外部定义的字段在内部可读，扩展的字段或方法不能在构造期间调用
 * @param cls 要扩展的类
 * @returns
 */
export function ExtensionClass<E, T>(cls: { new(...args: any) }) {
    return cls as unknown as { new(): T & E };
}
/**获取境界字符串 */
export function GetJingJieString(jingJie: number, cengJi: number) {
    return tableMgr.JingJie[jingJie].Name + (cengJi ? (MathUtil.ToChineseNum(cengJi) + "层") : "");
}

export function GetLang(id: number) { return tableMgr.Lang[id].Text; }
/**根据品质获取颜色字符串 */
export function GetColorStr(id: number, text: string) { return `[color=${tableMgr.Color[id].Color}]${text}[/color]`; }
/**获取多个物品字符串 */
export function GetItemString(items: { id: number, count: number }[], hasCount = true, color = false) {
    let str = "";
    items.forEach((v, index) => str += (color ? GetColorStr(tableMgr.Item[v.id].Quality, tableMgr.Item[v.id].Name) : tableMgr.Item[v.id].Name)
        + (hasCount ? `x${v.count}` : "") + (index == items.length - 1 ? "" : "、"));
    return str;
}
/**境界转等级 */
export function jingJieToLevel(jingJie: number, cengJi: number) {
    return (jingJie - 1) * (+tableMgr.Const[1005].Value) + cengJi;
}
/**等级转境界 */
export function levelToJingJie(level: number) {
    let jingJie = 0;
    let cengJi = 0;
    const maxCengJie = +tableMgr.Const[1005].Value;
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
export const GetAttributeName = (function () {
    const strs = ["", "攻击", "防御", "生命", "体力", "力量", "耐力", "身法", "命中", "闪避", "暴击", "暴抗", "暴伤", "吸收", "金攻",
        "木攻", "水攻", "火攻", "土攻", "金防", "木防", "水防", "火防", "土防", "五行攻击", "五行防御", "所有属性", "最终伤害", "增加命中",
        "增加暴击", "减免伤害", "减五行攻防",];
    return function (attriType: AttributeType) {
        return strs[attriType];
    }
})();
