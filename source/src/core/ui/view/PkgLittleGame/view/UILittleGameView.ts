import { ResPath } from "../../../../common/ResPath";
import UILittleGame from "../../../ui/PkgLittleGame/UILittleGame";

export const enum UILittleGameMsg {
	OnBtnBackClick = "UILittleGame_OnBtnBackClick",
	OnBtnTenWaterClick = "UILittleGame_OnBtnTenWaterClick",
	OnBtnTest3DClick = "UILittleGame_OnBtnTest3DClick",
}

export class UILittleGameView extends ExtensionClass<IView, UILittleGame>(UILittleGame) {
	static readonly PkgRes = ResPath.PkgPath.PkgLittleGame;

	override onCreate() {
		const { btn_back, btn_tenWater, btn_test3d } = this;
		btn_back.onClick(this, this.sendMessage, [UILittleGameMsg.OnBtnBackClick]);
		btn_tenWater.onClick(this, this.sendMessage, [UILittleGameMsg.OnBtnTenWaterClick]);
		btn_test3d.onClick(this, this.sendMessage, [UILittleGameMsg.OnBtnTest3DClick]);
	}

}
