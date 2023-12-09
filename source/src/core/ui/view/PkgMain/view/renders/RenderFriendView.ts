import { ResPath } from "../../../../../common/ResPath";
import RenderFriend from "../../../../ui/PkgMain/RenderFriend";

export const enum RenderFriendMsg {
    OnBtnChatClick = "RenderFriend_OnBtnChatClick",
}

export class RenderFriendView extends ExtensionClass<IView, RenderFriend>(RenderFriend) {
    static readonly PkgRes = ResPath.PkgPath.PkgMain;

    override onCreate() {
        const { btn_chat } = this;
        btn_chat.onClick(this, this.sendMessage, [RenderFriendMsg.OnBtnChatClick]);
    }

}
