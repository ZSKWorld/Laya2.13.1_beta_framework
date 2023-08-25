declare interface ICfgReadOnly<T = any> {
    readonly [ key: string ]: T;

}
declare interface ICfgExtension<T> {
    forEach(callbackfn: (value: T, index: number, array: T[]) => void): void;
    filter(predicate: (value: T, index: number, array: T[]) => unknown): T[];
    find(predicate: (value: T, index: number, obj: T[]) => unknown): T | undefined;
}