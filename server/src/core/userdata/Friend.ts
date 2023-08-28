import { Decode } from "./Decode";

export class Friend extends Decode<IFriendData, IFriend> implements IFriend {
    friend: string[] = [];

    protected override onDecode(data: IFriendData, key: "friend") {
        const value = this[ key ];
        value.length = 0;
        value.push(...data[ key ]);
        return value;
    }
}