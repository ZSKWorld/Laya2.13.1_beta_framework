export class TimeUtil {
    static getTimeStamp() { return Date.now(); }
    static getTimeSecStamp() { return (Date.now() / 1000) << 0; }
}