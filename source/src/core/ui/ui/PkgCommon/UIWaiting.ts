/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import ComWaiting from "./ComWaiting";

export default class UIWaiting extends fgui.GComponent {

	public com_waitting:ComWaiting;
	public txt_info:fgui.GTextField;
	public static URL:string = "ui://vx9zwser7vow63";

	public static createInstance():UIWaiting {
		return <UIWaiting>(fgui.UIPackage.createObject("PkgCommon", "UIWaiting"));
	}

	protected override onConstruct():void {
		this.com_waitting = <ComWaiting>(this.getChildAt(1));
		this.txt_info = <fgui.GTextField>(this.getChildAt(2));
	}
}