import { eventMgr } from "../libs/event/EventManager";
import { richStrMgr } from "../ui/tool/RichStrManager";
import { tipMgr } from "../ui/tool/TipManager";
import { GameEvent } from "./GameEvent";


export class GameUtil {
    static GetTimeStamp() {
        return Date.now();
    }

    static GetSecondStamp() {
        return Math.floor(Date.now() / 1000);
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

    static GetColorStr(id: number, text: string) {
        return richStrMgr.start(text).color(cfgMgr.Color[id].color).end();
    }

    static ShowRewardsTip(title: string, rewards: IGoodsData[]) {
        let logStr = richStrMgr.start(title);
        title && logStr.break();
        rewards.forEach(v => {
            const str = GameUtil.GetItemCountStr(v.id, v.count);
            tipMgr.showTip(`恭喜获得${ str }`);
            logStr.combineBreak(str);
        });
        eventMgr.event(GameEvent.AddExperienceLog, logStr.end());
    }

    /** 获取物品数量字符串 */
    static GetItemCountStr(id: number, count?: number) {
        const { name, quality } = cfgMgr.Item[id];
        const color = GameUtil.GetColorStr(quality, name);
        return richStrMgr.start().space().combineSpace(`${ color }${ count != null ? " x" + count : "" }`).space().end();
    }

    /**获取多个物品字符串 */
    static GetItemString(items: IGoodsData[], hasCount = true, color = false) {
        let str = "";
        items.forEach((v, index) => str += (color ? this.GetColorStr(cfgMgr.Item[v.id].quality, cfgMgr.Item[v.id].name) : cfgMgr.Item[v.id].name)
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
windowImmit("GameUtil", GameUtil);