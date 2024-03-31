import { connectionMgr } from "../../../ConnectionMgr";
import { ErrorCode } from "../../../enum/ErrorCode";
import { CMDController, Command } from "../CMDController";

export class CMDFriend extends CMDController implements IFriendCtrl {
    @Command
    addFriend(data: IAddFriendInput): void {
        const { user } = this;
        if (user.friend.friend.includes(data.friendUid))
            return this.response(data.cmd, null, ErrorCode.ALREADY_FRIEND);
        user.friend.friend.push(data.friendUid);
        this.response(data.cmd);
    }


    @Command
    friendMsg(data: IFriendMsgInput): void {
        if (!this.user.friend.friend.includes(data.friendUid))
            return this.response(data.cmd, null, ErrorCode.NOT_FRIEND);
        const friendCon = connectionMgr.getConnection(data.friendUid);
        if (friendCon) {
            // friendCon.notify({ cmd: data.cmd, data: data.chatMsg });
        }
        this.response(data.cmd);
    }
}