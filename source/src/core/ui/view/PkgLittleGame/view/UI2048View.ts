import UI2048 from "../../../ui/PkgLittleGame/UI2048";
import { ResPath } from "../../../../common/ResPath";

export const enum UI2048Msg {
	OnBtnBackClick = "UI2048_OnBtnBackClick",
}

export class UI2048View extends ExtensionClass<IView, UI2048>(UI2048) {
    static readonly PkgRes = ResPath.PkgPath.PkgLittleGame;

	override onCreate() {
        const { btn_back } = this;
		btn_back.onClick(this, this.sendMessage, [UI2048Msg.OnBtnBackClick]);
    }

}
