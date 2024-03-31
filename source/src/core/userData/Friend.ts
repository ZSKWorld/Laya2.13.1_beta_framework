import { ClassName, DecodeObject } from "./DecodeObject";

@ClassName("FriendData")
export class Friend extends DecodeObject<IFriendData> implements IFriend {
    friend: string[];

}