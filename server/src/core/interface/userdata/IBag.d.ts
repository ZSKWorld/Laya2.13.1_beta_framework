declare interface IBag {
    collect: number[];
    equipment: IEquipment[];
    gem: IItemBase[];
    prop: IItemBase[];
    material: IItemBase[];
    book: IItemBase[];
    other: IItemBase[];

    /**
     * 获取非装备物品
     * @param id 物品id
     */
    getItem(id: number): IItemBase;

    /**
     * 获取装备
     * @param uid 装备uid
     */
    getEquip(uid: string): IEquipment;

    /**
     * 增删物品数量
     * @param id 物品id
     * @param count 物品数量
     */
    changeItemCount(id: number, count: number): void;

    /**
     * 添加/取消 收藏
     * @param id 物品id
     * @param collect 是否收藏
     */
    changeItemCollect(id: number, collect: boolean): void;

    /**
     * 添加装备
     * @param equip 装备
     */
    addEquip(equip: IEquipment): void;

    /**
     * 添加新装备
     * @param id 装备id
     * @param count 添加数量
     */
    addNewEquip(id: number, count: number): void;

    /**
     * 移除装备
     * @param uid 装备uid
     */
    removeEquip(uid: string): IEquipment;
}