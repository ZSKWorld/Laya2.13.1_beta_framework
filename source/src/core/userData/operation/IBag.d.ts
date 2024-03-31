declare interface IBag extends IBagData, IDecodeObject<IBagData, IBag> {
    equipment: IEquipment[];
    gem: IGoods[];
    prop: IGoods[];
    material: IGoods[];
    book: IGoods[];
    other: IGoods[];

    isCollect(id: number): boolean;

    getItemCount(id: number): number;

    getItem(id: number): IGoods;

    getItems(type: ItemBagType): IEquipment[] | IGoods[];
}