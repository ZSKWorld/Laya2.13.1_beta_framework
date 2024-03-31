declare interface IUserNotify extends IUserOutput {

}

declare interface IHeartNotify extends IUserNotify {
    timeStamp: number;
}