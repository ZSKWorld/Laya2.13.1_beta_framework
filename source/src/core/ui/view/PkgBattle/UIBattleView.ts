import { ResPath } from "../../../common/ResPath";
import { ExtensionClass } from "../../../libs/utils/Util";
import { ViewExtension } from "../../core/Interfaces";
import UIBattle from "../../ui/PkgBattle/UIBattle";

export const enum UIBattleMsg {
	OnBtnOfflineClick = "UIBattle_OnBtnOfflineClick",
	OnBtnEnemyInfoClick = "UIBattle_OnBtnEnemyInfoClick",
	OnBtnQuitBattleClick = "UIBattle_OnBtnQuitBattleClick",
	OnBtnCloseInfoClick = "UIBattle_OnBtnCloseInfoClick",
}

export class UIBattleView extends ExtensionClass<ViewExtension, UIBattle>(UIBattle) {
	static readonly PkgRes = ResPath.UIPath.PkgBattle;

	override onCreate(): void {
		const { BtnOffline, BtnEnemyInfo, BtnQuitBattle, BtnCloseInfo } = this;
		BtnOffline.onClick(this, this.sendMessage, [ UIBattleMsg.OnBtnOfflineClick ]);
		BtnEnemyInfo.onClick(this, this.sendMessage, [ UIBattleMsg.OnBtnEnemyInfoClick ]);
		BtnQuitBattle.onClick(this, this.sendMessage, [ UIBattleMsg.OnBtnQuitBattleClick ]);
		BtnCloseInfo.onClick(this, this.sendMessage, [ UIBattleMsg.OnBtnCloseInfoClick ]);
	}

	setInfoVisible(visible: boolean) {
		this.ctrlState.selectedIndex = +visible;
	}

}
