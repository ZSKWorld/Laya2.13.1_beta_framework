/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import ProgressBar1 from "./ProgressBar1";

export default class UILoading2 extends fgui.GComponent {

	public ProLoad:ProgressBar1;
	public TxtTip:fgui.GTextField;
	public static URL:string = "ui://vx9zwserj8596j";

	public static createInstance():UILoading2 {
		return <UILoading2>(fgui.UIPackage.createObject("PkgCommon", "UILoading2"));
	}

	protected override onConstruct():void {
		this.ProLoad = <ProgressBar1>(this.getChildAt(1));
		this.TxtTip = <fgui.GTextField>(this.getChildAt(2));
	}
}