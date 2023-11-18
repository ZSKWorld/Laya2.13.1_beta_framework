import { GameUtil } from "../common/GameUtil";
import { EquipmentPart } from "../net/enum/ItemEnum";
import { Decode } from "./Decode";
import { UserUtil } from "./UserUtil";
class Item<T> extends Decode<T>{
    id: number;

    get name() { return cfgMgr.Item[ this.id ].name; }
    get colorName() { return GameUtil.GetColorStr(this.quality, this.name); }
    get quality() { return cfgMgr.Item[ this.id ].quality; }
    get color() { return cfgMgr.Color[ this.quality ].color; }
    get description() { return cfgMgr.Item[ this.id ].desc; }
    get salable() { return cfgMgr.Item[ this.id ].salable; }
    get useRequire() { return cfgMgr.Item[ this.id ].useRequire; }
    get useRequireStr() { return UserUtil.GetJingJieStr(this.useRequire.jingJie, this.useRequire.cengJi); }
}

export class Goods extends Item<IGoodsData> implements IGoods {
    protected static readonly ClassName: string = "ItemBase";
    protected static readonly DontDispatch = true;
    count: number;

}

export class Equipment extends Item<IEquipmentData> implements IEquipment {
    protected static readonly ClassName = "Equipment";
    //#region 字段
    uid: string;
    star: number;
    level: number;
    mingKe: number;
    shenYou: number;
    mainAttri: number[];
    wuXingAttri: number[];
    secondAttri: number[];
    bodyAttri: number[];
    //#endregion

    get part() { return cfgMgr.Equipment[ this.id ].part as EquipmentPart; }
    get levelName() { return this.name + " +" + this.level; }
    get colorLevelName() { return GameUtil.GetColorStr(this.quality, this.levelName); }
    get infoStr() {
        const typeStr = [
            "", "武器[攻击]", "头盔[防御]", "项链[特殊]", "衣服[防御]", "戒指[攻击]", "裤子[防御]", "护符[攻击]", "鞋子[防御]",
            "坐骑[特殊]", "时装[特殊]", "暗器[特殊]", "法宝[特殊]",
        ];
        return `类别:${ typeStr[ this.part ] }<br>
        境界需求:${ this.useRequireStr }<br>
        铭刻:0/100<br>
        ${ this.shenYou }阶神佑加成: ${ (/**equip.shenYouAddition */0 * 100).toFixed(2) }%<br>
        ${ this.mainAttri.map(v => GameUtil.GetColorStr(this.quality, UserUtil.GetAttributeName(v)) + "<br>").join("") }
        ${ this.wuXingAttri.map(v => GameUtil.GetColorStr(4, UserUtil.GetAttributeName(v)) + "<br>").join("") }
        ${ this.secondAttri.map(v => GameUtil.GetColorStr(5, UserUtil.GetAttributeName(v)) + "<br>").join("") }
        ${ this.bodyAttri.map(v => GameUtil.GetColorStr(8, UserUtil.GetAttributeName(v)) + "<br>").join("") }
        `;
    }
}