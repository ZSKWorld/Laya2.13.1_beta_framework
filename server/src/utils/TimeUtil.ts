import { Pool, PoolKey } from "../libs/pool/Pool";

export class TimeUtil {
    /** 获取毫秒级时间戳 */
    static milliSeconds() { return Date.now(); }
    /** 获取秒级时间戳 */
    static seconds() { return Math.floor(Date.now() / 1000); }

    static checkNextDay(lastTime: number, nowTime: number) {
        const lastDate = Pool.get(PoolKey.Date, Date);
        const nowDate = Pool.get(PoolKey.Date, Date);
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
        Pool.recover(PoolKey.Date, lastDate);
        Pool.recover(PoolKey.Date, nowDate);
        return result;
    }
}