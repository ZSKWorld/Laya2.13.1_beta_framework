/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import BtnCornerTxt from "../PkgCommon/BtnCornerTxt";

export default class ComShop extends fgui.GComponent {

	public ctrlSelectType:fgui.Controller;
	public btn_prop:BtnCornerTxt;
	public btn_gem:BtnCornerTxt;
	public btn_material:BtnCornerTxt;
	public btn_miJi:BtnCornerTxt;
	public btn_other:BtnCornerTxt;
	public btn_heiShi:BtnCornerTxt;
	public btn_xianJie:BtnCornerTxt;
	public list_item:fgui.GList;
	public trans_show:fgui.Transition;
	public static URL:string = "ui://vith2b66sbd03";

	public static createInstance():ComShop {
		return <ComShop>(fgui.UIPackage.createObject("PkgMain", "ComShop"));
	}

	protected override onConstruct():void {
		this.ctrlSelectType = this.getControllerAt(0);
		this.btn_prop = <BtnCornerTxt>(this.getChildAt(0));
		this.btn_gem = <BtnCornerTxt>(this.getChildAt(1));
		this.btn_material = <BtnCornerTxt>(this.getChildAt(2));
		this.btn_miJi = <BtnCornerTxt>(this.getChildAt(3));
		this.btn_other = <BtnCornerTxt>(this.getChildAt(4));
		this.btn_heiShi = <BtnCornerTxt>(this.getChildAt(5));
		this.btn_xianJie = <BtnCornerTxt>(this.getChildAt(6));
		this.list_item = <fgui.GList>(this.getChildAt(8));
		this.trans_show = this.getTransitionAt(0);
	}
}