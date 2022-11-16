export type SyncProxy<T> = T & {
    getSyncInfo(): any;
    clearSyncInfo(): void;
}

const ProxyKey = Symbol(111);
export class ProxyMgr {
    private static proxyMap: { [ uid: string ]: any } = {};

    static getTargetProxy<T extends object>(uid: string, dataKey: string, target: T): SyncProxy<T> {
        if (typeof target === "object" && target !== null && !target[ ProxyKey ]) {
            Object.keys(target).forEach(key => target[ key ] = this.getTargetProxy(uid, dataKey || key, target[ key ]));
            Object.defineProperty(target, "getSyncInfo", {
                value: function () {
                    const keyMap = ProxyMgr.proxyMap[ uid ];
                    ProxyMgr.proxyMap[ uid ] = null;
                    if (keyMap) {
                        Object.keys(keyMap).forEach(key => keyMap[ key ] = this[ key ]);
                    }
                    return keyMap;
                },
                enumerable: false,
                configurable: false,
            });
            Object.defineProperty(target, "clearSyncInfo", {
                value: function () { ProxyMgr.proxyMap[ uid ] = null; },
                enumerable: false,
                configurable: false,
            });
            const result = new Proxy(target, {
                set(target: any, p: string, value: any, receiver: any): boolean {
                    if (typeof p === "string" && p.startsWith("$"))
                        target[ p ] = value;
                    else
                        target[ p ] = ProxyMgr.getTargetProxy(uid, dataKey || p, value);
                    ProxyMgr.proxyMap[ uid ] = ProxyMgr.proxyMap[ uid ] || {};
                    ProxyMgr.proxyMap[ uid ][ dataKey || p ] = true;
                    return true;
                }
            });
            result[ ProxyKey ] = true;
            return result;
        } else
            return target as any;
    }
}