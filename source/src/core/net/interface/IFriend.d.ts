declare interface IFriend {
    friendMsg(data: FriendMsgInput): void;
}

declare interface FriendMsgInput extends UserInput {
    friendUid: string;
    chatMsg: string;
}

declare interface FriendMsgOutput extends UserOutput {
}