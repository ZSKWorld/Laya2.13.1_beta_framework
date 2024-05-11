import { TimeUtil } from "./TimeUtil";

export class GameUtil {
    private static _gid = 0;
    static getGID() { return ++this._gid; }
    /**生成uid */
    static CreateUID() {
        return (TimeUtil.milliSeconds() ** (Math.random() + 0.01)).toString(32).replace(".", "");
    }

    static generateUUID() {
        let d = new Date().getTime();
        const temp = 36;
        const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * temp) % temp | 0;
            d = Math.floor(d / temp);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(temp);
        });
        return uuid;
    }
}