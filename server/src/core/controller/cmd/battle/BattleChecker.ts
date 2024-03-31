import { BattleType } from "../../../enum/BattleEnums";
import { ErrorCode } from "../../../enum/ErrorCode";

export class BattleChecker {
    static checkEnterBattle(user: IUser, data: IEnterBattleInput, inBattle: boolean) {
        switch (data.type) {
            case BattleType.Level:
            case BattleType.Copy:
            case BattleType.Secret:
            case BattleType.Boss: if (inBattle) return ErrorCode.ALREADY_IN_BATTLE; break;
            default: return ErrorCode.UNKNOWN_BATTLE_TYPE;
        }
        const battle = user.battle;
        if (!battle.getConfig(data.type, data.id)) return ErrorCode.UNKNOWN_BATTLE_LEVEL;
        if (battle.getLastCount(data.type, data.id) <= 0) return ErrorCode.CHALLENGE_COUNT_NOT_ENOUGH;
        if (!battle.getIsCooldown(data.type, data.id)) return ErrorCode.COOLDOWN_NOT_COMPLETE;
        if (user.base.vigor < battle.getVigorCost(data.type, data.id)) return ErrorCode.VIGOR_NOT_ENOUGH;
        return ErrorCode.NONE;
    }

    static checkExitBattle(user: IUser, data: IExitBattleInput, inBattle: boolean) {
        if (!inBattle) return ErrorCode.NOT_IN_BATTLE;
        return ErrorCode.NONE;
    }

    static checkStartGather(user: IUser, data: IStartGatherInput) {
        if (user.battle.gather.gatherTimeMap[data.id]) return ErrorCode.ALREADY_IN_GATHER;
        return ErrorCode.NONE;
    }

    static checkBreakOffGather(user: IUser, data: IBreakOffGatherInput) {
        if (!user.battle.gather.gatherTimeMap[data.id]) return ErrorCode.NOT_IN_GATHER;
        return ErrorCode.NONE;
    }
}