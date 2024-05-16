import { connectionMgr } from "../../../ConnectionMgr";
import { ErrorCode } from "../../../enum/ErrorCode";
import { CMD, CMDController } from "../CMDController";

export class CMDFriend extends CMDController implements IFriendCtrl {
    @CMD
    addFriend(data: IAddFriendInput): void {
        const { user } = this;
        if (user.friend.friend.includes(data.friendUid))
            return this.response(data.cmd, null, ErrorCode.ALREADY_FRIEND);
        user.friend.friend.push(data.friendUid);
        this.response(data.cmd);
    }


    @CMD
    friendMsg(data: IFriendMsgInput): void {
        if (!this.user.friend.friend.includes(data.friendUid))
            return this.response(data.cmd, null, ErrorCode.NOT_FRIEND);
        this.response(data.cmd);
    }
}