import { GameUtil } from "../../utils/GameUtil";
import { TimeUtil } from "../../utils/TimeUtil";
import { Util } from "../../utils/Util";
import { Account } from "./Account";
import { Bag } from "./Bag";
import { Base } from "./Base";
import { Battle } from "./Battle";
import { Body } from "./Body";
import { Decode } from "./Decode";
import { Friend } from "./Friend";

export class User extends Decode<IUserData, IUser> implements IUser {
    account: IAccount = null;
    base: IBase = null;
    offline?: IOffline = null;
    friend: IFriend = null;
    body: IBody = null;
    bag: IBag = null;
    battle: IBattle = null;

    constructor(account: string, password: string, nickname: string) {
        super();
        this.account = new Account(account, password, nickname);
        this.base = new Base();
        this.friend = new Friend();
        this.body = new Body();
        this.bag = new Bag();
        this.battle = new Battle();
    }

    getSyncInfo(): Partial<IUser> { return null; }

    clearSyncInfo(): void { }

    getOffline() {
        if (!this.account.lastOnlineTime) return null;
        const timeOffset = ((TimeUtil.getTimeStamp() - this.account.lastOnlineTime) / 1000) << 0;
        if (timeOffset <= 5) return null;
        else return { offlineTime: timeOffset, vigor: (this.base.vigorRecover * timeOffset) << 0 };
    }

    save() {
        Util.saveData(this.encode());
    }

    protected override onEncode(key: keyof IUserData) {
        if (key == "offline") return null;
        else return this[ key ].encode();
    }

    protected override onDecode(data: IUserData, key: keyof IUserData) {
        switch (key) {
            case "offline": return null;
            default: return this[ key ].decode(data[ key ] as any);
        }
    }
}