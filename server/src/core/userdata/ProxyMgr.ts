import { EquipmentsSign, UserKeyMap } from "./DataConst";
import { Equipment, ItemBase } from "./Item";
import { UserData } from "./UserData";

const enum DataType {
    Number = "Number",
    String = "String",
    Boolean = "Boolean",
    Object = "Object",
    Array = "Array",
    ItemBase = "ItemBase",
    Equipment = "Equipment",
}

type SyncProxy<T> = T & {
    getSyncKeys(): void;
    clearSyncInfo(): void;
}

const ProxyKey = Symbol(111);
export class ProxyMgr {
    private static proxyMap: { [ uid: string ]: any } = new Proxy({}, {
        get(target, p, receiver) {
            if (target[ p ] === void 0) target[ p ] = {};
            return target[ p ];
        },
    });
    

    static getSyncInfo(userData: IUserData) {
        const keyMap = this.proxyMap[ userData.uid ];
        const syncInfo = {};
        Object.keys(keyMap).forEach(key => syncInfo[ key ] = userData[ key ]);
        this.proxyMap[ userData.uid ] = {};
        return syncInfo;
    }

    static clearSyncInfo(uid: string) {
        this.proxyMap[ uid ] = {};
    }

    static createUserData(uid: string) {
        const _this = this;
        let user: IUserData = new UserData("", "", "");
        return new Proxy(user, {
            set(target: any, p: string, value: any, receiver: any): boolean {
                switch (p) {
                    case UserKeyMap.uid: break;
                    case UserKeyMap.nickname: break;
                    case UserKeyMap.account: break;
                    case UserKeyMap.password: break;
                    case UserKeyMap.registerTime: break;
                    case UserKeyMap.lastLoginTime: break;
                    case UserKeyMap.lastOnlineTime: break;
                    case UserKeyMap.offline: break;
                    case UserKeyMap.coin: break;
                    case UserKeyMap.vcoin: break;
                    case UserKeyMap.vigor: break;
                    case UserKeyMap.jingJie: break;
                    case UserKeyMap.cengJi: break;
                    case UserKeyMap.exp: break;
                    case UserKeyMap.moHe: break;
                    case UserKeyMap.moBi: break;
                    case UserKeyMap.spiritStones: break;
                    case UserKeyMap.title: break;
                    case UserKeyMap.society: break;
                    case UserKeyMap.sect: break;
                    case UserKeyMap.soul: break;
                    case UserKeyMap.gemScore: break;
                    case EquipmentsSign: break;

                    case UserKeyMap.weapon: value = _this.createEquipment(uid, p, value); break;
                    case UserKeyMap.helmet: value = _this.createEquipment(uid, p, value); break;
                    case UserKeyMap.necklace: value = _this.createEquipment(uid, p, value); break;
                    case UserKeyMap.clothes: value = _this.createEquipment(uid, p, value); break;
                    case UserKeyMap.ring: value = _this.createEquipment(uid, p, value); break;
                    case UserKeyMap.trousers: value = _this.createEquipment(uid, p, value); break;
                    case UserKeyMap.amulet: value = _this.createEquipment(uid, p, value); break;
                    case UserKeyMap.shoes: value = _this.createEquipment(uid, p, value); break;
                    case UserKeyMap.mount: value = _this.createEquipment(uid, p, value); break;
                    case UserKeyMap.hiddenWeeapon: value = _this.createEquipment(uid, p, value); break;
                    case UserKeyMap.fashion: value = _this.createEquipment(uid, p, value); break;
                    case UserKeyMap.magicWeapon: value = _this.createEquipment(uid, p, value); break;

                    case UserKeyMap.weaponGems: value = _this.createArray(uid, p, value); break;
                    case UserKeyMap.helmetGems: value = _this.createArray(uid, p, value); break;
                    case UserKeyMap.necklaceGems: value = _this.createArray(uid, p, value); break;
                    case UserKeyMap.clothesGems: value = _this.createArray(uid, p, value); break;
                    case UserKeyMap.ringGems: value = _this.createArray(uid, p, value); break;
                    case UserKeyMap.trousersGems: value = _this.createArray(uid, p, value); break;
                    case UserKeyMap.amuletGems: value = _this.createArray(uid, p, value); break;
                    case UserKeyMap.shoesGems: value = _this.createArray(uid, p, value); break;

                    case UserKeyMap.level: value = _this.getTargetProxy(uid, p, value); break;
                    case UserKeyMap.copy: value = _this.getTargetProxy(uid, p, value); break;
                    case UserKeyMap.secret: value = _this.getTargetProxy(uid, p, value); break;
                    case UserKeyMap.boss: value = _this.getTargetProxy(uid, p, value); break;
                    case UserKeyMap.citta: value = _this.getTargetProxy(uid, p, value); break;

                    case UserKeyMap.skill: value = _this.createArray(uid, p, value); break;
                    case UserKeyMap.usingSkill: value = _this.createArray(uid, p, value); break;
                    case UserKeyMap.collect: value = _this.createArray(uid, p, value); break;

                    case UserKeyMap.equipment: value = _this.createArray(uid, p, value.map(v => _this.createEquipment(uid, p, v))); break;
                    case UserKeyMap.gem: value = _this.createArray(uid, p, value.map(v => _this.createItem(uid, p, v))); break;
                    case UserKeyMap.prop: value = _this.createArray(uid, p, value.map(v => _this.createItem(uid, p, v))); break;
                    case UserKeyMap.material: value = _this.createArray(uid, p, value.map(v => _this.createItem(uid, p, v))); break;
                    case UserKeyMap.book: value = _this.createArray(uid, p, value.map(v => _this.createItem(uid, p, v))); break;
                    case UserKeyMap.other: value = _this.createArray(uid, p, value.map(v => _this.createItem(uid, p, v))); break;
                    default: throw new Error("unknown key => " + p);
                }
                target[ p ] = value;
                ProxyMgr.proxyMap[ user.uid ][ p ] = true;
                return true;
            }
        });
    }

