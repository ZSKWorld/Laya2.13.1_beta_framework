import { GameUtil } from "../../utils/GameUtil";
import { TimeUtil } from "../../utils/TimeUtil";
import { Util } from "../../utils/Util";
import { Account } from "./Account";
import { Bag } from "./Bag";
import { Base } from "./Base";
import { Battle } from "./Battle";
import { Body } from "./Body";
import { Friend } from "./Friend";

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
        this.account.decode(source.account);
        this.base.decode(source.base);
        this.friend.decode(source.friend);
        this.body.decode(source.body);
        this.bag.decode(source.bag);
        this.battle.decode(source.battle);
        this.offline = this.getOffline();
        this.account.login();
    }

    logout() {
        this.account.logout();
        this.save();
    }

    save() {
        const result = {} as IUser;
        result.account = this.account.encode();
        result.base = this.base.encode();
        result.friend = this.friend.encode();
        result.body = this.body.encode();
        result.bag = this.bag.encode();
        result.battle = this.battle.encode();
        Util.saveData(result);
    }

    private getOffline(): IOffline {
        if (!this.account.lastOnlineTime) return null;
        const timeOffset = ((TimeUtil.getTimeStamp() - this.account.lastOnlineTime) / 1000) << 0;
        if (timeOffset <= 5) return null;
        else return GameUtil.cantSyncObj({ offlineTime: timeOffset, vigor: (this.base.getVigorRecoveryRate() * timeOffset) << 0 });
    }
}