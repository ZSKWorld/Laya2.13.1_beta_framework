/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import ComConfirm from "./ComConfirm";

export default class UIConfirm extends fgui.GComponent {

	public graph_bg:fgui.GGraph;
	public com_panel:ComConfirm;
	public trans_show:fgui.Transition;
	public trans_close:fgui.Transition;
	public static URL:string = "ui://vx9zwsershjv6k";

	public static createInstance():UIConfirm {
		return <UIConfirm>(fgui.UIPackage.createObject("PkgCommon", "UIConfirm"));
	}

	protected override onConstruct():void {
		this.graph_bg = <fgui.GGraph>(this.getChildAt(0));
		this.com_panel = <ComConfirm>(this.getChildAt(1));
		this.trans_show = this.getTransitionAt(0);
		this.trans_close = this.getTransitionAt(1);
	}
}