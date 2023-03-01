import { connectionMgr } from "../../ConnectionMgr";
import { ErrorCode } from "../../enum/ErrorCode";
import { AddCMD, BaseController } from "../BaseController";

export class FriendController extends BaseController implements IFriendCtrl {
    @AddCMD
    addFriend(data: AddFriendInput): void {
        const { user } = this;
        if (user.friend.friend.includes(data.friendUid))
            return this.response(data.cmd, null, ErrorCode.ALREADY_FRIEND);
        user.friend.friend.push(data.friendUid);
        this.response(data.cmd);
    }


    @AddCMD
    friendMsg(data: FriendMsgInput): void {
        if (!this.user.friend.friend.includes(data.friendUid))
            return this.response(data.cmd, null, ErrorCode.NOT_FRIEND);
        const friendCon = connectionMgr.getConnection(data.friendUid);
        if (friendCon) {
            friendCon.notify({ cmd: data.cmd, data: data.chatMsg });
        }
        this.response(data.cmd);
    }
}