import { GameUtil } from "../../common/GameUtil";
import { InsertEvent } from "../../libs/event/EventMgr";
import { MathUtil } from "../../libs/math/MathUtil";
import { UpperFirst } from "../../libs/utils/Util";
import { DataType, EquipmentPart } from "../../net/enum/ItemEnum";
import { NetResponse } from "../../net/NetResponse";
import { tableMgr } from "../../table/TableManager";
import { Bag } from "./Bag";
import { BaseProxy } from "./BaseProxy";
import { Equipment } from "./ItemProxy";

export class UserDataProxy extends BaseProxy<IUserData> implements IUserData {
    private static _inst: UserDataProxy;
    static get Inst() { return this._inst || (this._inst = new UserDataProxy()) }

    //#region SourceProperties
    get uid(): string { return this.source.uid; }
    get nickname(): string { return this.source.nickname; }
    get account(): string { return this.source.account; }
    get password(): string { return this.source.password; }
    get registerTime(): number { return this.source.registerTime; }
    get lastLoginTime(): number { return this.source.lastLoginTime; }
    get lastOnlineTime(): number { return this.source.lastOnlineTime; }
    get offline(): IOffline { return this.source.offline; }
    get bag(): Bag { return this.source.bag as any; }
    get coin(): number { return this.source.coin; }
    get vcoin(): number { return this.source.vcoin; }
    get vigor(): number { return this.source.vigor; }
    get jingJie(): number { return this.source.jingJie; }
    get cengJi(): number { return this.source.cengJi; }
    get exp(): number { return this.source.exp; }
    get moHe(): number { return this.source.moHe; }
    get moBi(): number { return this.source.moBi; }
    get spiritStones(): number { return this.source.spiritStones; }
    get title(): number { return this.source.title; }
    get society(): number { return this.source.society; }
    get sect(): number { return this.source.sect; }
    get soul(): number { return this.source.soul; }
    get gemScore(): number { return this.source.gemScore; }
    get weapon(): Equipment { return this.source.weapon as any; }
    get helmet(): Equipment { return this.source.helmet as any; }
    get necklace(): Equipment { return this.source.necklace as any; }
    get clothes(): Equipment { return this.source.clothes as any; }
    get ring(): Equipment { return this.source.ring as any; }
    get trousers(): Equipment { return this.source.trousers as any; }
    get amulet(): Equipment { return this.source.amulet as any; }
    get shoes(): Equipment { return this.source.shoes as any; }
    get mount(): Equipment { return this.source.mount as any; }
    get hiddenWeeapon(): Equipment { return this.source.hiddenWeeapon as any; }
    get fashion(): Equipment { return this.source.fashion as any; }
    get magicWeapon(): Equipment { return this.source.magicWeapon as any; }
    get weaponGems(): number[] { return this.source.weaponGems; }
    get helmetGems(): number[] { return this.source.helmetGems; }
    get necklaceGems(): number[] { return this.source.necklaceGems; }
    get clothesGems(): number[] { return this.source.clothesGems; }
    get ringGems(): number[] { return this.source.ringGems; }
    get trousersGems(): number[] { return this.source.trousersGems; }
    get amuletGems(): number[] { return this.source.amuletGems; }
    get shoesGems(): number[] { return this.source.shoesGems; }
    get level(): KeyData<number> { return this.source.level; }
    get copy(): KeyData<number> { return this.source.copy; }
    get secret(): KeyData<number> { return this.source.secret; }
    get boss(): KeyData<number> { return this.source.boss; }
    get citta(): KeyData<number> { return this.source.citta; }
    get skill(): number[] { return this.source.skill; }
    get usingSkill(): number[] { return this.source.usingSkill; }

