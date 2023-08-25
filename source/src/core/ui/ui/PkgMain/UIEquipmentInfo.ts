/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import BtnCornerTxt from "../PkgCommon/BtnCornerTxt";

export default class UIEquipmentInfo extends fgui.GComponent {

	public ctrlType:fgui.Controller;
	public graph_bg:fgui.GGraph;
	public txt_equipInfo1:fgui.GRichTextField;
	public txt_equipInfo2:fgui.GRichTextField;
	public btn_sell:BtnCornerTxt;
	public btn_dress:BtnCornerTxt;
	public btn_intensify:BtnCornerTxt;
	public btn_inlay:BtnCornerTxt;
	public btn_engrave:BtnCornerTxt;
	public btn_bless:BtnCornerTxt;
	public static URL:string = "ui://vith2b66sbd01b";

	public static createInstance():UIEquipmentInfo {
		return <UIEquipmentInfo>(fgui.UIPackage.createObject("PkgMain", "UIEquipmentInfo"));
	}

	protected override onConstruct():void {
		this.ctrlType = this.getControllerAt(0);
		this.graph_bg = <fgui.GGraph>(this.getChildAt(0));
		this.txt_equipInfo1 = <fgui.GRichTextField>(this.getChildAt(2));
		this.txt_equipInfo2 = <fgui.GRichTextField>(this.getChildAt(3));
		this.btn_sell = <BtnCornerTxt>(this.getChildAt(5));
		this.btn_dress = <BtnCornerTxt>(this.getChildAt(6));
		this.btn_intensify = <BtnCornerTxt>(this.getChildAt(7));
		this.btn_inlay = <BtnCornerTxt>(this.getChildAt(8));
		this.btn_engrave = <BtnCornerTxt>(this.getChildAt(9));
		this.btn_bless = <BtnCornerTxt>(this.getChildAt(10));
	}
}