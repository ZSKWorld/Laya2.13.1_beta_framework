import { DecodeObject } from "./DecodeObject";

export class Friend extends DecodeObject<IFriendData, IFriend> implements IFriend {
    friend: string[] = [];

    protected override onDecode(data: IFriendData, key: "friend") {
        const value = this[key];
        value.length = 0;
        value.push(...data[key]);
        return value;
    }
}