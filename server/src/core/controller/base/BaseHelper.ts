export class BaseHelper {

    /**
     * 境界转等级
     * @param jingJie 境界
     * @param cengJi 层级
     * @returns 等级
     */
    static jingJieToLevel(jingJie: number, cengJi: number) {
        return (jingJie - 1) * (+cfgMgr.Const[ 1005 ].Value) + cengJi;
    }

    /**
     * 等级转境界
     * @param level 等级
     * @returns 境界及层级
     */
    static levelToJingJie(level: number) {
        let jingJie = 0;
        let cengJi = 0;
        const maxCengJie = +cfgMgr.Const[ 1005 ].Value;
        if (level % maxCengJie == 0) {
            jingJie = level / maxCengJie;
            cengJi = maxCengJie;
        } else {
            jingJie = Math.floor(level / maxCengJie);
            cengJi = level - jingJie * maxCengJie;
            jingJie += 1;
        }
        return { jingJie, cengJi };
    }
}