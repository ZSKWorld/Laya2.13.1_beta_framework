import { DecodeObject } from "./DecodeObject";

export class Friend extends DecodeObject<IFriend> implements IFriend {
    friend: string[] = [];

    protected override onDecode(data: OriginData<IFriend>, key: OriginDataKeys<IFriend>) {
        const value = this[key];
        value.length = 0;
        value.push(...data[key]);
        return value;
    }
}