
export class GameUtil {

    static cantSyncObj<T>(obj: T) {
        if (obj != null && typeof obj == "object") {
            Object.defineProperty(obj, "cantSyncObj", {
                configurable: false,
                enumerable: false,
                value: true,
            });
        }
        return obj;
    }
}