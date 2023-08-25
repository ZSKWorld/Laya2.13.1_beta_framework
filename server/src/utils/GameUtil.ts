
export class GameUtil {

    static cantSyncObj<T>(obj: T) {
        if (typeof obj == "object") {
            Object.defineProperty(obj, "CantSyncObj", {
                configurable: false,
                enumerable: false,
                value: true,
            });
        }
        return obj;
    }
}