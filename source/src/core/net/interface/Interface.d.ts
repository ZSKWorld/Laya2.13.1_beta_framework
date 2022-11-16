declare interface UserInput {
    cmd?: string;
}

declare interface UserOutput {
    cmd?: string;
    error?: number;
    syncInfo?: Partial<IUserData>;
}