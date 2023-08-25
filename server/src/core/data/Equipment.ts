import { MathUtil } from "../../utils/MathUtil";
import { Util } from "../../utils/Util";
import { EquipmentPart } from "../enum/ItemEnum";
import { tableMgr } from "../config/TableManager";
import { ItemBase } from "./ItemBase";

export class Equipment extends ItemBase implements IEquipment {
    uid: string = Util.CreateUID();
    star: number = 0;
    level: number = 0;
    mingKe: number = 0;
    shenYou: number = 0;
    mainAttri: number[] = [];
    wuXingAttri: number[] = [];
    secondAttri: number[] = [];
    bodyAttri: number[] = [];
    get part(): EquipmentPart {
        return tableMgr.Equipment[ this.id ].Part;
    }
    constructor(id: number = 0) {
        super(id, 1);
    }

    createAttribute():IEquipment {
        const { Main, WuXing, Second, Body } = tableMgr.EquipmentAddition[ this.part ];
        this.star = MathUtil.RandomInt(1, +tableMgr.Const[ 1010 ].Value);
        Equipment.randomAttribute([ ...Main ], this.mainAttri, false).sort(Equipment.sortFunc);
        Equipment.randomAttribute([ ...WuXing ], this.wuXingAttri, true).sort(Equipment.sortFunc);
        Equipment.randomAttribute([ ...Second ], this.secondAttri, true).sort(Equipment.sortFunc);
        Equipment.randomAttribute([ ...Body ], this.bodyAttri, true).sort(Equipment.sortFunc);
        return this;
    }

    private static sortFunc = (a: number, b: number) => a > b ? 1 : -1;
    private static randomAttribute(source: number[], attri: number[], randomLen: boolean) {
        attri.length = 0;
        if (source.length) {
            let attriCount = randomLen ? MathUtil.RandomInt(1, source.length) : source.length;
            while (attriCount > 0) {
                attri.push(...source.splice(MathUtil.RandomInt(0, source.length - 1), 1));
                attriCount--;
            }
        }
        return attri;
    }
}
