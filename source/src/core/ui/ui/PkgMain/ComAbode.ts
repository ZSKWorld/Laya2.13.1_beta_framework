/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import ComZhiZuo from "./ComZhiZuo";
import BtnTxt from "../PkgCommon/BtnTxt";

export default class ComAbode extends fgui.GComponent {

	public c1:fgui.Controller;
	public btn_create:BtnTxt;
	public btn_about:BtnTxt;
	public btn_setting:BtnTxt;
	public btn_meet:BtnTxt;
	public btn_pet:BtnTxt;
	public btn_repair:BtnTxt;
	public com_zhiZuo:ComZhiZuo;
	public static URL:string = "ui://vith2b66sbd05";

	public static createInstance():ComAbode {
		return <ComAbode>(fgui.UIPackage.createObject("PkgMain", "ComAbode"));
	}

	protected override onConstruct():void {
		this.c1 = this.getControllerAt(0);
		this.btn_create = <BtnTxt>(this.getChildAt(0));
		this.btn_about = <BtnTxt>(this.getChildAt(1));
		this.btn_setting = <BtnTxt>(this.getChildAt(2));
		this.btn_meet = <BtnTxt>(this.getChildAt(3));
		this.btn_pet = <BtnTxt>(this.getChildAt(4));
		this.btn_repair = <BtnTxt>(this.getChildAt(5));
		this.com_zhiZuo = <ComZhiZuo>(this.getChildAt(7));
	}
}