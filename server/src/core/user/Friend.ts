import { CantSyncObj } from "./CantSyncObj";

export class Friend extends CantSyncObj implements IFriend {
    friend: string[];
}