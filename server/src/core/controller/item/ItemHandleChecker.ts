import { GameUtil } from "../../../utils/GameUtil";
import { ErrorCode } from "../../enum/ErrorCode";
import { EquipmentPart } from "../../enum/ItemEnum";
import { tableMgr } from "../../table/TableManager";
import { User } from "../../user/User";

export class ItemHandleChecker {

    /**
     * 检查物品是否被收藏
     * @param data 
     * @param id 
     * @returns 
     */
    static checkItemCollected(data: Readonly<User>, id: number): boolean {
        return data.bag.collect.includes(id);
    }

    /**
     * 检查当前境界是否满足物品境界需求
     * @param data 用户数据
     * @param id 物品id
     * @returns 
     */
    static checkJingJieEnough(data: Readonly<User>, id: number): boolean {
        const item = tableMgr.Item[ id ];
        if (!item) return false;
        const { jingJie: checkedJingJie, cengJi: checkedCengJi } = item.UseRequire;
        const { jingJie, cengJi } = data;
        return jingJie > checkedJingJie || (jingJie == checkedJingJie && cengJi >= checkedCengJi);
    }

    /**
     * 检查物品是否可使用
     * @param data 用户数据
     * @param id 物品id
     * @param count 使用数量
     * @returns 
     */
    static checkItemUsable(data: Readonly<User>, id: number, count: number): ErrorCode {
        if (count <= 0) return ErrorCode.NUMBER_ERROR;
        const item = data.bag.getItem(id);
        if (item == null) return ErrorCode.ITEM_NOT_EXIST;
        const usableItem = GameUtil.getUsableItem(id);
        if (!usableItem) return ErrorCode.ITEM_CAN_NOT_USE;
        else if (item.count < count) return ErrorCode.ITEM_COUNT_NOT_ENOUGH;
        else if (this.checkJingJieEnough(data, id) == false) return ErrorCode.JINGJIE_NOT_ENOUGH_USE;
        else if (GameUtil.isFood(id)) {
            if (data.base.vigor >= data.base.getMaxVigro())
                return ErrorCode.VIGOR_IS_FULL;
        }
        else if (GameUtil.isSkillBook(id)) {
            const SectRequire = (<ConfigSkillBookData>usableItem).SectRequire;
            if (SectRequire.length && SectRequire.indexOf(data.sect) == -1) return ErrorCode.CAN_NOT_STUDY_OTHER_SECT_SKILL;
            else if (data.skill.indexOf(id) != -1) return ErrorCode.SKILL_IS_LEARNED;
        } else if (GameUtil.isXinFaBook(id)) {
            if (data.citta[ id ] != null) return ErrorCode.CITTA_IS_LEARNED;
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
    static checkItemSalable(data: Readonly<User>, id: number, count: number): ErrorCode {
        if (count <= 0) return ErrorCode.NUMBER_ERROR;
        if (!tableMgr.Item[ id ].Salable) return ErrorCode.ITEM_CAN_NOT_SELL;
        const item = data.bag.getItem(id);
        if (item == null) return ErrorCode.ITEM_NOT_EXIST;
        else if (item.count < count) return ErrorCode.ITEM_COUNT_NOT_ENOUGH;
        return ErrorCode.NONE;
    }

    /**
     * 检查装备是否可穿戴
     * @param data 用户数据
     * @param uid 装备uid
     * @returns 
     */
    static checkEquipWearable(data: Readonly<User>, uid: string): ErrorCode {
        const equip = data.bag.getEquip(uid);
        if (equip == null) return ErrorCode.ITEM_NOT_EXIST;
        else if (this.checkJingJieEnough(data, equip.id) == false) return ErrorCode.JINGJIE_NOT_ENOUGH_DRESS;
        return ErrorCode.NONE;
    }

    /**
     * 检查装备是否可脱下
     * @param data 用户数据
     * @param part 装备部位
     * @returns 
     */
    static checkEquipTakeOff(data: Readonly<User>, part: EquipmentPart): ErrorCode {
        if (data.body.getDressedEquip(part) == null) return ErrorCode.PART_NOT_DRESSED_EQUIP;
        return ErrorCode.NONE;
    }

    /**
     * 检查是否可以出售装备
     * @param data 用户数据
     * @param uid 装备uid
     * @returns 
     */
    static checkEquipSalable(data: Readonly<User>, uid: string): ErrorCode {
        const equip = data.bag.getEquip(uid);
        if (!equip) return ErrorCode.ITEM_NOT_EXIST;
        else if (!tableMgr.Item[ equip.id ].Salable) return ErrorCode.ITEM_CAN_NOT_SELL;
        return ErrorCode.NONE;
    }


    /**
     * 检查物品收藏
     * @param data 用户数据
     * @param id 物品id
     * @param collect 是否收藏
     * @returns 
     */
    static checkCollect(data: Readonly<User>, id: number, collect: boolean): ErrorCode {
        if (GameUtil.isEquip(id)) return ErrorCode.EQUIP_CAN_NOT_COLLECT;
        if (collect && this.checkItemCollected(data, id)) return ErrorCode.ITEM_ALREADY_COLLECTED;
        if (!collect && !this.checkItemCollected(data, id)) return ErrorCode.ITEM_DOES_NOT_COLLECT;
        return ErrorCode.NONE;
    }

    /**
     * 检查是否可以购买物品
     * @param data 用户数据
     * @param id 物品id
     * @param count 物品数量
     * @returns 
     */
    static checkItemPurchasable(data: Readonly<User>, id: number, count: number): ErrorCode {
        if (count <= 0) return ErrorCode.NUMBER_ERROR;
        const item = tableMgr.Shop[ id ];
        if (!item) return ErrorCode.GOODS_NOT_EXIST;
        for (let i = 0, n = item.SellPrice.length; i < n; i++) {
            const element = item.SellPrice[ i ];
            if (data.getItemCount(element.id) < element.count * count)
                return ErrorCode.ITEM_COUNT_NOT_ENOUGH;
        }
        return ErrorCode.NONE;
    }
}