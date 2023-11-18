/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ComWaitingView } from "../../view/PkgCommon/view/coms/ComWaitingView";

export default class UIWaiting extends fgui.GComponent {

	public com_waitting:ComWaitingView;
	public txt_info:fgui.GTextField;
	public static URL:string = "ui://vx9zwser7vow63";

	public static createInstance():UIWaiting {
		return <UIWaiting>(fgui.UIPackage.createObject("PkgCommon", "UIWaiting"));
	}

	protected override onConstruct():void {
		this.com_waitting = <ComWaitingView>(this.getChildAt(1));
		this.txt_info = <fgui.GTextField>(this.getChildAt(2));
	}
}