import { Decode } from "./Decode";

export class Friend extends Decode<IFriendData, IFriend> implements IFriend {
    friend: string[];
}