    static createEquipment(uid: string, dataKey: string, id: number): Equipment;
    static createEquipment(uid: string, dataKey: string, source: IEquipment): Equipment;
    static createEquipment(uid: string, dataKey: string, arg: any) {
        let obj: Equipment;
        if (typeof arg == "number") obj = new Equipment(arg);
        else obj = arg ? Object.assign(new Equipment(0), arg) : null;
        return this.getTargetProxy(uid, dataKey, obj);
    }

    static createItem(uid: string, dataKey: string, id: number, count: number): ItemBase;
    static createItem(uid: string, dataKey: string, source: IItemBase): ItemBase;
    static createItem(uid: string, dataKey: string, arg1: any, arg2?: any) {
        let obj: ItemBase;
        if (typeof arg1 == "number") obj = new ItemBase(arg1, arg2);
        else obj = arg1 ? Object.assign(new ItemBase(0, 0), arg1) : null;
        return this.getTargetProxy(uid, dataKey, obj);
    }

    static createArray<T = number>(uid: string, dataKey: string, source: T[]) {
        const _this = this;
        let obj: T[] = source || [];
        if (obj[ ProxyKey ]) return obj;
        const result = new Proxy(obj, {
            set(target: any, p: string | symbol, value: any, receiver: any): boolean {
                const type = value.constructor.name;
                switch (type) {
                    case DataType.Number:
                    case DataType.String:
                    case DataType.Boolean: target[ p ] = value; break;
                    case DataType.Object: target[ p ] = _this.getTargetProxy(uid, dataKey, value); break;
                    case DataType.Array: target[ p ] = _this.createArray(uid, dataKey, value); break;
                    case DataType.ItemBase: target[ p ] = _this.createItem(uid, dataKey, value); break;
                    case DataType.Equipment: target[ p ] = _this.createEquipment(uid, dataKey, value); break;
                    default: throw new Error("unknown type => " + type);
                }
                ProxyMgr.proxyMap[ uid ][ dataKey ] = true;
                return true;
            },
        });
        result[ ProxyKey ] = true;
        return result as T;
    }

    static getTargetProxy<T extends object>(uid: string, dataKey: string, target: T): SyncProxy<T> {
        if (typeof target === "object" && target !== null && !target[ ProxyKey ]) {
            Object.keys(target).forEach(key => target[ key ] = this.getTargetProxy(uid, dataKey, target[ key ]));
            target[ "getSyncKeys" ] = function () { return Object.keys(ProxyMgr.proxyMap[ uid ]); };
            target[ "clearSyncInfo" ] = function () { ProxyMgr.proxyMap[ uid ] = {}; }
            const result = new Proxy(target, {
                set(target: any, p: string | symbol, value: any, receiver: any): boolean {
                    target[ p ] = ProxyMgr.getTargetProxy(uid, dataKey, value);
                    ProxyMgr.proxyMap[ uid ][ dataKey ] = true;
                    return true;
                }
            });
            result[ ProxyKey ] = true;
            return result;
        } else
            return target as any;
    }

    static aaa() {

    }
}