/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import Pro1 from "./Pro1";

export default class UILoading1 extends fgui.GComponent {

	public pro_loading: Pro1;
	public txt_tip: fgui.GTextField;
	public static URL: string = "ui://vx9zwserj8596i";

	public static createInstance(): UILoading1 {
		return <UILoading1>(fgui.UIPackage.createObject("PkgCommon", "UILoading1"));
	}

	protected override onConstruct(): void {
		this.pro_loading = <Pro1>(this.getChildAt(1));
		this.txt_tip = <fgui.GTextField>(this.getChildAt(2));
	}
}