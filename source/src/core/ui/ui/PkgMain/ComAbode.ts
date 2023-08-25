/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import ComZhiZuo from "./ComZhiZuo";
import BtnCornerTxt from "../PkgCommon/BtnCornerTxt";

export default class ComAbode extends fgui.GComponent {

	public c1:fgui.Controller;
	public btn_create:BtnCornerTxt;
	public btn_about:BtnCornerTxt;
	public btn_setting:BtnCornerTxt;
	public btn_meet:BtnCornerTxt;
	public btn_pet:BtnCornerTxt;
	public btn_repair:BtnCornerTxt;
	public com_zhiZuo:ComZhiZuo;
	public t0:fgui.Transition;
	public static URL:string = "ui://vith2b66sbd05";

	public static createInstance():ComAbode {
		return <ComAbode>(fgui.UIPackage.createObject("PkgMain", "ComAbode"));
	}

	protected override onConstruct():void {
		this.c1 = this.getControllerAt(0);
		this.btn_create = <BtnCornerTxt>(this.getChildAt(0));
		this.btn_about = <BtnCornerTxt>(this.getChildAt(1));
		this.btn_setting = <BtnCornerTxt>(this.getChildAt(2));
		this.btn_meet = <BtnCornerTxt>(this.getChildAt(3));
		this.btn_pet = <BtnCornerTxt>(this.getChildAt(4));
		this.btn_repair = <BtnCornerTxt>(this.getChildAt(5));
		this.com_zhiZuo = <ComZhiZuo>(this.getChildAt(7));
		this.t0 = this.getTransitionAt(0);
	}
}