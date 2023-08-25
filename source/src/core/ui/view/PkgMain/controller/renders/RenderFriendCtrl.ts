import { BaseViewCtrl } from "../../../../core/BaseViewCtrl";
import { RenderFriendMsg, RenderFriendView } from "../../view/renders/RenderFriendView";

export interface RenderFriendData {

}

export class RenderFriendCtrl extends BaseViewCtrl<RenderFriendView, RenderFriendData>{

    override onAdded() {
		this.addMessage(RenderFriendMsg.OnBtnChatClick, this.onBtnChatClick);
    }

	private onBtnChatClick() {
	
	}

}