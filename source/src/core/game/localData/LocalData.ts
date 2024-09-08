class LocalData {
    set<T>(key: string, value: T) {
        Laya.LocalStorage.setJSON(key, value);
    }

    get<T = any>(key: string): T {
        return Laya.LocalStorage.getJSON(key);
    }

    remove(key: string) {
        Laya.LocalStorage.removeItem(key);
    }

    removeAll() {
        Laya.LocalStorage.clear();
    }
}
export const localData = new LocalData();
WindowImmit("localData", localData);
