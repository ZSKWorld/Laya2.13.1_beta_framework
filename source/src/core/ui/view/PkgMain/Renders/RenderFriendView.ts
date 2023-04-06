import { ExtensionClass } from "../../../../libs/utils/Util";
import { ViewExtension } from "../../../core/Interfaces";
import RenderFriend from "../../../ui/PkgMain/RenderFriend";
import { ResPath } from "../../../../common/ResPath";

export const enum RenderFriendMsg {
	OnBtnChatClick = "RenderFriend_OnBtnChatClick",
}

export class RenderFriendView extends ExtensionClass<ViewExtension, RenderFriend>(RenderFriend) {
    static readonly PkgRes = ResPath.PkgPath.PkgMain;

	override onCreate(): void {
        const { BtnChat } = this;
	    BtnChat.onClick(this, this.sendMessage, [ RenderFriendMsg.OnBtnChatClick ]);
    }
    
    refresh(uid: string) {
        this.TxtNickname.text = uid;
    }
}