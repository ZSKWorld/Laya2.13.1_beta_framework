import UIChooseBattle from "../../../ui/PkgBattle/UIChooseBattle";

export const enum UIChooseBattleMsg {
	OnBtnBackClick = "UIChooseBattle_OnBtnBackClick",
}

export class UIChooseBattleView extends ExtensionClass<IView, UIChooseBattle>(UIChooseBattle) {
	static readonly PkgRes = ResPath.PkgPath.PkgBattle;

	override onCreate() {
		const { btn_back } = this;
		btn_back.onClick(this, this.sendMessage, [UIChooseBattleMsg.OnBtnBackClick]);
	}

	setBattleType(type: number) {
		this.ctrl_openType.selectedIndex = type;
	}

}
