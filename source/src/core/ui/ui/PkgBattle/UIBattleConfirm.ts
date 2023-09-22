/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import ComBattleConfirm from "./ComBattleConfirm";

export default class UIBattleConfirm extends fgui.GComponent {

	public graph_bg:fgui.GGraph;
	public com_panel:ComBattleConfirm;
	public static URL:string = "ui://va1qbl3hawbvv";

	public static createInstance():UIBattleConfirm {
		return <UIBattleConfirm>(fgui.UIPackage.createObject("PkgBattle", "UIBattleConfirm"));
	}

	protected override onConstruct():void {
		this.graph_bg = <fgui.GGraph>(this.getChildAt(0));
		this.com_panel = <ComBattleConfirm>(this.getChildAt(1));
	}
}