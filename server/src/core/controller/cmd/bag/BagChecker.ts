import { cfgMgr } from "../../../config/CfgManager";
import { ErrorCode } from "../../../enum/ErrorCode";
import { EquipmentPart } from "../../../enum/ItemEnum";
import { BagHelper } from "./BagHelper";

export class BagChecker {

    /** 检查物品是否被收藏 */
    static checkItemCollected(data: IUser, id: number): boolean {
        return data.bag.collect.includes(id);
    }

    /** 检查物品是否可使用 */
    static checkItemUsable(data: IUser, id: number, count: number): ErrorCode {
        if (count <= 0) return ErrorCode.NUMBER_ERROR;
        const item = data.bag.getItem(id);
        if (item == null) return ErrorCode.ITEM_NOT_EXIST;
        const usableItem = cfgMgr.Props[id] || cfgMgr.Food[id] || cfgMgr.SkillBook[id] || cfgMgr.XinFaBook[id];
        if (!usableItem) return ErrorCode.ITEM_CAN_NOT_USE;
        else if (item.count < count) return ErrorCode.ITEM_COUNT_NOT_ENOUGH;
        else if (BagHelper.checkJingJieEnough(data, id) == false) return ErrorCode.JINGJIE_NOT_ENOUGH_USE;
        else if (BagHelper.isFood(id)) {
            if (data.base.vigor >= data.base.maxVigro)
                return ErrorCode.VIGOR_IS_FULL;
        }
        else if (BagHelper.isSkillBook(id)) {
            const SectRequire = (<CfgSkillBookData>usableItem).sectRequire;
            if (SectRequire.length && SectRequire.indexOf(data.base.sect) == -1) return ErrorCode.CAN_NOT_STUDY_OTHER_SECT_SKILL;
            else if (data.base.skill.indexOf(id) != -1) return ErrorCode.SKILL_IS_LEARNED;
        } else if (BagHelper.isXinFaBook(id)) {
            if (data.base.citta[id] != null) return ErrorCode.CITTA_IS_LEARNED;
        }
        return ErrorCode.NONE;
    }

    /** 检查物品是否可出售 */
    static checkItemSalable(data: IUser, id: number, count: number): ErrorCode {
        if (count <= 0) return ErrorCode.NUMBER_ERROR;
        if (!cfgMgr.Item[id].salable) return ErrorCode.ITEM_CAN_NOT_SELL;
        const itemCnt = BagHelper.getItemCount(data, id);
        if (itemCnt < count) return ErrorCode.ITEM_COUNT_NOT_ENOUGH;
        return ErrorCode.NONE;
    }

    /** 检查物品收藏 */
    static checkCollect(data: IUser, id: number, collect: boolean): ErrorCode {
        if (BagHelper.isEquip(id)) return ErrorCode.EQUIP_CAN_NOT_COLLECT;
        if (collect && this.checkItemCollected(data, id)) return ErrorCode.ITEM_ALREADY_COLLECTED;
        if (!collect && !this.checkItemCollected(data, id)) return ErrorCode.ITEM_DOES_NOT_COLLECT;
        return ErrorCode.NONE;
    }

    /** 检查装备是否可穿戴 */
    static checkEquipDressable(data: IUser, uid: string): ErrorCode {
        const equip = data.bag.getEquip(uid);
        if (equip == null) return ErrorCode.ITEM_NOT_EXIST;
        else if (BagHelper.checkJingJieEnough(data, equip.id) == false) return ErrorCode.JINGJIE_NOT_ENOUGH_DRESS;
        return ErrorCode.NONE;
    }

    /** 检查装备是否可脱下 */
    static checkEquipTakeOff(data: IUser, part: EquipmentPart): ErrorCode {
        if (data.body.getDressedEquip(part) == null) return ErrorCode.PART_NOT_DRESSED_EQUIP;
        return ErrorCode.NONE;
    }

    /** 检查装备是否可出售 */
    static checkEquipSalable(data: IUser, uid: string): ErrorCode {
        const equip = data.bag.getEquip(uid);
        if (!equip) return ErrorCode.ITEM_NOT_EXIST;
        else if (!cfgMgr.Item[equip.id].salable) return ErrorCode.ITEM_CAN_NOT_SELL;
        return ErrorCode.NONE;
    }
}