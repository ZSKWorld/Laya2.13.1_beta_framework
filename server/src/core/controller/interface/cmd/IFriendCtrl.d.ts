declare interface IFriendCtrl {
    addFriend(data: IAddFriendInput): void;
    friendMsg(data: IFriendMsgInput): void;
}

declare interface IAddFriendInput extends IUserInput {
    friendUid: string;
}

declare interface IAddFriendOutput extends IUserOutput {

}


declare interface IFriendMsgInput extends IUserInput {
    friendUid: string;
    chatMsg: string;
}

declare interface IFriendMsgOutput extends IUserOutput {
}