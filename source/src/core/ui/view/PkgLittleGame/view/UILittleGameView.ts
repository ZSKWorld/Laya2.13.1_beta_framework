import UILittleGame from "../../../ui/PkgLittleGame/UILittleGame";
import { ResPath } from "../../../../common/ResPath";

export const enum UILittleGameMsg {
	OnBtnBackClick = "UILittleGame_OnBtnBackClick",
	OnBtnTenWaterClick = "UILittleGame_OnBtnTenWaterClick",
}

export class UILittleGameView extends ExtensionClass<IView, UILittleGame>(UILittleGame) {
    static readonly PkgRes = ResPath.PkgPath.PkgLittleGame;

	override onCreate() {
        const { btn_back, btn_tenWater } = this;
		btn_back.onClick(this, this.sendMessage, [UILittleGameMsg.OnBtnBackClick]);
		btn_tenWater.onClick(this, this.sendMessage, [UILittleGameMsg.OnBtnTenWaterClick]);
    }

}
