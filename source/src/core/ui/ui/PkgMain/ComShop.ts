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
	public btn_zbqh:BtnCornerTxt;
	public btn_bsjg:BtnCornerTxt;
	public btn_js:BtnCornerTxt;
	public btn_tsdj:BtnCornerTxt;
	public btn_gemLv1:BtnCornerTxt;
	public btn_gemLv2:BtnCornerTxt;
	public btn_gemLv3:BtnCornerTxt;
	public btn_gemLv4:BtnCornerTxt;
	public btn_sgcl:BtnCornerTxt;
	public btn_tscl:BtnCornerTxt;
	public btn_zw:BtnCornerTxt;
	public btn_qhcl:BtnCornerTxt;
	public btn_tj:BtnCornerTxt;
	public btn_xf:BtnCornerTxt;
	public btn_jn:BtnCornerTxt;
	public btn_qt:BtnCornerTxt;
	public btn_yr:BtnCornerTxt;
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
		this.btn_zbqh = <BtnCornerTxt>(this.getChildAt(8));
		this.btn_bsjg = <BtnCornerTxt>(this.getChildAt(9));
		this.btn_js = <BtnCornerTxt>(this.getChildAt(10));
		this.btn_tsdj = <BtnCornerTxt>(this.getChildAt(11));
		this.btn_gemLv1 = <BtnCornerTxt>(this.getChildAt(13));
		this.btn_gemLv2 = <BtnCornerTxt>(this.getChildAt(14));
		this.btn_gemLv3 = <BtnCornerTxt>(this.getChildAt(15));
		this.btn_gemLv4 = <BtnCornerTxt>(this.getChildAt(16));
		this.btn_sgcl = <BtnCornerTxt>(this.getChildAt(18));
		this.btn_tscl = <BtnCornerTxt>(this.getChildAt(19));
		this.btn_zw = <BtnCornerTxt>(this.getChildAt(20));
		this.btn_qhcl = <BtnCornerTxt>(this.getChildAt(21));
		this.btn_tj = <BtnCornerTxt>(this.getChildAt(23));
		this.btn_xf = <BtnCornerTxt>(this.getChildAt(24));
		this.btn_jn = <BtnCornerTxt>(this.getChildAt(25));
		this.btn_qt = <BtnCornerTxt>(this.getChildAt(27));
		this.btn_yr = <BtnCornerTxt>(this.getChildAt(28));
		this.list_item = <fgui.GList>(this.getChildAt(30));
		this.trans_show = this.getTransitionAt(0);
	}
}