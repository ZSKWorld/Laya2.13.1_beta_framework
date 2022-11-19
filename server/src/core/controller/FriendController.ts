import { connectionMgr } from "../ConnectionMgr";
import { AddCMD, BaseController } from "./BaseController";

export class FriendController extends BaseController implements IFriend {
    @AddCMD
    friendMsg(data: FriendMsgInput): void {
        const friendCon = connectionMgr.getConnection(data.friendUid);
        if (friendCon) {
            friendCon.notify({ cmd: "friendMsg", data: data.chatMsg });
        }
        this.response(data.cmd);
    }
}