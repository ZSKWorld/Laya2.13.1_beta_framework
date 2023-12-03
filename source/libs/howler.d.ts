declare class Howler {
    static usingWebAudio: boolean;
    static noAudio: boolean;
    static autoUnlock: boolean;
    static html5PoolSize: number;
    static autoSuspend: boolean;
    static ctx: boolean;
    static masterGain: boolean;
    static mute(muted: boolean): void;
    static volume(volume?: number): number;
    static stop(): void;
    static unload(): void;

}

declare class Howl {
    constructor(info: Object);
    src: string;
    _volume: number;
    _mute: boolean;
    html5: boolean;
    _loop: boolean;
    preload: boolean;
    autoplay: boolean;
    sprite: Object;
    _rate: number;
    pool: number;
    format: [];
    xhr: Object;
    onload: Function;
    onloaderror: Function;
    onplayerror: Function;
    onplay: Function;
    onend: Function;
    onpause: Function;
    onstop: Function;
    onmute: Function;
    onvolume: Function;
    onrate: Function;
    onseek: Function;
    onfade: Function;
    onunlock: Function;
    play(sprite?: string): number;
    pause(id?: number): void;
    stop(id?: number): void;
    mute(muted?: boolean, id?: number): void;
    volume(volume?: number, id?:number): number;
    fade(from: number, to: number, duration: number, id?:number): number;
    rate(rate?: number, id?:number): number;
    seek(seek?: number, id?:number): number;
    loop(loop?: number, id?:number): number;
    state(): string;
    playing(id?:number): number;
    duration(id?:number): number;
    on(event: string, func: Function, id?:number): void;
    once(event: string, func: Function, id?:number): void;
    off(event: string, func?: Function, id?:number): void;
    load(): void;
    unload(): void;
}