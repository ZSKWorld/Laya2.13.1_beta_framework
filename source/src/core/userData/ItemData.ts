import { GameUtil } from "../common/GameUtil";
import { EquipmentPart } from "../net/enum/ItemEnum";
import { DecodeData } from "./DecodeData";

export class ItemBase<T extends IItemBase = IItemBase> extends DecodeData<T> implements IItemBase {
    protected static readonly ClassName: string = "ItemBase";
    //#region Properties
    id: number;
    count: number;
    //#endregion

    get name() { return cfgMgr.Item[ this.id ].Name; }
    get colorName() { return GameUtil.GetColorStr(this.quality, this.name); }
    get quality() { return cfgMgr.Item[ this.id ].Quality; }
    get color() { return cfgMgr.Color[ this.quality ].Color; }
    get description() { return cfgMgr.Item[ this.id ].Description; }
    get salable() { return cfgMgr.Item[ this.id ].Salable; }
    get useRequire() { return cfgMgr.Item[ this.id ].UseRequire; }
    get useRequireStr() { return GameUtil.GetJingJieStr(this.useRequire.jingJie, this.useRequire.cengJi); }

}

export class Equipment extends ItemBase<IEquipment> implements IEquipment {
    protected static override readonly ClassName = "Equipment";
    //#region Properties
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

    get part(): EquipmentPart { return cfgMgr.Equipment[ this.id ].Part; }
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
        ${ this.mainAttri.map(v => GameUtil.GetColorStr(this.quality, GameUtil.GetAttributeName(v)) + "<br>").join("") }
        ${ this.wuXingAttri.map(v => GameUtil.GetColorStr(4, GameUtil.GetAttributeName(v)) + "<br>").join("") }
        ${ this.secondAttri.map(v => GameUtil.GetColorStr(5, GameUtil.GetAttributeName(v)) + "<br>").join("") }
        ${ this.bodyAttri.map(v => GameUtil.GetColorStr(8, GameUtil.GetAttributeName(v)) + "<br>").join("") }
        `;
    }
}