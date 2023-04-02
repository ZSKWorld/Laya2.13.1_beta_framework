export const enum PlatformType {
    Web = "web",
    WX = "wx",
}

export interface IPlatform {
    get platform(): PlatformType;
    init(): void;
    fix(): void;
    login(): void;
}