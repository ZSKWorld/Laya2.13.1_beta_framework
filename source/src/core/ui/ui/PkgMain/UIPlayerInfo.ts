/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import BtnTxt from "../PkgCommon/BtnTxt";

export default class UIPlayerInfo extends fgui.GComponent {

	public txt_info1:fgui.GRichTextField;
	public txt_info2:fgui.GRichTextField;
	public cmb_title:fgui.GComboBox;
	public btn_explain:BtnTxt;
	public btn_back:BtnTxt;
	public btn_copyID:BtnTxt;
	public btn_gift:BtnTxt;
	public static URL:string = "ui://vith2b66sbd010";

	public static createInstance():UIPlayerInfo {
		return <UIPlayerInfo>(fgui.UIPackage.createObject("PkgMain", "UIPlayerInfo"));
	}

	protected override onConstruct():void {
		this.txt_info1 = <fgui.GRichTextField>(this.getChildAt(3));
		this.txt_info2 = <fgui.GRichTextField>(this.getChildAt(4));
		this.cmb_title = <fgui.GComboBox>(this.getChildAt(5));
		this.btn_explain = <BtnTxt>(this.getChildAt(6));
		this.btn_back = <BtnTxt>(this.getChildAt(7));
		this.btn_copyID = <BtnTxt>(this.getChildAt(8));
		this.btn_gift = <BtnTxt>(this.getChildAt(9));
	}
}