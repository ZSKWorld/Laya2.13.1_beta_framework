import { GameUtil } from "../../../utils/GameUtil";
import { MathUtil } from "../../../utils/MathUtil";
import { TimeUtil } from "../../../utils/TimeUtil";
import { Util } from "../../../utils/Util";
import { ErrorCode } from "../../enum/ErrorCode";
import { DataType, EquipmentPart, FoodRecoverType } from "../../enum/ItemEnum";
import { LangCode } from "../../table/LangCode";
import { tableMgr } from "../../table/TableManager";
import { BaseDataKeyMap, DressedEquipMap } from "../DataConst";
import { UserData } from "../UserData";
import { BagProxy } from "./BagProxy";
import { ProxyBase } from "./ProxyBase";

export class UserDataProxy extends ProxyBase<IUserData>{
    private _bag: BagProxy;
    get bag() { return this._bag; }

    constructor(account: string = "", password: string = "", nickname: string = "") {
        super(new UserData());
        const userdata = this.data;

        userdata.account = String(account);
        userdata.password = String(password);
        userdata.nickname = String(nickname);
        userdata.vigor = this.getMaxVigro();
    }

    getUid() {
        return this.data.uid;
    }

    getJSONData() {
        return JSON.stringify(this.data);
    }

    login(source: IUserData) {
        const data = this.data;
        Object.keys(source).forEach(v => data[ v ] = source[ v ]);
        data.offline = this.initOffline();
        data.lastLoginTime = TimeUtil.getTimeStamp();

        this._bag = new BagProxy(data.bag);
    }

    logout() {
        const data = this.data;
        data.offline = null;
        data.lastOnlineTime = TimeUtil.getTimeStamp();
        this.save();
    }

    save() {
        Util.saveData(this.data);
    }

    /** 改变物品数量 */
    changeItemCount(id: number, count: number) {
        const item = tableMgr.Item[ id ];
        switch (item.DataType) {
            case DataType.BaseData:
                this.data[ BaseDataKeyMap[ id ] ] = Math.max(this.data[ BaseDataKeyMap[ id ] ] + count, 0);
                break;
            case DataType.BagData:
                this._bag.changeItemCount(id, count);
                break;
            default: break;
        }
    }

    /** 获取物品数量 */
    getItemCount(id: number): number {
        const item = tableMgr.Item[ id ];
        switch (item.DataType) {
            case DataType.BaseData: return this.data[ BaseDataKeyMap[ id ] ];
            case DataType.BagData: return this.bag.getItemCount(id);
            default: return 0;
        }
    }

    //#region 各种检查
    /** 检查当前境界是否满足物品境界需求 */
    checkJingJieEnough(id: number): boolean {
        const item = tableMgr.Item[ id ];
        if (!item) return false;
        const { jingJie: checkedJingJie, cengJi: checkedCengJi } = item.UseRequire;
        const { jingJie, cengJi } = this.data;
        return jingJie > checkedJingJie || (jingJie == checkedJingJie && cengJi >= checkedCengJi);
    }
    /** 检查是否可以使用物品 */
    checkUseItem(id: number, count: number): ErrorCode {
        if (count <= 0) return ErrorCode.NUMBER_ERROR;
        const item = this._bag.getItem(id);
        if (item == null) return ErrorCode.ITEM_NOT_EXIST;
        const typeItem = GameUtil.canUseItem(id);
        if (!typeItem) return ErrorCode.ITEM_CAN_NOT_USE;
        else if (item.count < count) return ErrorCode.ITEM_COUNT_NOT_ENOUGH;
        else if (this.checkJingJieEnough(id) == false) return ErrorCode.JINGJIE_NOT_ENOUGH_USE;
        else if (GameUtil.isSkillBook(id)) {
            const SectRequire = (<ConfigSkillBookData>typeItem).SectRequire;
            if (SectRequire.length && SectRequire.indexOf(this.data.sect) == -1) return ErrorCode.CAN_NOT_STUDY_OTHER_SECT_SKILL;
            else if (this.data.skill.indexOf(id) != -1) return ErrorCode.SKILL_IS_LEARNED;
        } else if (GameUtil.isXinFaBook(id)) {
            if (this.data.citta[ id ] != null) return ErrorCode.CITTA_IS_LEARNED;
        }
        return ErrorCode.NONE;
    }
    /** 检查是否可以出售物品 */
    checkSellItem(id: number, count: number): ErrorCode {
        if (count <= 0) return ErrorCode.NUMBER_ERROR;
        if (!tableMgr.Item[ id ].Salable) return ErrorCode.ITEM_CAN_NOT_SELL;
        const item = this._bag.getItem(id);
        if (item == null) return ErrorCode.ITEM_NOT_EXIST;
        else if (item.count < count) return ErrorCode.ITEM_COUNT_NOT_ENOUGH;
        return ErrorCode.NONE;
    }
    /** 检查是否可以穿戴装备 */
    checkDressEquip(uid: string): ErrorCode {
        const equip = this._bag.getEquip(uid);
        if (equip == null) return ErrorCode.ITEM_NOT_EXIST;
        else if (this.checkJingJieEnough(equip.id) == false) return ErrorCode.JINGJIE_NOT_ENOUGH_DRESS;
        return ErrorCode.NONE;
    }
    /** 检查是否可以脱下装备 */
    checkTakeOffEquip(part: EquipmentPart): ErrorCode {
        let equip = this.data[ DressedEquipMap[ part ] ];
        if (equip == null) return ErrorCode.PART_NOT_DRESSED_EQUIP;
        return ErrorCode.NONE;
    }
    /** 检查是否可以出售装备 */
    checkSellEquip(uid: string): ErrorCode {
        const equip = this._bag.getEquip(uid);
        if (equip) return ErrorCode.ITEM_NOT_EXIST;
        else if (!tableMgr.Item[ equip.id ].Salable) return ErrorCode.ITEM_CAN_NOT_SELL;
        return ErrorCode.NONE;
    }

