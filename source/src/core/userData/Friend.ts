import { Decode } from "./Decode";

export class Friend extends Decode<IFriend> implements IFriend {
    private static readonly ClassName = "FriendData";
    friend: string[];

}