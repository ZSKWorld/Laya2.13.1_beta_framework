declare interface IBag extends IBagData, IDecode<IBagData, IBag> {
    isCollect(id: number): boolean;
    getItemCount(id: number): number;
    getItem(id: number): IGoods;
    getItems(type: ItemBagType): IEquipment[] | IGoods[];
}