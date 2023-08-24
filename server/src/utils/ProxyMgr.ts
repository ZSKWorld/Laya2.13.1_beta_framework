const ProxyKey = Symbol(111);
export class ProxyMgr {
    private static proxyMap: { [ uid: string ]: any } = {};

    static getProxy<T extends object>(uid: string, dataKey: string, target: T) {
        dataKey = dataKey || "";
        if (typeof target === "object" && target !== null && !target[ ProxyKey ]) {
            target[ ProxyKey ] = true;
            Object.keys(target).forEach(key => target[ key ] = this.getProxy(uid, `${ dataKey }.${ key }`, target[ key ]));
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
                    const tempKey = `${ dataKey }.${ p }`;
                    if (typeof p === "string")
                        target[ p ] = value;
                    else
                        target[ p ] = ProxyMgr.getProxy(uid, tempKey, value);
                    ProxyMgr.proxyMap[ uid ] = ProxyMgr.proxyMap[ uid ] || {};
                    ProxyMgr.proxyMap[ uid ][ tempKey ] = true;
                    return true;
                },
                // get(target: T, p: string, receiver: any) {
                //     return target[ p ];
                // }
            });
            return result;
        } else
            return target as any;
    }
}