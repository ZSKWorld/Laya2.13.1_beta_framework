import RenderChatMsg from "../../../../ui/PkgMain/RenderChatMsg";
import { ResPath } from "../../../../../common/ResPath";

export const enum RenderChatMsgMsg {

}

export class RenderChatMsgView extends ExtensionClass<IView, RenderChatMsg>(RenderChatMsg) {
    static readonly PkgRes = ResPath.PkgPath.PkgMain;

	override onCreate() {
        
    }

}
