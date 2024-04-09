declare interface IBag extends IDecodeObject<IBag> {
    collect: number[];
    equipment: IEquipment[];
    gem: IGoods[];
    prop: IGoods[];
    material: IGoods[];
    book: IGoods[];
    other: IGoods[];

    /**
     * 是否已收藏
     * @param id 物品id
     */
    isCollect(id: number): boolean;

    /**
     * 获取非装备物品
     * @param id 物品id
     */
    getItem(id: number): IGoods;

    /** @param part {@link ItemBagType } */
    getItems(type: number): IEquipment[] | IGoods[];

    getItemCount(id: number): number;
}