import { GameUtil } from "../../common/GameUtil";
import { EquipmentPart } from "../../net/enum/ItemEnum";
import { tableMgr } from "../../table/TableManager";
import { BaseProxy } from "./BaseProxy";

export class ItemBase<T extends IItemBase = IItemBase> extends BaseProxy<T> implements IItemBase {
    //#region SourceProperties
    get id(): number { return this.source.id; }
    get count(): number { return this.source.count; }
    //#endregion

    get name() { return tableMgr.Item[ this.id ].Name; }
    get colorName() { return GameUtil.getColorStr(this.quality, this.name); }
    get quality() { return tableMgr.Item[ this.id ].Quality; }
    get color() { return tableMgr.Color[ this.quality ].Color; }
    get description() { return tableMgr.Item[ this.id ].Description; }
    get salable() { return tableMgr.Item[ this.id ].Salable; }
    get useRequire() { return tableMgr.Item[ this.id ].UseRequire; }
    get useRequireStr() { return GameUtil.getJingJieStr(this.useRequire.jingJie, this.useRequire.cengJi); }
}

export class Equipment extends ItemBase<IEquipment> implements IEquipment {
    //#region SourceProperties
    get uid(): string { return this.source.uid; }
    get star(): number { return this.source.star; }
    get level(): number { return this.source.level; }
    get mingKe(): number { return this.source.mingKe; }
    get shenYou(): number { return this.source.shenYou; }
    get mainAttri(): number[] { return this.source.mainAttri; }
    get wuXingAttri(): number[] { return this.source.wuXingAttri; }
    get secondAttri(): number[] { return this.source.secondAttri; }
    get bodyAttri(): number[] { return this.source.bodyAttri; }
    //#endregion

    get part(): EquipmentPart { return tableMgr.Equipment[ this.id ].Part; }
    get levelName() { return this.name + " +" + this.level; }
    get colorLevelName() { return GameUtil.getColorStr(this.quality, this.levelName); }
    get infoStr() {
        const typeStr = [
            "", "武器[攻击]", "头盔[防御]", "项链[特殊]", "衣服[防御]", "戒指[攻击]", "裤子[防御]", "护符[攻击]", "鞋子[防御]",
            "坐骑[特殊]", "时装[特殊]", "暗器[特殊]", "法宝[特殊]",
        ];
        return `类别:${ typeStr[ this.part ] }<br>
        境界需求:${ this.useRequireStr }<br>
        铭刻:0/100<br>
        ${ this.shenYou }阶神佑加成: ${ (/**equip.shenYouAddition */0 * 100).toFixed(2) }%<br>
        ${ this.mainAttri.map(v => GameUtil.getColorStr(this.quality, GameUtil.getAttributeName(v)) + "<br>").join("") }
        ${ this.wuXingAttri.map(v => GameUtil.getColorStr(4, GameUtil.getAttributeName(v)) + "<br>").join("") }
        ${ this.secondAttri.map(v => GameUtil.getColorStr(5, GameUtil.getAttributeName(v)) + "<br>").join("") }
        ${ this.bodyAttri.map(v => GameUtil.getColorStr(8, GameUtil.getAttributeName(v)) + "<br>").join("") }
        `;
    }


}