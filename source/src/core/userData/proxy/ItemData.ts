import { GameUtil } from "../../common/GameUtil";
import { EquipmentPart } from "../../net/enum/ItemEnum";
import { tableMgr } from "../../table/TableManager";

export class ItemBase implements IItemBase {
    //#region Properties
    id: number;
    count: number;
    //#endregion

    get name() { return tableMgr.Item[ this.id ].Name; }
    get colorName() { return GameUtil.GetColorStr(this.quality, this.name); }
    get quality() { return tableMgr.Item[ this.id ].Quality; }
    get color() { return tableMgr.Color[ this.quality ].Color; }
    get description() { return tableMgr.Item[ this.id ].Description; }
    get salable() { return tableMgr.Item[ this.id ].Salable; }
    get useRequire() { return tableMgr.Item[ this.id ].UseRequire; }
    get useRequireStr() { return GameUtil.GetJingJieStr(this.useRequire.jingJie, this.useRequire.cengJi); }

    static Decode(data: IItemBase) {
        if (!data) return null;
        const result = new ItemBase();
        result.id = data.id;
        result.count = data.count;
        return result;
    }
}

export class Equipment extends ItemBase implements IEquipment {
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

    get part(): EquipmentPart { return tableMgr.Equipment[ this.id ].Part; }
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

    static override Decode(data: IEquipment) {
        if (!data) return null;
        const result = new Equipment();
        result.id = data.id;
        result.count = data.count;
        result.uid = data.uid;
        result.star = data.star;
        result.level = data.level;
        result.mingKe = data.mingKe;
        result.shenYou = data.shenYou;
        result.mainAttri = data.mainAttri;
        result.wuXingAttri = data.wuXingAttri;
        result.secondAttri = data.secondAttri;
        result.bodyAttri = data.bodyAttri;
        return result;
    }

}