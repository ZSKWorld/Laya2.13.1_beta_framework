/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import BtnTxt from "./BtnTxt";

export default class ComConfirm extends fgui.GComponent {

	public txt_title:fgui.GTextField;
	public txt_content:fgui.GRichTextField;
	public btn_cancel:BtnTxt;
	public btn_confirm:BtnTxt;
	public static URL:string = "ui://vx9zwsershjv6l";

	public static createInstance():ComConfirm {
		return <ComConfirm>(fgui.UIPackage.createObject("PkgCommon", "ComConfirm"));
	}

	protected override onConstruct():void {
		this.txt_title = <fgui.GTextField>(this.getChildAt(2));
		this.txt_content = <fgui.GRichTextField>(this.getChildAt(3));
		this.btn_cancel = <BtnTxt>(this.getChildAt(4));
		this.btn_confirm = <BtnTxt>(this.getChildAt(5));
	}
}