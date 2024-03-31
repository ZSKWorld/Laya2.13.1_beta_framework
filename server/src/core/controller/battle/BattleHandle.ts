import { BattleType } from "../../enum/BattleEnums";
import { BaseDataType } from "../../enum/ItemEnum";

export class BattleHandle {
    static enterBattle(user: IUser, data: IEnterBattleInput) {
        switch (data.type) {
            case BattleType.Level: user.battle.level.enterBattle(data.id); break;
            case BattleType.Copy: user.battle.copy.enterBattle(data.id); break;
            case BattleType.Secret: user.battle.secret.enterBattle(data.id); break;
            case BattleType.Boss: user.battle.boss.enterBattle(data.id); break;
        }
        user.base.changeItemCount(BaseDataType.Vigor, -user.battle.getVigorCost(data.type, data.id));
    }

    static startGather(user: IUser, data: IStartGatherInput): void {
        user.battle.gather.startGather(data.id, data.gatherTime);
    }

    static breakOffGather(user: IUser, data: IBreakOffGatherInput): void {
        user.battle.gather.breakOffGather(data.id);
    }
}