    private set uid(value: string) { this.source.uid = value; }
    private set nickname(value: string) { this.source.nickname = value; }
    private set account(value: string) { this.source.account = value; }
    private set password(value: string) { this.source.password = value; }
    private set registerTime(value: number) { this.source.registerTime = value; }
    private set lastLoginTime(value: number) { this.source.lastLoginTime = value; }
    private set lastOnlineTime(value: number) { this.source.lastOnlineTime = value; }
    private set offline(value: IOffline) { this.source.offline = value; }
    private set bag(value: IBag) { this.source.bag = new Bag(value); }
    private set coin(value: number) { this.source.coin = value; }
    private set vcoin(value: number) { this.source.vcoin = value; }
    private set vigor(value: number) { this.source.vigor = value; }
    private set jingJie(value: number) { this.source.jingJie = value; }
    private set cengJi(value: number) { this.source.cengJi = value; }
    private set exp(value: number) { this.source.exp = value; }
    private set moHe(value: number) { this.source.moHe = value; }
    private set moBi(value: number) { this.source.moBi = value; }
    private set spiritStones(value: number) { this.source.spiritStones = value; }
    private set title(value: number) { this.source.title = value; }
    private set society(value: number) { this.source.society = value; }
    private set sect(value: number) { this.source.sect = value; }
    private set soul(value: number) { this.source.soul = value; }
    private set gemScore(value: number) { this.source.gemScore = value; }
    private set weapon(value: IEquipment) { this.source.weapon = value ? new Equipment(value) : null; }
    private set helmet(value: IEquipment) { this.source.helmet = value ? new Equipment(value) : null; }
    private set necklace(value: IEquipment) { this.source.necklace = value ? new Equipment(value) : null; }
    private set clothes(value: IEquipment) { this.source.clothes = value ? new Equipment(value) : null; }
    private set ring(value: IEquipment) { this.source.ring = value ? new Equipment(value) : null; }
    private set trousers(value: IEquipment) { this.source.trousers = value ? new Equipment(value) : null; }
    private set amulet(value: IEquipment) { this.source.amulet = value ? new Equipment(value) : null; }
    private set shoes(value: IEquipment) { this.source.shoes = value ? new Equipment(value) : null; }
    private set mount(value: IEquipment) { this.source.mount = value ? new Equipment(value) : null; }
    private set hiddenWeeapon(value: IEquipment) { this.source.hiddenWeeapon = value ? new Equipment(value) : null; }
    private set fashion(value: IEquipment) { this.source.fashion = value ? new Equipment(value) : null; }
    private set magicWeapon(value: IEquipment) { this.source.magicWeapon = value ? new Equipment(value) : null; }
    private set weaponGems(value: number[]) { this.source.weaponGems = value; }
    private set helmetGems(value: number[]) { this.source.helmetGems = value; }
    private set necklaceGems(value: number[]) { this.source.necklaceGems = value; }
    private set clothesGems(value: number[]) { this.source.clothesGems = value; }
    private set ringGems(value: number[]) { this.source.ringGems = value; }
    private set trousersGems(value: number[]) { this.source.trousersGems = value; }
    private set amuletGems(value: number[]) { this.source.amuletGems = value; }
    private set shoesGems(value: number[]) { this.source.shoesGems = value; }
    private set level(value: KeyData<number>) { this.source.level = value; }
    private set copy(value: KeyData<number>) { this.source.copy = value; }
    private set secret(value: KeyData<number>) { this.source.secret = value; }
    private set boss(value: KeyData<number>) { this.source.boss = value; }
    private set citta(value: KeyData<number>) { this.source.citta = value; }
    private set skill(value: number[]) { this.source.skill = value; }
    private set usingSkill(value: number[]) { this.source.usingSkill = value; }
    //#endregion

    /** 升级经验 */
    get upgradeExp() { return GameUtil.getUpgradExp(this.jingJie, this.cengJi); }

    /** 获取最大精力 */
    get maxVigro() {
        let xinFaJL = 0;
        const citta = this.citta;
        Object.keys(citta).forEach(v => xinFaJL += (citta[ v ] * tableMgr.XinFaBook[ v ].JLAdd));
        return Math.floor(86400 + xinFaJL);
    }

    /** 获取精力恢复 */
    get jingLiHuiFu() {
        let xinFaJLHF = 0;
        const citta = this.citta;
        Object.keys(citta).forEach(v => xinFaJLHF += (citta[ v ] * tableMgr.XinFaBook[ v ].JLHFAdd));
        return 1 + xinFaJLHF;
    }

    private constructor() { super(null); }

    getItemCount(id: number): number {
        const item = tableMgr.Item[ id ];
        switch (item.DataType) {
            case DataType.BaseData:
                switch (id) {
                    case 1001: return this.coin;
                    case 1002: return this.vcoin;
                    case 1003: return this.exp;
                    case 1004: return this.moHe;
                    case 1005: return this.moBi;
                    case 1006: return this.spiritStones;
                    case 1007: return this.soul;
                    case 1008: return this.gemScore;
                    case 1009: return this.vigor;
                    default: return 0;
                }
            case DataType.BagData: return this.bag.getItem(id)?.count || 0;
            default: return 0;
        }
    }

