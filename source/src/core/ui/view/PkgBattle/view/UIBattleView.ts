import UIBattle from "../../../ui/PkgBattle/UIBattle";
import { ResPath } from "../../../../common/ResPath";

export const enum UIBattleMsg {
	OnBtnOfflineClick = "UIBattle_OnBtnOfflineClick",
	OnBtnEnemyInfoClick = "UIBattle_OnBtnEnemyInfoClick",
	OnBtnQuitBattleClick = "UIBattle_OnBtnQuitBattleClick",
	OnBtnCloseInfoClick = "UIBattle_OnBtnCloseInfoClick",
}

export class UIBattleView extends ExtensionClass<IView, UIBattle>(UIBattle) {
    static readonly PkgRes = ResPath.PkgPath.PkgBattle;

	override onCreate() {
        const { BtnOffline, BtnEnemyInfo, BtnQuitBattle, BtnCloseInfo } = this;
		BtnOffline.onClick(this, this.sendMessage, [ UIBattleMsg.OnBtnOfflineClick ]);
		BtnEnemyInfo.onClick(this, this.sendMessage, [ UIBattleMsg.OnBtnEnemyInfoClick ]);
		BtnQuitBattle.onClick(this, this.sendMessage, [ UIBattleMsg.OnBtnQuitBattleClick ]);
		BtnCloseInfo.onClick(this, this.sendMessage, [ UIBattleMsg.OnBtnCloseInfoClick ]);
    }

}
