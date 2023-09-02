declare interface UserInput {
    cmd?: string;
    token?: string;
}

declare interface UserOutput {
    type?: string;
    cmd?: string;
    error?: number;
    syncInfo?: Partial<IUserData>;
}