import { MathUtil } from "../../utils/MathUtil";
import { Util } from "../../utils/Util";
import { cfgMgr } from "../config/CfgManager";
import { EquipmentPart } from "../enum/ItemEnum";
import { CantSyncObject } from "./CantSyncObject";

export class Goods extends CantSyncObject<IGoodsData, IGoods> implements IGoods {
    id: number = 0;
    count: number = 0;

    constructor(id: number = 0, count: number = 0) {
        super();
        this.id = id;
        this.count = count;
    }
}

export class Equipment extends CantSyncObject<IEquipmentData, IEquipment> implements IEquipment {
    id: number = 0;
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
        return cfgMgr.Equipment[ this.id ].part;
    }

    constructor(id: number = 0) {
        super();
        this.id = id;
    }

    createAttribute(): IEquipment {
        const { main, wuXing, second, body } = cfgMgr.EquipmentAddition[ this.part ];
        this.star = MathUtil.RandomInt(1, +cfgMgr.Const[ 1010 ].value);
        main && Equipment.randomAttribute([ ...main ], this.mainAttri, false).sort(Equipment.sortFunc);
        wuXing && Equipment.randomAttribute([ ...wuXing ], this.wuXingAttri, true).sort(Equipment.sortFunc);
        second && Equipment.randomAttribute([ ...second ], this.secondAttri, true).sort(Equipment.sortFunc);
        body && Equipment.randomAttribute([ ...body ], this.bodyAttri, true).sort(Equipment.sortFunc);
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