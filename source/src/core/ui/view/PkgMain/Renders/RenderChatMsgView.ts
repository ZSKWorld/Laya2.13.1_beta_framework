import { ExtensionClass } from "../../../../libs/utils/Util";
import { userData } from "../../../../userData/UserData";
import { GComponentExtend } from "../../../core/Interfaces";
import RenderChatMsg from "../../../ui/PkgMain/RenderChatMsg";

export interface ChatMsg{
	uid:string,
	text:string;
}

export class RenderChatMsgView extends ExtensionClass<GComponentExtend, RenderChatMsg>(RenderChatMsg) {
    refresh(data: ChatMsg) {
        this.TxtMsg.width = 2000;
        this.TxtMsg.autoSize = fgui.AutoSizeType.Both;
        this.TxtMsg.text = data.text;
        if (this.TxtMsg.width > 610){
            this.TxtMsg.autoSize = fgui.AutoSizeType.Height;
            this.TxtMsg.width = 610;
        }

        if(data.uid == userData.uid) this.TxtMsg.x = 39;
        else this.TxtMsg.x = this.width - this.TxtMsg.width - 39;
    }
}