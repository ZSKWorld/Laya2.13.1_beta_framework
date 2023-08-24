import RenderChatMsg from "../../../ui/PkgMain/RenderChatMsg";
import { ResPath } from "../../../../common/ResPath";

export const enum RenderChatMsgMsg {

}

export interface ChatMsg{
	uid:string,
	text:string;
}

export class RenderChatMsgView extends ExtensionClass<IView, RenderChatMsg>(RenderChatMsg) {
    static readonly PkgRes = ResPath.PkgPath.PkgMain;

	override onCreate(): void {

    }
    refresh(data: ChatMsg) {
        this.TxtMsg.width = 2000;
        this.TxtMsg.autoSize = fgui.AutoSizeType.Both;
        this.TxtMsg.text = data.text;
        if (this.TxtMsg.width > 610){
            this.TxtMsg.autoSize = fgui.AutoSizeType.Height;
            this.TxtMsg.width = 610;
        }

        if(data.uid == this.userData.uid) this.TxtMsg.x = 39;
        else this.TxtMsg.x = this.width - this.TxtMsg.width - 39;
    }
}