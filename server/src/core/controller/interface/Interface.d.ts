declare interface IUserInput {
    cmd?: string;
}

declare interface IUserOutput {
    type?: string;
    cmd?: string;
    error?: number;
    syncInfo?: Partial<OriginData<IUser>>;
}