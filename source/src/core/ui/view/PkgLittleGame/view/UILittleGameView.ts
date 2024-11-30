import UILittleGame from "../../../ui/PkgLittleGame/UILittleGame";

export const enum UILittleGameMsg {
	OnBtnBackClick = "UILittleGame_OnBtnBackClick",
	OnBtn2048Click = "UILittleGame_OnBtn2048Click",
}

export class UILittleGameView extends ExtensionClass<IView, UILittleGame>(UILittleGame) {
	static readonly pkgRes = ResPath.PkgPath.PkgLittleGame;

	override onCreate() {
		const { btn_back, btn_2048 } = this;
		btn_back.onClick(this, this.sendMessage, [UILittleGameMsg.OnBtnBackClick]);
		btn_2048.onClick(this, this.sendMessage, [UILittleGameMsg.OnBtn2048Click]);
	}

}
