/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { BtnTxtView } from "../../view/PkgCommon/view/btns/BtnTxtView";

export default class ComSkill extends fgui.GComponent {

	public ctrlState:fgui.Controller;
	public btn_normal0:BtnTxtView;
	public btn_normal1:BtnTxtView;
	public btn_normal2:BtnTxtView;
	public btn_normal3:BtnTxtView;
	public btn_normal4:BtnTxtView;
	public btn_xian0:BtnTxtView;
	public btn_xian1:BtnTxtView;
	public btn_xian2:BtnTxtView;
	public btn_xian3:BtnTxtView;
	public btn_xian4:BtnTxtView;
	public list_skill:fgui.GList;
	public static URL:string = "ui://vith2b66rwel1r";

	public static createInstance():ComSkill {
		return <ComSkill>(fgui.UIPackage.createObject("PkgMain", "ComSkill"));
	}

	protected override onConstruct():void {
		this.ctrlState = this.getControllerAt(0);
		this.btn_normal0 = <BtnTxtView>(this.getChildAt(1));
		this.btn_normal1 = <BtnTxtView>(this.getChildAt(2));
		this.btn_normal2 = <BtnTxtView>(this.getChildAt(3));
		this.btn_normal3 = <BtnTxtView>(this.getChildAt(4));
		this.btn_normal4 = <BtnTxtView>(this.getChildAt(5));
		this.btn_xian0 = <BtnTxtView>(this.getChildAt(7));
		this.btn_xian1 = <BtnTxtView>(this.getChildAt(8));
		this.btn_xian2 = <BtnTxtView>(this.getChildAt(9));
		this.btn_xian3 = <BtnTxtView>(this.getChildAt(10));
		this.btn_xian4 = <BtnTxtView>(this.getChildAt(11));
		this.list_skill = <fgui.GList>(this.getChildAt(13));
	}
}