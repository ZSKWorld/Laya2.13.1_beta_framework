declare interface ReadOnlyObject<T> {
    readonly [ key: string ]: T;
}

/** 向window注入变量 */

declare function windowImmit(name: string, obj: any): void;