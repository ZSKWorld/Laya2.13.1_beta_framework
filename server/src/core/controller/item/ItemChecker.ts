import { ErrorCode } from "../../enum/ErrorCode";
import { ItemHelper } from "./ItemHelper";

export class ItemChecker {

    /**
     * 检查物品是否被收藏
     * @param data
     * @param id
     * @returns
     */
    static checkItemCollected(data: IUser, id: number): boolean {
        return data.bag.collect.includes(id);
    }

    /**
     * 检查物品是否可使用
     * @param data 用户数据
     * @param id 物品id
     * @param count 使用数量
     * @returns
     */
    static checkItemUsable(data: IUser, id: number, count: number): ErrorCode {
        if (count <= 0) return ErrorCode.NUMBER_ERROR;
        const item = data.bag.getItem(id);
        if (item == null) return ErrorCode.ITEM_NOT_EXIST;
        const usableItem = cfgMgr.Props[ id ] || cfgMgr.Food[ id ] || cfgMgr.SkillBook[ id ] || cfgMgr.XinFaBook[ id ];
        if (!usableItem) return ErrorCode.ITEM_CAN_NOT_USE;
        else if (item.count < count) return ErrorCode.ITEM_COUNT_NOT_ENOUGH;
        else if (ItemHelper.checkJingJieEnough(data, id) == false) return ErrorCode.JINGJIE_NOT_ENOUGH_USE;
        else if (ItemHelper.isFood(id)) {
            if (data.base.vigor >= data.base.getMaxVigro())
                return ErrorCode.VIGOR_IS_FULL;
        }
        else if (ItemHelper.isSkillBook(id)) {
            const SectRequire = (<CfgSkillBookData>usableItem).SectRequire;
            if (SectRequire.length && SectRequire.indexOf(data.base.sect) == -1) return ErrorCode.CAN_NOT_STUDY_OTHER_SECT_SKILL;
            else if (data.base.skill.indexOf(id) != -1) return ErrorCode.SKILL_IS_LEARNED;
        } else if (ItemHelper.isXinFaBook(id)) {
            if (data.base.citta[ id ] != null) return ErrorCode.CITTA_IS_LEARNED;
        }
        return ErrorCode.NONE;
    }

    /**
     * 检查物品是否可出售
     * @param data 用户数据
     * @param id 物品id
     * @param count 物品数量
     * @returns
     */
    static checkItemSalable(data: IUser, id: number, count: number): ErrorCode {
        if (count <= 0) return ErrorCode.NUMBER_ERROR;
        if (!cfgMgr.Item[ id ].Salable) return ErrorCode.ITEM_CAN_NOT_SELL;
        const itemCnt = ItemHelper.getItemCount(data, id);
        if (itemCnt < count) return ErrorCode.ITEM_COUNT_NOT_ENOUGH;
        return ErrorCode.NONE;
    }


    /**
     * 检查物品收藏
     * @param data 用户数据
     * @param id 物品id
     * @param collect 是否收藏
     * @returns
     */
    static checkCollect(data: IUser, id: number, collect: boolean): ErrorCode {
        if (ItemHelper.isEquip(id)) return ErrorCode.EQUIP_CAN_NOT_COLLECT;
        if (collect && this.checkItemCollected(data, id)) return ErrorCode.ITEM_ALREADY_COLLECTED;
        if (!collect && !this.checkItemCollected(data, id)) return ErrorCode.ITEM_DOES_NOT_COLLECT;
        return ErrorCode.NONE;
    }
}