declare interface IBag extends IDecodeObject<IBag> {
    collect: number[];
    equipment: IEquipment[];
    gem: IGoods[];
    prop: IGoods[];
    material: IGoods[];
    book: IGoods[];
    other: IGoods[];

    isCollect(id: number): boolean;

    getItemCount(id: number): number;

    getItem(id: number): IGoods;

    /** @param part {@link ItemBagType } */
    getItems(type: number): IEquipment[] | IGoods[];
}