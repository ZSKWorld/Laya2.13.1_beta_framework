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

const EquipmentsSign = "$equipments";

export class UserDataProxy extends ProxyBase<IUserData>{
    private _bag: BagProxy;
    get bag() { return this._bag; }

    constructor(account: string = "", password: string = "", nickname: string = "") {
        super(new UserData(account, password, nickname));
        const userdata = this.data;
        userdata.vigor = this.getMaxVigro();
    }

    getUid() { return this.data.uid; }
    getAccount() { return this.data.account; }
    getPassword() { return this.data.password; }
    getNickname() { return this.data.nickname; }

    getJSONData() {
        return JSON.stringify(this.data);
    }

    login(source: IUserData) {
        const data = this.data;

        const equipments: any[][] = source[ EquipmentsSign ];
        delete source[ EquipmentsSign ];

        Object.keys(source).forEach(v => data[ v ] = source[ v ]);
        const bagEquips = this.data.bag.equipment;
        equipments && equipments.forEach(v => {
            let index = 0;
            bagEquips.push({
                id: v[ index++ ],
                count: v[ index++ ],
                uid: v[ index++ ],
                star: v[ index++ ],
                level: v[ index++ ],
                mingKe: v[ index++ ],
                shenYou: v[ index++ ],

                mainAttri: JSON.parse(v[ index++ ]),
                wuXingAttri: JSON.parse(v[ index++ ]),
                secondAttri: JSON.parse(v[ index++ ]),
                bodyAttri: JSON.parse(v[ index++ ]),
            })
        });
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
        if (this.data.bag.equipment.length) {
            const equipments = this.data[ "$equipments" ] = [];
            this.data.bag.equipment.forEach(equip => {
                equipments.push([
                    equip.id,
                    equip.count,
                    equip.uid,
                    equip.star,
                    equip.level,
                    equip.mingKe,
                    equip.shenYou,
                    JSON.stringify(equip.mainAttri),
                    JSON.stringify(equip.wuXingAttri),
                    JSON.stringify(equip.secondAttri),
                    JSON.stringify(equip.bodyAttri),
                ]);
            });
            this.data.bag.equipment.length = 0;
        }
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
        switch (tableMgr.Item[ id ].DataType) {
            case DataType.BaseData: return this.data[ BaseDataKeyMap[ id ] ];
            case DataType.BagData: return this.bag.getItemCount(id);
            default: return 0;
        }
    }

    /** 获取已穿戴装备 */
    getDressedEquip(part: EquipmentPart): IEquipment {
        const key = DressedEquipMap[ part ];
        if (key) return this.data[ key ];
        else return null;
    }

    /** 设置穿戴装备 */
    setDressedEquip(part: EquipmentPart, equip: IEquipment) {
        const key = DressedEquipMap[ part ];
        key && (this.data[ key ] = equip);
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
        else if (GameUtil.isFood(id)) {
            if (this.data.vigor >= this.getMaxVigro())
                return ErrorCode.VIGOR_IS_FULL;
        }
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
        if (this.getDressedEquip(part) == null) return ErrorCode.PART_NOT_DRESSED_EQUIP;
        return ErrorCode.NONE;
    }
    /** 检查是否可以出售装备 */
    checkSellEquip(uid: string): ErrorCode {
        const equip = this._bag.getEquip(uid);
        if (!equip) return ErrorCode.ITEM_NOT_EXIST;
        else if (!tableMgr.Item[ equip.id ].Salable) return ErrorCode.ITEM_CAN_NOT_SELL;
        return ErrorCode.NONE;
    }

    /** 检查物品收藏 */
    checkCollect(id: number, collect: boolean) {
        if (GameUtil.isEquip(id)) return ErrorCode.EQUIP_CAN_NOT_COLLECT;
        if (collect && this._bag.isCollect(id)) return ErrorCode.ITEM_ALREADY_COLLECTED;
        if (!collect && !this._bag.isCollect(id)) return ErrorCode.ITEM_DOES_NOT_COLLECT;
        return ErrorCode.NONE;
    }

    /** 检查是否可以购买物品 */
    checkBuyItem(id: number, count: number) {
        if (count <= 0) return ErrorCode.NUMBER_ERROR;
        const item = tableMgr.Shop[ id ];
        if (!item) return ErrorCode.GOODS_NOT_EXIST;
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
        const syncInfo: Partial<IUserData> = {};
        if (sellRewards.length) {
            sellRewards.forEach(v => {
                if (GameUtil.isEquip(v.id)) this._bag.addNewEquip(v.id, v.count * count);
                else {
                    this.changeItemCount(v.id, v.count * count);
                    this.setSyncInfo(syncInfo, v.id);
                }
            });
            syncInfo.bag = this.data.bag;
        }
        this.changeItemCount(id, -count);
        return syncInfo;
    }