    /** 检查物品收藏 */
    checkCollect(id: number, collect: boolean) {
        if (this.isEquip(id)) return ErrorCode.EQUIP_CAN_NOT_COLLECT;
        if (collect && this._bag.isCollect(id)) return ErrorCode.ITEM_ALREADY_COLLECTED;
        if (!collect && !this._bag.isCollect(id)) return ErrorCode.ITEM_DOES_NOT_COLLECT;
        return ErrorCode.NONE;
    }

    /** 检查是否可以购买物品 */
    checkBuyItem(id: number, count: number) {
        if (count <= 0) return ErrorCode.NUMBER_ERROR;
        const item = tableMgr.Shop[ id ];
        if (!item) return ErrorCode.GOODS_NOT_EXIST;
        const userData = this.data;
        for (let i = 0, n = item.SellPrice.length; i < n; i++) {
            const element = item.SellPrice[ i ];
            if (this.getItemCount(element.id) < element.count * count)
                return ErrorCode.ITEM_COUNT_NOT_ENOUGH;
        }
        return ErrorCode.NONE;
    }
    //#endregion

    /** 获取对应境界最大精力 */
    getMaxVigro() {
        const citta = this.data.citta;
        let xinFaJL = 0;
        Object.keys(citta).forEach(v => xinFaJL += (citta[ v ] * tableMgr.XinFaBook[ v ].JLAdd));
        return Math.floor(86400 + xinFaJL);
    }

    /** 获取精力恢复速率 */
    getVigorRecoveryRate() {
        const citta = this.data.citta;
        let xinFaJLHF = 0;
        Object.keys(citta).forEach(v => xinFaJLHF += (citta[ v ] * tableMgr.XinFaBook[ v ].JLHFAdd));
        return 1 + xinFaJLHF;
    }

    /** 使用物品 */
    useItem(id: number, count: number) {
        const [ prop, food, skillBook, xinFaBook ] = [
            tableMgr.Props[ id ], tableMgr.Food[ id ], tableMgr.SkillBook[ id ], tableMgr.XinFaBook[ id ],
        ];
        if (prop) return this.useProp(id, count);
        else if (food) return this.useFood(id, count);
        else if (skillBook) return this.useSkillBook(id, count);
        else if (xinFaBook) return this.useCittaBook(id, count);
        else return {};
    }

    /** 出售物品 */
    sellItem(id: number, count: number) {
        const sellRewards = tableMgr.Item[ id ].SellRewards;
        const syncInfo = {};
        if (sellRewards.length) {
            sellRewards.forEach(v => {
                if (this.isEquip(v.id)) this._bag.addNewEquip(v.id, v.count * count);
                else {
                    this.changeItemCount(v.id, v.count * count);
                    if (tableMgr.Item[ v.id ].DataType == DataType.BaseData)
                        syncInfo[ BaseDataKeyMap[ v.id ] ] = this.data[ BaseDataKeyMap[ v.id ] ];
                }
            });
            syncInfo[ "bag" ] = this.data.bag;
        }
        this.changeItemCount(id, -count);
        return syncInfo;
    }

    /** 穿戴装备 */
    dressEquip(uid: string) {
        const userdata = this.data;
        const equip = this._bag.getEquip(uid);
        const part = tableMgr.Equipment[ equip.id ].Part;
        const keyWord = DressedEquipMap[ part ];
        userdata.bag.equipment.remove(equip);
        const dressedEquip = userdata[ keyWord ];
        if (dressedEquip) userdata.bag.equipment.push(dressedEquip);
        userdata[ keyWord ] = equip;

        const syncInfo = { bag: userdata.bag };
        syncInfo[ keyWord ] = userdata[ keyWord ];
        return syncInfo;
    }

    /** 脱下装备 */
    takeOffEquip(part: EquipmentPart) {
        const userdata = this.data;
        const keyWord = DressedEquipMap[ part ];
        const equip: IEquipment = userdata[ keyWord ];
        userdata[ keyWord ] = null;
        userdata.bag.equipment.push(equip);

        const syncInfo = { bag: userdata.bag };
        syncInfo[ keyWord ] = userdata[ keyWord ];
        return syncInfo;
    }

