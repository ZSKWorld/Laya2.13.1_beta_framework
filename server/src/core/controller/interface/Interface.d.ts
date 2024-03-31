declare interface IUserInput {
    cmd?: string;
    token?: string;
}

declare interface IUserOutput {
    type?: string;
    cmd?: string;
    error?: number;
    syncInfo?: Partial<IUserData>;
}

declare interface IUserNotify extends IUserOutput {

}