    /** 穿戴装备 */
    dressEquip(uid: string) {
        const userdata = this.data;
        const equip = this._bag.getEquip(uid);
        const part = tableMgr.Equipment[ equip.id ].Part;
        userdata.bag.equipment.remove(equip);
        const dressedEquip = this.getDressedEquip(part);
        if (dressedEquip) userdata.bag.equipment.push(dressedEquip);
        this.setDressedEquip(part, equip);

        const syncInfo = { bag: userdata.bag };
        const keyWord = DressedEquipMap[ part ];
        syncInfo[ keyWord ] = userdata[ keyWord ];
        return syncInfo;
    }

    /** 脱下装备 */
    takeOffEquip(part: EquipmentPart) {
        const userdata = this.data;
        const equip = this.getDressedEquip(part);
        this.setDressedEquip(part, null);
        userdata.bag.equipment.push(equip);

        const syncInfo = { bag: userdata.bag };
        const keyWord = DressedEquipMap[ part ];
        syncInfo[ keyWord ] = userdata[ keyWord ];
        return syncInfo;
    }

    /** 出售装备 */
    sellEquip(uid: string) {
        const equip = this._bag.getEquip(uid);
        const syncInfo = this.sellItem(equip.id, 1);
        this._bag.removeEquip(uid);
        return syncInfo;
    }

    /** 分解装备 */
    decomposeEquip(star: number) {
        const syncInfo = {};
        const equips = this.data.bag.equipment;
        const equipCnt = equips.length;
        for (let i = equipCnt - 1; i >= 0; i--) {
            if (equips[ i ].star == star) {
                const tempInfo = this.sellItem(equips[ i ].id, 1);
                Object.assign(syncInfo, tempInfo);
                equips.splice(i, 1);
            }
        }
        return syncInfo;
    }

    /** 购买物品 */
    buyGoods(id: number, count: number) {
        const syncInfo = {};
        const item = tableMgr.Shop[ id ];
        item.SellPrice.forEach(v => {
            this.changeItemCount(v.id, -v.count)
            this.setSyncInfo(syncInfo, v.id);
        });
        if (GameUtil.isEquip(item.SellID)) this.bag.addNewEquip(item.SellID, count);
        else this.changeItemCount(item.SellID, count);
        this.setSyncInfo(syncInfo, item.SellID);
        return syncInfo;
    }

    /** 添加/取消 收藏 */
    changeCollect(id: number, collect: boolean) {
        this.bag.changeCollect(id, collect);
        return { bag: this.data.bag };
    }

    /** 使用道具 */
    private useProp(id: number, count: number) {
        const userdata = this.data;
        const syncInfo: Partial<IUserData> = {};
        let useCount = 1;
        switch (id) {
            case 2007:
                userdata.copy = {};
                syncInfo.copy = userdata.copy;
                break;
            case 2008:
                userdata.secret = {};
                syncInfo.secret = userdata.secret;
                break;
            case 2009:
                userdata.boss = {};
                syncInfo.boss = userdata.boss;
                break;
            case 2010: break;
            default:
                useCount = count;
                tableMgr.Props[ id ].Rewards.forEach(v => {
                    if (GameUtil.isEquip(v.id)) this._bag.addNewEquip(v.id, v.count * count);
                    else {
                        this.changeItemCount(v.id, v.count * count);
                        this.setSyncInfo(syncInfo, v.id);
                    }
                });
                break;
        }
        syncInfo.bag = userdata.bag;
        this.changeItemCount(id, -useCount);
        return syncInfo;
    }

    /** 使用食物 */
    private useFood(id: number, count: number) {
        const userdata = this.data;
        const maxVigro = this.getMaxVigro();
        const syncInfo: Partial<IUserData> = {};
        let useCount = 0;
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
        syncInfo.bag = userdata.bag;
        syncInfo.vigor = userdata.vigor;
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
    private initOffline(): IOffline {
        const data = this.data;
        if (!data.lastOnlineTime) return null;
        const timeOffset = ((TimeUtil.getTimeStamp() - data.lastOnlineTime) / 1000) << 0;
        if (timeOffset <= 5) return null;
        else return { offlineTime: timeOffset, vigor: (this.getVigorRecoveryRate() * timeOffset) << 0 };
    }

    private setSyncInfo(syncInfo: Partial<IUserData>, id: number) {
        switch (tableMgr.Item[ id ].DataType) {
            case DataType.BaseData:
                syncInfo[ BaseDataKeyMap[ id ] ] = this.data[ BaseDataKeyMap[ id ] ];
                break;
            case DataType.BagData:
                syncInfo.bag = this.data.bag;
            default: break;
        }
    }
}