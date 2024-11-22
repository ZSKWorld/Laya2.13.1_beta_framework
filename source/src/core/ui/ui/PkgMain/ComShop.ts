/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { BtnTxtView } from "../../view/PkgCommon/view/btns/BtnTxtView";

export default class ComShop extends fgui.GComponent {

	public ctrlSelectType: fgui.Controller;
	public btn_prop: BtnTxtView;
	public btn_gem: BtnTxtView;
	public btn_material: BtnTxtView;
	public btn_miJi: BtnTxtView;
	public btn_other: BtnTxtView;
	public btn_heiShi: BtnTxtView;
	public btn_xianJie: BtnTxtView;
	public list_item: fgui.GList;
	public static url: string = "ui://vith2b66sbd03";

	public static createInstance(): ComShop {
		return <ComShop>(fgui.UIPackage.createObject("PkgMain", "ComShop"));
	}

	protected override onConstruct(): void {
		this.ctrlSelectType = this.getControllerAt(0);
		this.btn_prop = <BtnTxtView>(this.getChildAt(0));
		this.btn_gem = <BtnTxtView>(this.getChildAt(1));
		this.btn_material = <BtnTxtView>(this.getChildAt(2));
		this.btn_miJi = <BtnTxtView>(this.getChildAt(3));
		this.btn_other = <BtnTxtView>(this.getChildAt(4));
		this.btn_heiShi = <BtnTxtView>(this.getChildAt(5));
		this.btn_xianJie = <BtnTxtView>(this.getChildAt(6));
		this.list_item = <fgui.GList>(this.getChildAt(8));
	}
}