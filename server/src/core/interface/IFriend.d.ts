declare interface IFriend {
    addFriend(data: AddFriendInput): void;
    friendMsg(data: FriendMsgInput): void;
}

declare interface AddFriendInput extends UserInput {
    friendUid:string;
}

declare interface AddFriendOutput extends UserOutput {
    
}


declare interface FriendMsgInput extends UserInput {
    friendUid: string;
    chatMsg: string;
}

declare interface FriendMsgOutput extends UserOutput {
}