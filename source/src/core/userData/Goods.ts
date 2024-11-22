import { GameUtil } from "../common/GameUtil";
import { EquipmentPart } from "./const/ItemEnum";
import { ClassDontDispatch, ClassName, DecodeObject } from "./DecodeObject";
import { UserUtil } from "./UserUtil";
class GoodsBase<T> extends DecodeObject<T> implements IGoodsBase<T> {
    id: number;

    get name() { return cfgMgr.Item[this.id].name; }
    get colorName() { return GameUtil.getColorStr(this.quality, this.name); }
    get quality() { return cfgMgr.Item[this.id].quality; }
    get color() { return cfgMgr.Color[this.quality].color; }
    get description() { return cfgMgr.Item[this.id].desc; }
    get salable() { return cfgMgr.Item[this.id].salable; }
    get useRequire() { return cfgMgr.Item[this.id].useRequire; }
    get useRequireStr() { return UserUtil.getJingJieStr(this.useRequire.jingJie, this.useRequire.cengJi); }
}

@ClassDontDispatch
@ClassName("Goods")
export class Goods extends GoodsBase<IGoods> implements IGoods {
    count: number;

}

@ClassName("Equipment")
export class Equipment extends GoodsBase<IEquipment> implements IEquipment {
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

    get part() { return cfgMgr.Equipment[this.id].part as EquipmentPart; }
    get levelName() { return this.name + " +" + this.level; }
    get colorLevelName() { return GameUtil.getColorStr(this.quality, this.levelName); }
    get infoStr() {
        const typeStr = [
            "", "武器[攻击]", "头盔[防御]", "项链[特殊]", "衣服[防御]", "戒指[攻击]", "裤子[防御]", "护符[攻击]", "鞋子[防御]",
            "坐骑[特殊]", "时装[特殊]", "暗器[特殊]", "法宝[特殊]",
        ];
        return `类别:${ typeStr[this.part] }<br/>
        境界需求:${ this.useRequireStr }<br/>
        铭刻:0/100<br/>
        ${ this.shenYou }阶神佑加成: ${ (/**equip.shenYouAddition */0 * 100).toFixed(2) }%<br/>
        ${ this.mainAttri.map(v => GameUtil.getColorStr(this.quality, UserUtil.getAttributeName(v)) + "<br/>").join("") }
        ${ this.wuXingAttri.map(v => GameUtil.getColorStr(4, UserUtil.getAttributeName(v)) + "<br/>").join("") }
        ${ this.secondAttri.map(v => GameUtil.getColorStr(5, UserUtil.getAttributeName(v)) + "<br/>").join("") }
        ${ this.bodyAttri.map(v => GameUtil.getColorStr(8, UserUtil.getAttributeName(v)) + "<br/>").join("") }
        `;
    }
    get score() { return 0; }
}