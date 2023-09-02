import { Pool, PoolKey } from "../libs/pool/Pool";

export class TimeUtil {
    static getTimeStamp() { return Date.now(); }
    static getSecondStamp() { return Math.floor(Date.now() / 1000); }

    static checkNetDay(lastTime: number, nowTime: number) {
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