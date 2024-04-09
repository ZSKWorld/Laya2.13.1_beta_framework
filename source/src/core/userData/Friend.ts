import { ClassName, DecodeObject } from "./DecodeObject";

@ClassName("FriendData")
export class Friend extends DecodeObject<IFriend> implements IFriend {
    friend: string[];

}