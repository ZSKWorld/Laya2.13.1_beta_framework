/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import BtnTxt from "../PkgCommon/BtnTxt";

export default class ComShop extends fgui.GComponent {

	public ctrlSelectType:fgui.Controller;
	public btn_prop:BtnTxt;
	public btn_gem:BtnTxt;
	public btn_material:BtnTxt;
	public btn_miJi:BtnTxt;
	public btn_other:BtnTxt;
	public btn_heiShi:BtnTxt;
	public btn_xianJie:BtnTxt;
	public list_item:fgui.GList;
	public static URL:string = "ui://vith2b66sbd03";

	public static createInstance():ComShop {
		return <ComShop>(fgui.UIPackage.createObject("PkgMain", "ComShop"));
	}

	protected override onConstruct():void {
		this.ctrlSelectType = this.getControllerAt(0);
		this.btn_prop = <BtnTxt>(this.getChildAt(0));
		this.btn_gem = <BtnTxt>(this.getChildAt(1));
		this.btn_material = <BtnTxt>(this.getChildAt(2));
		this.btn_miJi = <BtnTxt>(this.getChildAt(3));
		this.btn_other = <BtnTxt>(this.getChildAt(4));
		this.btn_heiShi = <BtnTxt>(this.getChildAt(5));
		this.btn_xianJie = <BtnTxt>(this.getChildAt(6));
		this.list_item = <fgui.GList>(this.getChildAt(8));
	}
}