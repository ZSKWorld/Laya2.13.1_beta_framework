import UISnake from "../../../ui/PkgLittleGame/UISnake";

export const enum UISnakeMsg {
	OnBtnBackClick = "UISnake_OnBtnBackClick",
}

export class UISnakeView extends ExtensionClass<IView, UISnake>(UISnake) {
    static readonly PkgRes = ResPath.PkgPath.PkgLittleGame;

	override onCreate() {
        const { btn_back } = this;
		btn_back.onClick(this, this.sendMessage, [UISnakeMsg.OnBtnBackClick]);
    }

}
