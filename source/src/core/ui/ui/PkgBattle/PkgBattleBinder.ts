/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UIBattle from "./UIBattle";
import UIChooseBattle from "./UIChooseBattle";
import RenderChooseBattle from "./RenderChooseBattle";

export default class PkgBattleBinder {
	public static bindAll():void {
		fgui.UIObjectFactory.setExtension(UIBattle.URL, UIBattle);
		fgui.UIObjectFactory.setExtension(UIChooseBattle.URL, UIChooseBattle);
		fgui.UIObjectFactory.setExtension(RenderChooseBattle.URL, RenderChooseBattle);
	}
}