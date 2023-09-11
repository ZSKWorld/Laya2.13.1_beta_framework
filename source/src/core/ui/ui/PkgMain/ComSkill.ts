/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import BtnTxt from "../PkgCommon/BtnTxt";

export default class ComSkill extends fgui.GComponent {

	public ctrlState:fgui.Controller;
	public btn_normal0:BtnTxt;
	public btn_normal1:BtnTxt;
	public btn_normal2:BtnTxt;
	public btn_normal3:BtnTxt;
	public btn_normal4:BtnTxt;
	public btn_xian0:BtnTxt;
	public btn_xian1:BtnTxt;
	public btn_xian2:BtnTxt;
	public btn_xian3:BtnTxt;
	public btn_xian4:BtnTxt;
	public list_skill:fgui.GList;
	public static URL:string = "ui://vith2b66rwel1r";

	public static createInstance():ComSkill {
		return <ComSkill>(fgui.UIPackage.createObject("PkgMain", "ComSkill"));
	}

	protected override onConstruct():void {
		this.ctrlState = this.getControllerAt(0);
		this.btn_normal0 = <BtnTxt>(this.getChildAt(1));
		this.btn_normal1 = <BtnTxt>(this.getChildAt(2));
		this.btn_normal2 = <BtnTxt>(this.getChildAt(3));
		this.btn_normal3 = <BtnTxt>(this.getChildAt(4));
		this.btn_normal4 = <BtnTxt>(this.getChildAt(5));
		this.btn_xian0 = <BtnTxt>(this.getChildAt(7));
		this.btn_xian1 = <BtnTxt>(this.getChildAt(8));
		this.btn_xian2 = <BtnTxt>(this.getChildAt(9));
		this.btn_xian3 = <BtnTxt>(this.getChildAt(10));
		this.btn_xian4 = <BtnTxt>(this.getChildAt(11));
		this.list_skill = <fgui.GList>(this.getChildAt(13));
	}
}