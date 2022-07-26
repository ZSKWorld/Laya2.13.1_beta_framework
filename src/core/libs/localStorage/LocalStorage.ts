
/*
 * @Author       : zsk
 * @Date         : 2021-09-17 13:15:52
 * @LastEditors  : zsk
 * @LastEditTime : 2021-09-17 14:07:41
 * @Description  : null
 */
class LocalStorage {
    set(key: string, value: any): void {
        Laya.LocalStorage.setJSON(key, value);
    }

    get<T = any>(key: string): T {
        return Laya.LocalStorage.getJSON(key);
    }

    remove(key: string): void {
        Laya.LocalStorage.removeItem(key);
    }

    removeAll(): void {
        Laya.LocalStorage.clear();
    }
}
export const storage = new LocalStorage();
