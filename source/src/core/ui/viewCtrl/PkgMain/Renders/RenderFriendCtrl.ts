import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { RenderFriendMsg, RenderFriendView } from "../../../view/PkgMain/Renders/RenderFriendView";

export interface RenderFriendData {

}

export class RenderFriendCtrl extends BaseViewCtrl<RenderFriendView, RenderFriendData>{

    override onAwake(): void {
		this.addMessage(RenderFriendMsg.OnBtnChatClick, this.onBtnChatClick);
    }

    override onEnable(): void {
        
    }

    override onDisable(): void {
        
    }

    override onDestroy(): void {
        
    }

	private onBtnChatClick(): void {
	
	}

}