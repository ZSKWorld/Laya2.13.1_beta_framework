/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ComConfirmView } from "../../view/PkgCommon/view/coms/ComConfirmView";

export default class UIConfirm extends fgui.GComponent {

	public graph_bg: fgui.GGraph;
	public com_panel: ComConfirmView;
	public static URL: string = "ui://vx9zwsershjv6k";

	public static createInstance(): UIConfirm {
		return <UIConfirm>(fgui.UIPackage.createObject("PkgCommon", "UIConfirm"));
	}

	protected override onConstruct(): void {
		this.graph_bg = <fgui.GGraph>(this.getChildAt(0));
		this.com_panel = <ComConfirmView>(this.getChildAt(1));
	}
}