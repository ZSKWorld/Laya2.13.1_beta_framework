import { BattleType } from "../../enum/BattleEnums";
import { BaseDataType } from "../../enum/ItemEnum";

export class BattleHandle {
    static enterBattle(user: IUser, data: EnterBattleInput) {
        switch (data.type) {
            case BattleType.Level: user.battle.level.enterBattle(data.id); break;
            case BattleType.Copy: user.battle.copy.enterBattle(data.id); break;
            case BattleType.Secret: user.battle.secret.enterBattle(data.id); break;
            case BattleType.Boss: user.battle.boss.enterBattle(data.id); break;
            case BattleType.Gather: user.battle.gather.enterBattle(data.id); break;
        }
        user.base.changeItemCount(BaseDataType.Vigor, -user.battle.getVigorCost(data.type, data.id));
    }
}