
declare interface IEquipmentCtrl {
    /** 穿戴装备 */
    dressEquip(data: DressEquipInput): void;
    /** 脱下装备 */
    takeOffEquip(data: TakeOffEquipInput): void;
    /** 出售装备 */
    sellEquip(data: SellEquipInput): void;
    /** 分解装备 */
    decomposeEquip(data: DecomposeEquipInput): void;
}

declare interface DressEquipInput extends UserInput {
    /** 要穿戴装备的uid */
    uid: string;
}

declare interface DressEquipOutput extends UserOutput {
}

declare interface TakeOffEquipInput extends UserInput {
    /** 要脱下装备的部位 */
    part: number;
}

declare interface TakeOffEquipOutput extends UserOutput {
}

declare interface SellEquipInput extends UserInput {
    /** 要出售装备的uid */
    uid: string;
}

declare interface SellEquipOutput extends UseItemOutput {
}

declare interface DecomposeEquipInput extends UserInput {
    star: number;
}

declare interface DecomposeEquipOutput extends UseItemOutput {

}

