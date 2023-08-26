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
    account: IAccount;
    base: IBase;
    offline?: IOffline;
    friend: IFriend;
    body: IBody;
    bag: IBag;
    battle: IBattle;

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

    save() {
        Util.saveData(this.encode());
    }

    protected override onEncode(key: keyof this) {
        if (key == "offline") return null;
        else return (<IDecode<any, any>>this[ key ]).encode();
    }

    protected override onDecode(data: IUserData, key: keyof IUserData) {
        switch (key) {
            case "offline": return this.getOffline();
            default: return this[ key ].decode(data[ key ] as any);
        }
    }

    private getOffline(): IOffline {
        if (!this.account.lastOnlineTime) return null;
        const timeOffset = ((TimeUtil.getTimeStamp() - this.account.lastOnlineTime) / 1000) << 0;
        if (timeOffset <= 5) return null;
        else return GameUtil.cantSyncObj({ offlineTime: timeOffset, vigor: (this.base.getVigorRecoveryRate() * timeOffset) << 0 });
    }
}