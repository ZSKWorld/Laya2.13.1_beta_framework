/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ComBattleConfirmView } from "../../view/PkgBattle/view/coms/ComBattleConfirmView";

export default class UIBattleConfirm extends fgui.GComponent {

	public graph_bg: fgui.GGraph;
	public com_panel: ComBattleConfirmView;
	public static url: string = "ui://va1qbl3hawbvv";

	public static createInstance(): UIBattleConfirm {
		return <UIBattleConfirm>(fgui.UIPackage.createObject("PkgBattle", "UIBattleConfirm"));
	}

	protected override onConstruct(): void {
		this.graph_bg = <fgui.GGraph>(this.getChildAt(0));
		this.com_panel = <ComBattleConfirmView>(this.getChildAt(1));
	}
}