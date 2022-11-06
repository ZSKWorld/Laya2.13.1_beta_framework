class LocalData {
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
export const localData = new LocalData();
