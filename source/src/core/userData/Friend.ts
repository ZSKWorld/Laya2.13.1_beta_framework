import { ClassName, DecodeObject } from "./DecodeObject";

@ClassName("Friend")
export class Friend extends DecodeObject<IFriend> implements IFriend {
    friend: string[];

}