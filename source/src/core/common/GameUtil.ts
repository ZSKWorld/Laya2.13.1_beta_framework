import { tableMgr } from "../table/TableManager";
import { RichStrMgr } from "../ui/tool/RichStrMgr";

export class GameUtil {
    static getServerTime() {
        return Date.now();
    }

    static getLang(id: number) { return tableMgr.Lang[ id ].Text; }

    static getColorStr(id: number, text: string) {
        return RichStrMgr.start(text).color(tableMgr.Color[ id ].Color).end();
    }

    /**获取多个物品字符串 */
    static getItemString(items: { id: number, count: number }[], hasCount = true, color = false) {
        let str = "";
        items.forEach((v, index) => str += (color ? this.getColorStr(tableMgr.Item[ v.id ].Quality, tableMgr.Item[ v.id ].Name) : tableMgr.Item[ v.id ].Name)
            + (hasCount ? `x${ v.count }` : "") + (index == items.length - 1 ? "" : "、"));
        return str;
    }
}