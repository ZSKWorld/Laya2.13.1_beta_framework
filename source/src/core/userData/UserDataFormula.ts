/** 玩家数值计算公式 */
export class UserDataFormula {

    /** x ^ 4 * 10 */
    static exp(level: number) {
        return level ** 4 * 100;
    }

    /** i ^ 2.3 * 100 */
    static baseATK(level: number) {
        return Math.floor(level ** 2.3 * 100);
    }

    /** i ^ 3 * 100 */
    static baseHP(level: number) {
        return level ** 3 * 100;
    }
}