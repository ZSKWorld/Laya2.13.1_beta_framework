import { Util } from "../../utils/Util";
export class ItemBase implements IItemBase {
    id: number = 0;
    count: number = 0;

    constructor(id: number, count: number) {
        this.id = id;
        this.count = count;
    }
}

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
    constructor(id: number) {
        super(id, 1);
    }
}