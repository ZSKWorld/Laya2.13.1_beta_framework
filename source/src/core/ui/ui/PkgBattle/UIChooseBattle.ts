/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import BtnTxt from "../PkgCommon/BtnTxt";

export default class UIChooseBattle extends fgui.GComponent {

	public ctrl_openType:fgui.Controller;
	public btn_back:BtnTxt;
	public list_battle:fgui.GList;
	public static URL:string = "ui://va1qbl3hsbd0s";

	public static createInstance():UIChooseBattle {
		return <UIChooseBattle>(fgui.UIPackage.createObject("PkgBattle", "UIChooseBattle"));
	}

	protected override onConstruct():void {
		this.ctrl_openType = this.getControllerAt(0);
		this.btn_back = <BtnTxt>(this.getChildAt(2));
		this.list_battle = <fgui.GList>(this.getChildAt(4));
	}
}