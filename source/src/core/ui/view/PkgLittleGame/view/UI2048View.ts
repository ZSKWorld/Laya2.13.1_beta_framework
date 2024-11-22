import UI2048 from "../../../ui/PkgLittleGame/UI2048";

export const enum UI2048Msg {
	OnBtnBackClick = "UI2048_OnBtnBackClick",
	OnBtnResetClick = "UI2048_OnBtnResetClick",
}

export class UI2048View extends ExtensionClass<IView, UI2048>(UI2048) {
	static readonly pkgRes = ResPath.PkgPath.PkgLittleGame;

	override onCreate() {
		const { btn_back, btn_reset } = this;
		btn_back.onClick(this, this.sendMessage, [UI2048Msg.OnBtnBackClick]);
		btn_reset.onClick(this, this.sendMessage, [UI2048Msg.OnBtnResetClick]);
	}

}
