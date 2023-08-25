/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import BtnCornerTxt from "../PkgCommon/BtnCornerTxt";

export default class ComSkill extends fgui.GComponent {

	public ctrlState:fgui.Controller;
	public btn_normal0:BtnCornerTxt;
	public btn_normal1:BtnCornerTxt;
	public btn_normal2:BtnCornerTxt;
	public btn_normal3:BtnCornerTxt;
	public btn_normal4:BtnCornerTxt;
	public btn_xian0:BtnCornerTxt;
	public btn_xian1:BtnCornerTxt;
	public btn_xian2:BtnCornerTxt;
	public btn_xian3:BtnCornerTxt;
	public btn_xian4:BtnCornerTxt;
	public list_skill:fgui.GList;
	public static URL:string = "ui://vith2b66rwel1r";

	public static createInstance():ComSkill {
		return <ComSkill>(fgui.UIPackage.createObject("PkgMain", "ComSkill"));
	}

	protected override onConstruct():void {
		this.ctrlState = this.getControllerAt(0);
		this.btn_normal0 = <BtnCornerTxt>(this.getChildAt(1));
		this.btn_normal1 = <BtnCornerTxt>(this.getChildAt(2));
		this.btn_normal2 = <BtnCornerTxt>(this.getChildAt(3));
		this.btn_normal3 = <BtnCornerTxt>(this.getChildAt(4));
		this.btn_normal4 = <BtnCornerTxt>(this.getChildAt(5));
		this.btn_xian0 = <BtnCornerTxt>(this.getChildAt(7));
		this.btn_xian1 = <BtnCornerTxt>(this.getChildAt(8));
		this.btn_xian2 = <BtnCornerTxt>(this.getChildAt(9));
		this.btn_xian3 = <BtnCornerTxt>(this.getChildAt(10));
		this.btn_xian4 = <BtnCornerTxt>(this.getChildAt(11));
		this.list_skill = <fgui.GList>(this.getChildAt(13));
	}
}