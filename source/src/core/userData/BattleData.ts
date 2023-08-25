import { DecodeData } from "./DecodeData";

export class BattleData extends DecodeData<IBattle> implements IBattle {
    private static readonly ClassName = "BattleData";
    level: IBattleItem;
    copy: IBattleItem;
    secret: IBattleItem;
    boss: IBattleItem;

}