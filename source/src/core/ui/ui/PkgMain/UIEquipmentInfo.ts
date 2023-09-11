/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import BtnTxt from "../PkgCommon/BtnTxt";

export default class UIEquipmentInfo extends fgui.GComponent {

	public ctrlType:fgui.Controller;
	public graph_bg:fgui.GGraph;
	public txt_equipInfo1:fgui.GRichTextField;
	public txt_equipInfo2:fgui.GRichTextField;
	public btn_sell:BtnTxt;
	public btn_dress:BtnTxt;
	public btn_intensify:BtnTxt;
	public btn_inlay:BtnTxt;
	public btn_engrave:BtnTxt;
	public btn_bless:BtnTxt;
	public static URL:string = "ui://vith2b66sbd01b";

	public static createInstance():UIEquipmentInfo {
		return <UIEquipmentInfo>(fgui.UIPackage.createObject("PkgMain", "UIEquipmentInfo"));
	}

	protected override onConstruct():void {
		this.ctrlType = this.getControllerAt(0);
		this.graph_bg = <fgui.GGraph>(this.getChildAt(0));
		this.txt_equipInfo1 = <fgui.GRichTextField>(this.getChildAt(2));
		this.txt_equipInfo2 = <fgui.GRichTextField>(this.getChildAt(3));
		this.btn_sell = <BtnTxt>(this.getChildAt(5));
		this.btn_dress = <BtnTxt>(this.getChildAt(6));
		this.btn_intensify = <BtnTxt>(this.getChildAt(7));
		this.btn_inlay = <BtnTxt>(this.getChildAt(8));
		this.btn_engrave = <BtnTxt>(this.getChildAt(9));
		this.btn_bless = <BtnTxt>(this.getChildAt(10));
	}
}