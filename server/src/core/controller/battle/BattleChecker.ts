import { ErrorCode } from "../../enum/ErrorCode";

export class BattleChecker {
    static checkEnterBattle(user: IUser, data: EnterBattleInput) {
        const battle = user.battle;
        if (!battle.getConfig(data.type, data.id)) return ErrorCode.UNKNOWN_BATTLE_LEVEL;
        if (battle.getLastCount(data.type, data.id) <= 0) return ErrorCode.CHALLENGE_COUNT_NOT_ENOUGH;
        if (!battle.getIsCooldown(data.type, data.id)) return ErrorCode.COOLDOWN_NOT_COMPLETE;
        if (user.base.vigor < battle.getVigorCost(data.type, data.id)) return ErrorCode.VIGOR_NOT_ENOUGH;
        return ErrorCode.NONE;
    }
}