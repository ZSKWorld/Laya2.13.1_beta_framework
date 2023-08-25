declare interface IOffline extends IOfflineData {

}

declare interface IUser extends IUserData {

    getSyncInfo(): Partial<IUser>;
    clearSyncInfo(): void;

    /**
     * 登录
     * @param source 元数据
     */
    login(source: IUser): void;

    /** 登出 */
    logout(): void;

    /** 保存数据 */
    save(): void;
}