/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UIBattleConfirm from "./UIBattleConfirm";
import { UIBattleConfirmView } from "../../view/PkgBattle/view/UIBattleConfirmView";
import ComBattleConfirm from "./ComBattleConfirm";
import { ComBattleConfirmView } from "../../view/PkgBattle/view/coms/ComBattleConfirmView";
import UIBattle from "./UIBattle";
import { UIBattleView } from "../../view/PkgBattle/view/UIBattleView";
import UIChooseBattle from "./UIChooseBattle";
import { UIChooseBattleView } from "../../view/PkgBattle/view/UIChooseBattleView";
import RenderChooseBattle from "./RenderChooseBattle";
import { RenderChooseBattleView } from "../../view/PkgBattle/view/renders/RenderChooseBattleView";

export default class PkgBattleBinder {
	public static bindAll(): void {
		fgui.UIObjectFactory.setExtension(UIBattleConfirm.url, UIBattleConfirmView);
		fgui.UIObjectFactory.setExtension(ComBattleConfirm.url, ComBattleConfirmView);
		fgui.UIObjectFactory.setExtension(UIBattle.url, UIBattleView);
		fgui.UIObjectFactory.setExtension(UIChooseBattle.url, UIChooseBattleView);
		fgui.UIObjectFactory.setExtension(RenderChooseBattle.url, RenderChooseBattleView);
	}
}