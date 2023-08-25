import { DecodeData } from "./DecodeData";

export class FriendData extends DecodeData<IFriend> implements IFriend {
    private static readonly ClassName = "FriendData";
    friend: string[];

}