declare const cfgMgr: ICfgManager;
declare type Class<T> = new (...args: any) => T;
declare type KeyData<T = number> = { [ id: string ]: T; }