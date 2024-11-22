import { richTextMgr } from "../ui/tool/RichStrManager";
import { TimeUtil } from "./TimeUtil";


export class GameUtil {

    static createUUID() {
        let d = TimeUtil.milliSecond();
        if (window.performance && typeof window.performance.now === "function") {
            d += performance.now(); //use high-precision timer if available
        }
        const uuid = 'xyxyxyxyxyxyxyxy'.replace(/[xy]/g, function (c) {
            const r = (d + Math.random() * 36) % 36 | 0;
            d = Math.floor(d / 36);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(36);
        });
        return uuid;
    }

    static getColorStr(id: number, text: string) {
        return richTextMgr.start(text).color(cfgMgr.Color[id].color).end();
    }

    /** 获取物品数量字符串 */
    static getItemCountStr(id: number, count?: number) {
        const { name, quality } = cfgMgr.Item[id];
        const color = GameUtil.getColorStr(quality, name);
        return richTextMgr.start().space().append(`${ color }${ count != null ? " x" + count : "" }`).space().end();
    }

    /**获取多个物品字符串 */
    static getItemString(items: OriginData<IGoods>[], hasCount = true, color = false) {
        let str = "";
        items.forEach((v, index) => str += (color ? this.getColorStr(cfgMgr.Item[v.id].quality, cfgMgr.Item[v.id].name) : cfgMgr.Item[v.id].name)
            + (hasCount ? `x${ v.count }` : "") + (index == items.length - 1 ? "" : "、"));
        return str;
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
WindowImmit("GameUtil", GameUtil);