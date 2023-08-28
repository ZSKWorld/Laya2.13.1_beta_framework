import { Decode } from "./Decode";

export class Friend extends Decode<IFriendData> implements IFriend {
    private static readonly ClassName = "FriendData";
    friend: string[];

}