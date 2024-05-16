export class TimeUtil {
    private static readonly lastDate = new Date();
    private static readonly nowDate = new Date();
    /** 获取毫秒级时间戳 */
    static milliSeconds() { return Date.now(); }
    /** 获取秒级时间戳 */
    static seconds() { return Math.floor(Date.now() / 1000); }

    /**
     * 检测是否是下一天
     * @param lastTime 
     * @param nowTime 
     * @returns 
     */
    static checkNextDay(lastTime: number, nowTime: number) {
        const { lastDate, nowDate } = this;
        lastDate.setTime(lastTime);
        nowDate.setTime(nowTime);
        const lastY = lastDate.getFullYear();
        const nowY = nowDate.getFullYear();
        let result = false;
        if (nowY > lastY) result = true;
        else if (nowY == lastY) {
            const lastM = lastDate.getMonth();
            const nowM = nowDate.getMonth();
            if (nowM > lastM) result = true;
            else if (nowM == lastM) {
                const lastD = lastDate.getDate();
                const nowD = nowDate.getDate();
                if (nowD > lastD) result = true;
            }
        }
        return result;
    }
}