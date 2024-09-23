import UILittleGame from "../../../ui/PkgLittleGame/UILittleGame";

export const enum UILittleGameMsg {
	OnBtnBackClick = "UILittleGame_OnBtnBackClick",
	OnBtn2048Click = "UILittleGame_OnBtn2048Click",
	OnBtnSnakeClick = "UILittleGame_OnBtnSnakeClick",
}

export class UILittleGameView extends ExtensionClass<IView, UILittleGame>(UILittleGame) {
    static readonly PkgRes = ResPath.PkgPath.PkgLittleGame;

	override onCreate() {
        const { btn_back, btn_2048,btn_snake } = this;
		btn_back.onClick(this, this.sendMessage, [UILittleGameMsg.OnBtnBackClick]);
		btn_2048.onClick(this, this.sendMessage, [UILittleGameMsg.OnBtn2048Click]);
		btn_snake.onClick(this, this.sendMessage, [UILittleGameMsg.OnBtnSnakeClick]);
    }

}
