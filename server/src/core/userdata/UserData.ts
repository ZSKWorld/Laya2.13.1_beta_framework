import { TimeUtil } from "../../utils/TimeUtil";
import { Util } from "../../utils/Util";
import { Bag } from "./Bag";
import { UserDataUtil } from "./UserDataUtil";

export class UserData implements IUserData {
    //#region 字段
    uid: string = Util.CreateUID();
    nickname: string = "";
    account: string = "";
    password: string = "";
    registerTime: number = TimeUtil.getTimeStamp();
    lastLoginTime: number = 0;
    lastOnlineTime: number = 0;
    /** 离线数据 */
    offline?: Offline = null;
    /** 背包数据 */
    bag: IBag = new Bag();
    /** 金币 */
    coin: number = 0;
    /** 元宝 */
    vcoin: number = 0;
    /** 精力 */
    vigor: number = 0;
    /** 境界 */
    jingJie: number = 1;
    /** 层数 */
    cengJi: number = 1;
    /** 经验 */
    exp: number = 0;
    /** 魔核 */
    moHe: number = 0;
    /** 魔币 */
    moBi: number = 0;
    /** 灵石 */
    spiritStones: number = 0;
    /** 称号id */
    title: number = 0;
    /** 帮会id */
    society: number = 0;
    /** 门派id */
    sect: number = 0;
    /** 魂魄 */
    soul: number = 0;
    /** 宝石积分 */
    gemScore: number = 0;
    /** 武器 */
    weapon: IEquipment = null;
    /** 头盔 */
    helmet: IEquipment = null;
    /** 项链 */
    necklace: IEquipment = null;
    /** 衣服 */
    clothes: IEquipment = null;
    /** 戒指 */
    ring: IEquipment = null;
    /** 裤子 */
    trousers: IEquipment = null;
    /** 护符 */
    amulet: IEquipment = null;
    /** 鞋子 */
    shoes: IEquipment = null;
    /** 坐骑 */
    mount: IEquipment = null;
    /** 暗器 */
    hiddenWeeapon: IEquipment = null;
    /** 时装 */
    fashion: IEquipment = null;
    /** 法宝 */
    magicWeapon: IEquipment = null;
    /** 武器上装备的宝石 */
    weaponGems: number[] = [];
    /** 头盔上装备的宝石 */
    helmetGems: number[] = [];
    /** 项链上装备的宝石 */
    necklaceGems: number[] = [];
    /** 衣服上装备的宝石 */
    clothesGems: number[] = [];
    /** 戒指上装备的宝石 */
    ringGems: number[] = [];
    /** 裤子上装备的宝石 */
    trousersGems: number[] = [];
    /** 护符上装备的宝石 */
    amuletGems: number[] = [];
    /** 鞋子上装备的宝石 */
    shoesGems: number[] = [];
    /**关卡数据 */
    level: KeyData = {};
    /**副本数据 */
    copy: KeyData = {};
    /**秘境数据 */
    secret: KeyData = {};
    /**boss数据 */
    boss: KeyData = {};
    /**心法数据 */
    citta: KeyData = {};
    /**技能数据 */
    skill: number[] = [ 5000 ];
    /**出战技能 */
    usingSkill: number[] = [ 5000, 5000, 5000, 5000, 5000 ];
    //#endregion

    constructor(account: string = "", password: string = "", nickname: string = "") {
        this.account = String(account);
        this.password = String(password);
        this.nickname = String(nickname);

        this.vigor = UserDataUtil.getMaxVigro(this.citta);
    }

    loginInit(data: IUserData) {
        Object.keys(data).forEach(v => this[ v ] = data[ v ]);
        this.offline = this.initOffline();
        this.lastLoginTime = TimeUtil.getTimeStamp();
    }

    save() {
        this.offline = null;
        this.lastOnlineTime = TimeUtil.getTimeStamp();
        Util.saveData(this);
    }

    private initOffline(): Offline {
        if (!this.lastOnlineTime) return null;
        const timeOffset = ((TimeUtil.getTimeStamp() - this.lastOnlineTime) / 1000) << 0;
        if (timeOffset <= 5) return null;
        else return { offlineTime: timeOffset, vigor: (UserDataUtil.getVigorRecoveryRate(this.citta) * timeOffset) << 0 };
    }
}