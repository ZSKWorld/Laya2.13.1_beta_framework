/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ComRedDotView } from "../../view/PkgCommon/view/coms/ComRedDotView";

export default class BtnMainKind extends fgui.GButton {

	public ctrlBgColor: fgui.Controller;
	public com_redDot: ComRedDotView;
	public static url: string = "ui://vith2b66olc42h";

	public static createInstance(): BtnMainKind {
		return <BtnMainKind>(fgui.UIPackage.createObject("PkgMain", "BtnMainKind"));
	}

	protected override onConstruct(): void {
		this.ctrlBgColor = this.getControllerAt(1);
		this.com_redDot = <ComRedDotView>(this.getChildAt(2));
	}
}