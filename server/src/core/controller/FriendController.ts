import { connectionMgr } from "../ConnectionMgr";
import { ErrorCode } from "../enum/ErrorCode";
import { AddCMD, BaseController } from "./BaseController";

export class FriendController extends BaseController implements IFriend {
    @AddCMD
    addFriend(data: AddFriendInput): void {
        if(this.connection.userData.friends.includes(data.friendUid))
            return this.response(data.cmd, null, ErrorCode.ALREADY_FRIEND);
            this.connection.userData.friends.push(data.friendUid);
        this.response(data.cmd);
    }


    @AddCMD
    friendMsg(data: FriendMsgInput): void {
        if (!this.connection.userData.friends.includes(data.friendUid))
            return this.response(data.cmd, null, ErrorCode.NOT_FRIEND);
        const friendCon = connectionMgr.getConnection(data.friendUid);
        if (friendCon) {
            friendCon.notify({ cmd: data.cmd, data: data.chatMsg });
        }
        this.response(data.cmd);
    }
}