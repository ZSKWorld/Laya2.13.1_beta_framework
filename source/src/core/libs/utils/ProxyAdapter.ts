
/**
 * 模拟Proxy
 */
type proxyHandle = { get(target: any, key: string): any };
export function ProxyAdapter(target: { [ key: string ]: undefined }, handle: proxyHandle) {
    const proxyObj: any = { ...target };
    Object.keys(proxyObj).forEach((key) => {
        Object.defineProperty(proxyObj, key, {
            get() {
                return handle.get && handle.get(target, key);
            }
        });
    });
    return proxyObj;
}
