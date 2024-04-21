import UILittleGame from "../../../ui/PkgLittleGame/UILittleGame";
import { ResPath } from "../../../../common/ResPath";

export const enum UILittleGameMsg {
	OnBtnBackClick = "UILittleGame_OnBtnBackClick",
	OnBtnTenWaterClick = "UILittleGame_OnBtnTenWaterClick",
	OnBtnTest3dClick = "UILittleGame_OnBtnTest3dClick",
	OnBtn2048Click = "UILittleGame_OnBtn2048Click",
}

export class UILittleGameView extends ExtensionClass<IView, UILittleGame>(UILittleGame) {
    static readonly PkgRes = ResPath.PkgPath.PkgLittleGame;

	override onCreate() {
        const { btn_back, btn_tenWater, btn_test3d, btn_2048 } = this;
		btn_back.onClick(this, this.sendMessage, [UILittleGameMsg.OnBtnBackClick]);
		btn_tenWater.onClick(this, this.sendMessage, [UILittleGameMsg.OnBtnTenWaterClick]);
		btn_test3d.onClick(this, this.sendMessage, [UILittleGameMsg.OnBtnTest3dClick]);
		btn_2048.onClick(this, this.sendMessage, [UILittleGameMsg.OnBtn2048Click]);
    }

}
