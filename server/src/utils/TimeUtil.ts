export class TimeUtil {
    static getTimeStamp() { return Date.now(); }
    static getSecondStamp() { return Math.floor(Date.now() / 1000); }
}