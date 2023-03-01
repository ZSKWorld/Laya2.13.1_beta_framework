import { GameUtil } from "../../utils/GameUtil";
import { TimeUtil } from "../../utils/TimeUtil";
import { Util } from "../../utils/Util";
import { Account } from "./Account";
import { Bag } from "./Bag";
import { Base } from "./Base";
import { Battle } from "./Battle";
import { Body } from "./Body";
import { Equipment } from "./Equipment";
import { Friend } from "./Friend";
import { ItemBase } from "./ItemBase";

const EncodeData: { name: string, Class: Class<ItemBase> }[] = [
    { name: "$equipments", Class: Equipment },//ItemBagType.Equip
    { name: "$Prop", Class: ItemBase },//ItemBagType.Prop
    { name: "$Gem", Class: ItemBase },//ItemBagType.Gem
    { name: "$Material", Class: ItemBase },//ItemBagType.Material
    { name: "$Book", Class: ItemBase },//ItemBagType.Book
    { name: "$Other", Class: ItemBase },//ItemBagType.Other
];

export class User implements IUser {
    account: IAccount;
    base: IBase;
    offline?: IOffline;
    friend: IFriend;
    body: IBody;
    bag: IBag;
    battle: IBattle;

    constructor(account: string, password: string, nickname: string) {
        this.account = new Account(account, password, nickname);
        this.base = new Base();
        this.friend = new Friend();
        this.body = new Body();
        this.bag = new Bag();
        this.battle = new Battle();
    }

    getSyncInfo(): Partial<IUser> { return null; }

    clearSyncInfo(): void { }

    login(source: IUser) {
        const encodeDatas: any[][][] = [];
        EncodeData.forEach(v => {
            encodeDatas.push(source.bag[ v.name ]);
            delete source[ v.name ];
        });

        Object.keys(source).forEach(v => this[ v ] = source[ v ]);

        const { equipment, prop, gem, material, book, other } = this.bag;
        const objects = [ equipment, prop, gem, material, book, other ];
        encodeDatas.forEach((typeData, objIndex) => {
            if (typeData) {
                const keys = typeData.shift();
                typeData.forEach(data => {
                    const item = new EncodeData[ objIndex ].Class();
                    keys.reduce((pv, cv, index) => (pv[ cv ] = data[ index ], pv), item);
                    objects[ objIndex ].push(item);
                });
            }
        });
        this.account.login();

        this.offline = this.getOffline();
    }

    logout() {
        this.account.logout();
        this.save();
    }

    save() {
        this.offline = null;
        const encodeKeys: string[] = [];
        EncodeData.forEach(v => encodeKeys.push(v.name));
        const { equipment, prop, gem, material, book, other } = this.bag;
        const objects = [ equipment, prop, gem, material, book, other ];

        objects.forEach((obj, objIndex) => {
            if (obj.length) {
                const itemKeys = Object.keys(obj[ 0 ]);
                const items = this.bag[ encodeKeys[ objIndex ] ] = [ itemKeys ];
                obj.forEach(data => {
                    const result = [];
                    itemKeys.forEach(key => result.push(data[ key ]));
                    items.push(result);
                });
                obj.length = 0;
            }
        });
        Util.saveData(this);
    }

    private getOffline(): IOffline {
        if (!this.account.lastOnlineTime) return null;
        const timeOffset = ((TimeUtil.getTimeStamp() - this.account.lastOnlineTime) / 1000) << 0;
        if (timeOffset <= 5) return null;
        else return GameUtil.cantSyncObj({ offlineTime: timeOffset, vigor: (this.base.getVigorRecoveryRate() * timeOffset) << 0 });
    }
}