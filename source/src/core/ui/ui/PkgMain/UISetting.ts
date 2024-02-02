/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ComSettingView } from "../../view/PkgMain/view/coms/ComSettingView";

export default class UISetting extends fgui.GComponent {

	public graph_bg: fgui.GGraph;
	public com_panel: ComSettingView;
	public static URL: string = "ui://vith2b66sbd0x";

	public static createInstance(): UISetting {
		return <UISetting>(fgui.UIPackage.createObject("PkgMain", "UISetting"));
	}

	protected override onConstruct(): void {
		this.graph_bg = <fgui.GGraph>(this.getChildAt(0));
		this.com_panel = <ComSettingView>(this.getChildAt(2));
	}
}