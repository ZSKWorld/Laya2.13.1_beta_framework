/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import WaitingItem from "./WaitingItem";

export default class UIWaiting extends fgui.GComponent {

	public ComWaiting:WaitingItem;
	public TxtInfo:fgui.GTextField;
	public static URL:string = "ui://vx9zwser7vow63";

	public static createInstance():UIWaiting {
		return <UIWaiting>(fgui.UIPackage.createObject("PkgCommon", "UIWaiting"));
	}

	protected override onConstruct():void {
		this.ComWaiting = <WaitingItem>(this.getChildAt(1));
		this.TxtInfo = <fgui.GTextField>(this.getChildAt(2));
	}
}