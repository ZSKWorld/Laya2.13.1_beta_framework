/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { BtnTxtView } from "../../view/PkgCommon/view/btns/BtnTxtView";

export default class UIPlayerInfo extends fgui.GComponent {

	public txt_info1:fgui.GRichTextField;
	public txt_info2:fgui.GRichTextField;
	public cmb_title:fgui.GComboBox;
	public btn_explain:BtnTxtView;
	public btn_back:BtnTxtView;
	public btn_copyID:BtnTxtView;
	public btn_gift:BtnTxtView;
	public static URL:string = "ui://vith2b66sbd010";

	public static createInstance():UIPlayerInfo {
		return <UIPlayerInfo>(fgui.UIPackage.createObject("PkgMain", "UIPlayerInfo"));
	}

	protected override onConstruct():void {
		this.txt_info1 = <fgui.GRichTextField>(this.getChildAt(3));
		this.txt_info2 = <fgui.GRichTextField>(this.getChildAt(4));
		this.cmb_title = <fgui.GComboBox>(this.getChildAt(5));
		this.btn_explain = <BtnTxtView>(this.getChildAt(6));
		this.btn_back = <BtnTxtView>(this.getChildAt(7));
		this.btn_copyID = <BtnTxtView>(this.getChildAt(8));
		this.btn_gift = <BtnTxtView>(this.getChildAt(9));
	}
}