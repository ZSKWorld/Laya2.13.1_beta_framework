import { GameUtil } from "../common/GameUtil";
import { Observer } from "../libs/event/Observer";
import { MathUtil } from "../libs/math/MathUtil";
import { UpperFirst } from "../libs/utils/Util";
import { BaseDataType, DataType, EquipmentPart, ItemBagType } from "../net/enum/ItemEnum";
import { NetMessage } from "../net/enum/NetMessage";
import { AccountData } from "./AccountData";
import { BagData } from "./BagData";
import { BaseData } from "./BaseData";
import { BattleData } from "./BattleData";
import { BodyData } from "./BodyData";
import { DecodeData } from "./DecodeData";
import { FriendData } from "./FriendData";
import { Equipment } from "./ItemData";

class OfflineData extends DecodeData<IOffline> implements IOffline {
    private static readonly ClassName = "OfflineData";
    offlineTime: number;
    vigor: number;
}


export class UserData extends DecodeData<IUserData> implements IUserData {

    //#region Properties
    account = new AccountData();
    base = new BaseData();
    offline?= new OfflineData();
    friend = new FriendData();
    bag = new BagData();
    body = new BodyData();
    battle = new BattleData();
    //#endregion

    /** 升级经验 */
    get upgradeExp() { return GameUtil.GetUpgradExp(this.jingJie, this.cengJi); }

    /** 获取最大精力 */
    get maxVigro() {
        let xinFaJL = 0;
        const citta = this.citta;
        Object.keys(citta).forEach(v => xinFaJL += (citta[ v ] * cfgMgr.XinFaBook[ v ].JLAdd));
        return Math.floor(86400 + xinFaJL);
    }

    /** 获取精力恢复 */
    get jingLiHuiFu() {
        let xinFaJLHF = 0;
        const citta = this.citta;
        Object.keys(citta).forEach(v => xinFaJLHF += (citta[ v ] * cfgMgr.XinFaBook[ v ].JLHFAdd));
        return 1 + xinFaJLHF;
    }

    getItemCount(id: number): number {
        const item = cfgMgr.Item[ id ];
        switch (item.DataType) {
            case DataType.BaseData:
                switch (id) {
                    case BaseDataType.Coin: return this.coin;
                    case BaseDataType.Vcoin: return this.vcoin;
                    case BaseDataType.Exp: return this.exp;
                    case BaseDataType.MoHe: return this.moHe;
                    case BaseDataType.MoBi: return this.moBi;
                    case BaseDataType.SpiritStones: return this.spiritStones;
                    case BaseDataType.Soul: return this.soul;
                    case BaseDataType.GemScore: return this.gemScore;
                    case BaseDataType.Vigor: return this.vigor;
                    default: return 0;
                }
            case DataType.BagData: return this.getItem(id)?.count || 0;
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
                const tableItem = cfgMgr.Item;
                const [ gem0, gem1, gem2, gem3 ] = gems;
                const { Quality: quality0, Name: name0 } = gem0 ? tableItem[ gem0 ] : {} as any;
                const { Quality: quality1, Name: name1 } = gem1 ? tableItem[ gem1 ] : {} as any;
                const { Quality: quality2, Name: name2 } = gem2 ? tableItem[ gem2 ] : {} as any;
                const { Quality: quality3, Name: name3 } = gem3 ? tableItem[ gem3 ] : {} as any;
                str += `
                    孔1:${ gem0 ? GameUtil.GetColorStr(quality0, name0) : "空" }<br>
                    孔2:${ gem1 ? GameUtil.GetColorStr(quality1, name1) : "空" }<br>
                    孔3:${ gem2 ? GameUtil.GetColorStr(quality2, name2) : "空" }<br>
                    孔4:${ gem3 ? GameUtil.GetColorStr(quality3, name3) : "空" }<br>
                `;
            }
            str += "评分:2.5万";
        }
        return str;
    }

    /** 副本剩余次数 */
    getCopyTime(copyId: number) {
        return cfgMgr.FuBen[ copyId ].BattleCount - (this.copy[ copyId ] ?? 0);
    }

    /** 秘境剩余次数 */
    getSecretTime(secretId: number) {
        return cfgMgr.MiJing[ secretId ].BattleCount - (this.secret[ secretId ] ?? 0);
    }

    /** 获取boss剩余冷却时间 */
    getBossCoolDown(bossId: number) {
        return Math.max(cfgMgr.Boss[ bossId ].CoolTime - Math.floor(GameUtil.GetServerTime() / 1000 - (this.boss[ bossId ] ?? 0)), 0);
    }


    isCollect(id: number) { return this.collect.includes(id); }

    getItem(id: number) {
        const item = cfgMgr.Item[ id ];
        if (!item) return null;
        let datas: IItemBaseData[];
        switch (item.BagType) {
            case ItemBagType.Prop: datas = this.prop; break;
            case ItemBagType.Gem: datas = this.gem; break;
            case ItemBagType.Material: datas = this.material; break;
            case ItemBagType.Book: datas = this.book; break;
            case ItemBagType.Other: datas = this.other; break;
        }
        if (datas) return datas.find(v => v.id == id);
        else return null;
    }

    getItems(type: ItemBagType) {
        switch (type) {
            case ItemBagType.Collect: return this.collect.filter(v => !!this.getItem(v)).map(v => this.getItem(v));
            case ItemBagType.Equip: return this.equipment;
            case ItemBagType.Prop: return this.prop;
            case ItemBagType.Gem: return this.gem;
            case ItemBagType.Material: return this.material;
            case ItemBagType.Book: return this.book;
            case ItemBagType.Other: return this.other;
            default: return null;
        }
    }


    private getEquipStartStr(star: number) {
        const maxStar = +cfgMgr.Const[ 1010 ].Value;
        star = MathUtil.Clamp(star, 0, maxStar);
        let result = "";
        for (let i = 1; i <= maxStar; i++) {
            result += (star >= i ? "✭" : "✩");
        }
        return result;
    }

    @RegisterEvent(NetMessage.SyncInfo)
    private syncInfo(data: IUserData) {
        Object.keys(data).forEach(v => {
            (<IDecode<any>>this[ v ]).decode(data[ v ]);
            this.dispatch(`${ UpperFirst(v) }_Changed`, [ oldValue, data[ v ] ]);
        });
    }
}
