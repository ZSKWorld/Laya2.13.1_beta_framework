import RenderFriend from "../../../ui/PkgMain/RenderFriend";
import { ExtensionClass } from "../../../../libs/utils/Util";
import { GComponentExtend } from "../../../core/Interfaces";

export class RenderFriendView extends ExtensionClass<GComponentExtend, RenderFriend>(RenderFriend) {

    refresh(uid:string){
        this.TxtNickname.text = uid;
    }
}