export class TimeUtil {
    private static _date = new Date();
    static milliSecond() {
        return Date.now();
    }

    static second() {
        return Math.floor(Date.now() / 1000);
    }

    static milliSecond2YMDHMS(milliSecond: number) {
        this._date.setTime(milliSecond);
        return this._date.toLocaleString();
    }
}