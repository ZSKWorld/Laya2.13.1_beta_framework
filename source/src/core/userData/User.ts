import { NetMessage } from "../net/enum/NetMessage";
import { Account } from "./Account";
import { Bag } from "./Bag";
import { Base } from "./Base";
import { Battle } from "./Battle";
import { Body } from "./Body";
import { ClassName, Decode } from "./Decode";
import { Friend } from "./Friend";

@ClassName("OfflineData")
class Offline extends Decode<IOffline> implements IOffline {
    offlineTime: number;
    vigor: number;
}

@ClassName("UserData")
export class User extends Decode<IUserData> implements IUser {

    //#region Properties
    account = new Account();
    base = new Base();
    offline?: IOffline;
    friend = new Friend();
    bag = new Bag();
    body = new Body();
    battle = new Battle();
    //#endregion

    protected override onDecode(data: IUserData, key: keyof IUserData) {
        if (key == "offline") return data[ key ];
        return (<IDecode<any, any>>this[ key ]).decode(data[ key ]);
    }

    @RegisterEvent(NetMessage.SyncInfo)
    private syncInfo(data: IUserData) {
        return this.decode(data);
    }
}
