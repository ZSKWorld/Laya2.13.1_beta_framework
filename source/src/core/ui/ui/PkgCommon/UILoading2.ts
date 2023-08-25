/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import Pro1 from "./Pro1";

export default class UILoading2 extends fgui.GComponent {

	public pro_loading:Pro1;
	public txt_tip:fgui.GTextField;
	public static URL:string = "ui://vx9zwserj8596j";

	public static createInstance():UILoading2 {
		return <UILoading2>(fgui.UIPackage.createObject("PkgCommon", "UILoading2"));
	}

	protected override onConstruct():void {
		this.pro_loading = <Pro1>(this.getChildAt(1));
		this.txt_tip = <fgui.GTextField>(this.getChildAt(2));
	}
}