    getDressedEquip(part: EquipmentPart) {
        switch (part) {
            case EquipmentPart.Weapon: return this.weapon;
            case EquipmentPart.Helmet: return this.helmet;
            case EquipmentPart.Necklace: return this.necklace;
            case EquipmentPart.Clothes: return this.clothes;
            case EquipmentPart.Ring: return this.ring;
            case EquipmentPart.Trousers: return this.trousers;
            case EquipmentPart.Amulet: return this.amulet;
            case EquipmentPart.Shoes: return this.shoes;
            case EquipmentPart.Mount: return this.mount;
            case EquipmentPart.Fashion: return this.fashion;
            case EquipmentPart.HiddenWeeapon: return this.hiddenWeeapon;
            case EquipmentPart.MagicWeapon: return this.magicWeapon;
            default: return null;
        }
    }

    getEquipGems(part: EquipmentPart) {
        switch (part) {
            case EquipmentPart.Weapon: return this.weaponGems;
            case EquipmentPart.Helmet: return this.helmetGems;
            case EquipmentPart.Necklace: return this.necklaceGems;
            case EquipmentPart.Clothes: return this.clothesGems;
            case EquipmentPart.Ring: return this.ringGems;
            case EquipmentPart.Trousers: return this.trousersGems;
            case EquipmentPart.Amulet: return this.amuletGems;
            case EquipmentPart.Shoes: return this.shoesGems;
            default: return null;
        }
    }

    getEquipInfoStr(equip: Equipment, hasGem: boolean) {
        let str = "";
        if (equip) {
            const dressed = this.getDressedEquip(equip.part) == equip;
            str = `
                ${ equip.colorLevelName }${ dressed ? "&nbsp;(已装备)" : "" }<br>
			    ${ this.getEquipStartStr(equip.star) }<br>
                ${ equip.infoStr }
            `;
            const gems = hasGem ? this.getEquipGems(equip.part) : null;
            if (gems) {
                const tableItem = tableMgr.Item;
                const [ gem0, gem1, gem2, gem3 ] = gems;
                const { Quality: quality0, Name: name0 } = gem0 ? tableItem[ gem0 ] : {} as any;
                const { Quality: quality1, Name: name1 } = gem1 ? tableItem[ gem1 ] : {} as any;
                const { Quality: quality2, Name: name2 } = gem2 ? tableItem[ gem2 ] : {} as any;
                const { Quality: quality3, Name: name3 } = gem3 ? tableItem[ gem3 ] : {} as any;
                str += `
                    孔1:${ gem0 ? GameUtil.getColorStr(quality0, name0) : "空" }<br>
                    孔2:${ gem1 ? GameUtil.getColorStr(quality1, name1) : "空" }<br>
                    孔3:${ gem2 ? GameUtil.getColorStr(quality2, name2) : "空" }<br>
                    孔4:${ gem3 ? GameUtil.getColorStr(quality3, name3) : "空" }<br>
                `;
            }
            str += "评分:2.5万";
        }
        return str;
    }

    /** 副本剩余次数 */
    getCopyTime(copyId: number) {
        return tableMgr.FuBen[ copyId ].BattleCount - (this.copy[ copyId ] ?? 0);
    }

    /** 秘境剩余次数 */
    getSecretTime(secretId: number) {
        return tableMgr.MiJing[ secretId ].BattleCount - (this.secret[ secretId ] ?? 0);
    }

    /** 获取boss剩余冷却时间 */
    getBossCoolDown(bossId: number) {
        return Math.max(tableMgr.Boss[ bossId ].CoolTime - Math.floor(GameUtil.getServerTime() / 1000 - (this.boss[ bossId ] ?? 0)), 0);
    }


    private getEquipStartStr(star: number) {
        const maxStar = +tableMgr.Const[ 1010 ].Value;
        star = MathUtil.Clamp(star, 0, maxStar);
        let result = "";
        for (let i = 1; i <= maxStar; i++) {
            result += (star >= i ? "✭" : "✩");
        }
        return result;
    }

    @InsertEvent(NetResponse.Response_SyncInfo)
    private syncInfo(data: IUserData) {
        Object.keys(data).forEach(v => {
            const oldValue = this[ v ];
            this[ v ] = data[ v ];
            this.dispatch(`${ UpperFirst(v) }_Changed`, [ oldValue, data[ v ] ]);
        });
    }
}