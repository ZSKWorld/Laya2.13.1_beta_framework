declare type Class<T> = new (...args: any) => T;
declare interface KeyMap<T> { [ key: string ]: T; }