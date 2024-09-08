/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { BtnTxtView } from "../../view/PkgCommon/view/btns/BtnTxtView";

export default class UIEquipmentInfo extends fgui.GComponent {

	public ctrlType: fgui.Controller;
	public graph_bg: fgui.GGraph;
	public btn_sell: BtnTxtView;
	public btn_dress: BtnTxtView;
	public btn_intensify: BtnTxtView;
	public btn_inlay: BtnTxtView;
	public btn_engrave: BtnTxtView;
	public btn_bless: BtnTxtView;
	public btn_takeoff: BtnTxtView;
	public txt_equipInfo1: fgui.GRichTextField;
	public txt_equipInfo2: fgui.GRichTextField;
	public static URL: string = "ui://vith2b66sbd01b";

	public static createInstance(): UIEquipmentInfo {
		return <UIEquipmentInfo>(fgui.UIPackage.createObject("PkgMain", "UIEquipmentInfo"));
	}

	protected override onConstruct(): void {
		this.ctrlType = this.getControllerAt(0);
		this.graph_bg = <fgui.GGraph>(this.getChildAt(0));
		this.btn_sell = <BtnTxtView>(this.getChildAt(3));
		this.btn_dress = <BtnTxtView>(this.getChildAt(4));
		this.btn_intensify = <BtnTxtView>(this.getChildAt(5));
		this.btn_inlay = <BtnTxtView>(this.getChildAt(6));
		this.btn_engrave = <BtnTxtView>(this.getChildAt(7));
		this.btn_bless = <BtnTxtView>(this.getChildAt(8));
		this.btn_takeoff = <BtnTxtView>(this.getChildAt(9));
		this.txt_equipInfo1 = <fgui.GRichTextField>(this.getChildAt(10));
		this.txt_equipInfo2 = <fgui.GRichTextField>(this.getChildAt(11));
	}
}