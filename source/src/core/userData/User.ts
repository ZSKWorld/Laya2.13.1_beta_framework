import { NetCMD } from "../net/enum/NetCMD";
import { Account } from "./Account";
import { Bag } from "./Bag";
import { Base } from "./Base";
import { Battle } from "./Battle";
import { Body } from "./Body";
import { ClassName, DecodeObject } from "./DecodeObject";
import { Friend } from "./Friend";

@ClassName("OfflineData")
class Offline extends DecodeObject<IOffline> implements IOffline {
    offlineTime: number;
    vigor: number;
}

@ClassName("UserData")
export class User extends DecodeObject<IUser> implements IUser {

    //#region Properties
    account = new Account();
    base = new Base();
    offline?: IOffline;
    friend = new Friend();
    bag = new Bag();
    body = new Body();
    battle = new Battle();
    //#endregion

    protected override onDecode(data: OriginData<IUser>, key: OriginDataKeys<IUser>) {
        switch (key) {
            case "offline":return data[key];
            default: return this[key].decode(data[key] as any);
        }
    }

    @RegisterEvent(NetCMD.SyncInfo)
    private syncInfo(data: OriginData<IUser>) {
        return this.decode(data);
    }
}
