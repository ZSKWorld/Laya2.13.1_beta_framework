export const CantSyncKey = Symbol("CantSyncKey");
export const HadSyncKey = Symbol("HadSyncKey");
export class ProxyMgr {
    private static proxyMap: { [uid: string]: any } = {};

    static getProxy<T extends object>(uid: string, dataKey: string, target: T, addSyncFunc: boolean = true) {
        dataKey = dataKey || "";
        if (target != null && typeof target === "object" && !target[HadSyncKey] && !target[CantSyncKey]) {
            target[HadSyncKey] = true;
            Object.keys(target).forEach(key => target[key] = this.getProxy(uid, `${ dataKey }.${ key }`, target[key], false));
            if (addSyncFunc) {
                Object.defineProperty(target, "getSyncInfo", {
                    value: function () {
                        let result: object;
                        const keyMap = ProxyMgr.proxyMap[uid];
                        ProxyMgr.proxyMap[uid] = null;
                        if (keyMap) {
                            result = {};
                            Object.keys(keyMap).forEach(keyStr => {
                                let tempThis = this;
                                let tempResult = result;
                                const properties = keyStr.split(".");
                                for (let i = 0, n = properties.length - 1; i <= n; i++) {
                                    const key = properties[i];
                                    if (!key) continue;
                                    if (i == n) {
                                        tempResult[key] = tempThis[key];
                                    } else {
                                        tempThis = tempThis[key];
                                        if (Array.isArray(tempThis)) {
                                            tempResult[key] = tempThis;
                                            break;
                                        }
                                        tempResult = tempResult[key] = tempResult[key] || {};
                                    }
                                }
                            });
                        }
                        return result;
                    },
                    enumerable: false,
                    configurable: false,
                });
                Object.defineProperty(target, "clearSyncInfo", {
                    value: function () { ProxyMgr.proxyMap[uid] = null; },
                    enumerable: false,
                    configurable: false,
                });
            }
            const result = new Proxy(target, {
                set(target: any, p: string, value: any, receiver: any): boolean {
                    const tempKey = `${ dataKey }.${ p }`;
                    if (typeof p === "string")
                        target[p] = value;
                    else
                        target[p] = ProxyMgr.getProxy(uid, tempKey, value, false);
                    ProxyMgr.proxyMap[uid] = ProxyMgr.proxyMap[uid] || {};
                    ProxyMgr.proxyMap[uid][tempKey] = true;
                    return true;
                },
                // get(target: T, p: string, receiver: any) {
                //     return target[ p ];
                // }
            });
            return result;
        } else
            return target;
    }
}