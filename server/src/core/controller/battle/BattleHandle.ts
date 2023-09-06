import { BattleType } from "../../enum/BattleEnums";
import { BaseDataType } from "../../enum/ItemEnum";

export class BattleHandle {
    static startBattle(user: IUser, data: StartBattleInput) {
        switch (data.type) {
            case BattleType.Level: user.battle.level.startBattle(data.id); break;
            case BattleType.Copy: user.battle.copy.startBattle(data.id); break;
            case BattleType.Secret: user.battle.secret.startBattle(data.id); break;
            case BattleType.Boss: user.battle.boss.startBattle(data.id); break;
            case BattleType.Gather: user.battle.gather.startBattle(data.id); break;
        }
        user.base.changeItemCount(BaseDataType.Vigor, -user.battle.getVigorCost(data.type, data.id));
    }
}