    sellEquip(uid: string) {
        const equip = this._bag.getEquip(uid);
        const syncInfo = this.sellItem(equip.id, 1);
        this._bag.removeEquip(uid);
        return syncInfo;
    }

    buyGoods(id: number, count: number) {
        const syncInfo = {};
        const item = tableMgr.Shop[ id ];
        item.SellPrice.forEach(v => {
            this.changeItemCount(v.id, -v.count)
            const dataType = tableMgr.Item[ v.id ].DataType;
            if (dataType == DataType.BaseData)
                syncInfo[ BaseDataKeyMap[ v.id ] ] = this.getItemCount(v.id);
            else if (dataType == DataType.BagData)
                syncInfo[ "bag" ] = this.data.bag;
        });
        if (GameUtil.isEquip(item.SellID)) this.bag.addNewEquip(item.SellID, count);
        else this.changeItemCount(item.SellID, count);

        const dataType = tableMgr.Item[ item.SellID ].DataType;
        if (dataType == DataType.BaseData)
            syncInfo[ BaseDataKeyMap[ item.SellID ] ] = this.getItemCount(item.SellID);
        else if (dataType == DataType.BagData)
            syncInfo[ "bag" ] = this.data.bag;
        return syncInfo;
    }

    changeCollect(id: number, collect: boolean) {
        this.bag.changeCollect(id, collect);
        return { bag: this.data.bag };
    }

    /** 使用道具 */
    private useProp(id: number, count: number) {
        const userdata = this.data;
        const syncInfo = {};
        let useCount = 1;
        switch (id) {
            case 2007:
                userdata.copy = {};
                syncInfo[ "copy" ] = userdata.copy;
                break;
            case 2008:
                userdata.secret = {};
                syncInfo[ "secret" ] = userdata.secret;
                break;
            case 2009:
                userdata.boss = {};
                syncInfo[ "boss" ] = userdata.boss;
                break;
            case 2010: break;
            default:
                useCount = count;
                tableMgr.Props[ id ].Rewards.forEach(v => {
                    if (this.isEquip(v.id)) this._bag.addNewEquip(v.id, v.count);
                    else {
                        this.changeItemCount(v.id, v.count * count);
                        if (tableMgr.Item[ v.id ].DataType == DataType.BaseData)
                            syncInfo[ BaseDataKeyMap[ v.id ] ] = this.data[ BaseDataKeyMap[ v.id ] ];
                    }
                });
                break;
        }
        syncInfo[ "bag" ] = userdata.bag;
        this.changeItemCount(id, -useCount);
        return syncInfo;
    }

    /** 使用食物 */
    private useFood(id: number, count: number) {
        const userdata = this.data;
        const maxVigro = this.getMaxVigro();
        const syncInfo = {};
        let useCount = 0;
        if (userdata.vigor < maxVigro) {
            const food = tableMgr.Food[ id ];
            let singleRecover = 0;
            switch (food.RecoverType) {
                case FoodRecoverType.NumberRecover: singleRecover = food.RecoverValue; break;
                case FoodRecoverType.TimeRecover: singleRecover = food.RecoverValue * this.getVigorRecoveryRate(); break;
                case FoodRecoverType.PercentRecover: singleRecover = food.RecoverValue * maxVigro; break;
                default: return LangCode._1014;
            }
            const subVigro = maxVigro - userdata.vigor;
            if (subVigro <= singleRecover) useCount = 1;
            else if (subVigro % singleRecover == 0) useCount = Math.min(subVigro / singleRecover, count);
            else useCount = Math.min(Math.floor(subVigro / singleRecover) + 1, count);
            userdata.vigor = MathUtil.Clamp(userdata.vigor + singleRecover * useCount, 0, maxVigro);
            this.changeItemCount(id, -useCount);
            syncInfo[ "bag" ] = userdata.bag;
            syncInfo[ "vigor" ] = userdata.vigor;
        }
        return syncInfo;
    }

    /** 使用技能书 */
    private useSkillBook(id: number, count: number) {
        const userData = this.data;
        this.changeItemCount(id, -1);
        userData.skill.push(id);
        const syncInfo = { skill: userData.skill, bag: userData.bag };
        return syncInfo;
    }

    /** 使用心法书 */
    private useCittaBook(id: number, count: number) {
        const userData = this.data;
        this.changeItemCount(id, -1);
        userData.citta[ id ] = 1;
        const syncInfo = { citta: userData.citta, bag: userData.bag };
        return syncInfo;
    }

    /** 初始化离线数据 */
    private initOffline(): Offline {
        const data = this.data;
        if (!data.lastOnlineTime) return null;
        const timeOffset = ((TimeUtil.getTimeStamp() - data.lastOnlineTime) / 1000) << 0;
        if (timeOffset <= 5) return null;
        else return { offlineTime: timeOffset, vigor: (this.getVigorRecoveryRate() * timeOffset) << 0 };
    }

    private isEquip(id: number) {
        return !!tableMgr.Equipment[ id ];
    }
}