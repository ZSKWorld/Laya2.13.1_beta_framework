/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { BtnMainKindView } from "../../view/PkgMain/view/btns/BtnMainKindView";
import { BtnTxtView } from "../../view/PkgCommon/view/btns/BtnTxtView";

export default class ComGoods extends fgui.GComponent {

	public ctrlSelectType: fgui.Controller;
	public btn_shouCang: BtnTxtView;
	public btn_equip: BtnMainKindView;
	public btn_prop: BtnTxtView;
	public btn_gem: BtnTxtView;
	public btn_material: BtnTxtView;
	public btn_book: BtnTxtView;
	public btn_other: BtnTxtView;
	public list_item: fgui.GList;
	public static url: string = "ui://vith2b66sbd02";

	public static createInstance(): ComGoods {
		return <ComGoods>(fgui.UIPackage.createObject("PkgMain", "ComGoods"));
	}

	protected override onConstruct(): void {
		this.ctrlSelectType = this.getControllerAt(0);
		this.btn_shouCang = <BtnTxtView>(this.getChildAt(0));
		this.btn_equip = <BtnMainKindView>(this.getChildAt(1));
		this.btn_prop = <BtnTxtView>(this.getChildAt(2));
		this.btn_gem = <BtnTxtView>(this.getChildAt(3));
		this.btn_material = <BtnTxtView>(this.getChildAt(4));
		this.btn_book = <BtnTxtView>(this.getChildAt(5));
		this.btn_other = <BtnTxtView>(this.getChildAt(6));
		this.list_item = <fgui.GList>(this.getChildAt(8));
	}
}