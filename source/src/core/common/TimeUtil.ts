export class TimeUtil {
    static GetTimeStamp() {
        return Date.now();
    }

    static GetSecondStamp() {
        return Math.floor(Date.now() / 1000);
    }
}