import RenderChatMsg from "../../../../ui/PkgMain/RenderChatMsg";

export const enum RenderChatMsgMsg {

}

export class RenderChatMsgView extends ExtensionClass<IView, RenderChatMsg>(RenderChatMsg) {
    static readonly pkgRes = ResPath.PkgPath.PkgMain;

}
