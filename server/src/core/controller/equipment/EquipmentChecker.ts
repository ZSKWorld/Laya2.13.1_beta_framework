import { GameUtil } from "../../../utils/GameUtil";
import { ErrorCode } from "../../enum/ErrorCode";
import { EquipmentPart } from "../../enum/ItemEnum";
import { tableMgr } from "../../table/TableManager";

export class EquipmentChecker {

    /**
     * 检查装备是否可穿戴
     * @param data 用户数据
     * @param uid 装备uid
     * @returns 
     */
    static checkEquipDressable(data: IUser, uid: string): ErrorCode {
        const equip = data.bag.getEquip(uid);
        if (equip == null) return ErrorCode.ITEM_NOT_EXIST;
        else if (GameUtil.checkJingJieEnough(data, equip.id) == false) return ErrorCode.JINGJIE_NOT_ENOUGH_DRESS;
        return ErrorCode.NONE;
    }

    /**
     * 检查装备是否可脱下
     * @param data 用户数据
     * @param part 装备部位
     * @returns 
     */
    static checkEquipTakeOff(data: IUser, part: EquipmentPart): ErrorCode {
        if (data.body.getDressedEquip(part) == null) return ErrorCode.PART_NOT_DRESSED_EQUIP;
        return ErrorCode.NONE;
    }

    /**
     * 检查装备是否可出售
     * @param data 用户数据
     * @param uid 装备uid
     * @returns 
     */
    static checkEquipSalable(data: IUser, uid: string): ErrorCode {
        const equip = data.bag.getEquip(uid);
        if (!equip) return ErrorCode.ITEM_NOT_EXIST;
        else if (!tableMgr.Item[ equip.id ].Salable) return ErrorCode.ITEM_CAN_NOT_SELL;
        return ErrorCode.NONE;
    }
}