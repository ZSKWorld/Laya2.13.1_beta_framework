import { ClassName, Decode } from "./Decode";

@ClassName("FriendData")
export class Friend extends Decode<IFriendData> implements IFriend {
    friend: string[];

}