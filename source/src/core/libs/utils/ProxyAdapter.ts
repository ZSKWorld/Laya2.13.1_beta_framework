
/**
 * 模拟Proxy
 */
type proxyHandle = {
    get?(target: any, key: string): any;
    set?(target: any, key: string, value: any): boolean;
};
export function ProxyAdapter(target: KeyMap<any>, handle: proxyHandle) {
    const proxyObj: any = { ...target };
    Object.keys(proxyObj).forEach((key) => {
        Object.defineProperty(proxyObj, key, {
            get() {
                if (handle.get)
                    return handle.get(target, key);
                else
                    return target[ key ];
            },
            set(value) {
                if (handle.set)
                    handle.set(target, key, value);
                else
                    target[ key ] = value;
            }
        });
    });
    return proxyObj;
}
