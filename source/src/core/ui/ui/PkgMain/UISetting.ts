/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import BtnCornerTxt from "../PkgCommon/BtnCornerTxt";

export default class UISetting extends fgui.GComponent {

	public graph_bg:fgui.GGraph;
	public btn_mute:BtnCornerTxt;
	public btn_signIn:BtnCornerTxt;
	public btn_help:BtnCornerTxt;
	public btn_clearAccount:BtnCornerTxt;
	public btn_back:BtnCornerTxt;
	public static URL:string = "ui://vith2b66sbd0x";

	public static createInstance():UISetting {
		return <UISetting>(fgui.UIPackage.createObject("PkgMain", "UISetting"));
	}

	protected override onConstruct():void {
		this.graph_bg = <fgui.GGraph>(this.getChildAt(0));
		this.btn_mute = <BtnCornerTxt>(this.getChildAt(2));
		this.btn_signIn = <BtnCornerTxt>(this.getChildAt(3));
		this.btn_help = <BtnCornerTxt>(this.getChildAt(4));
		this.btn_clearAccount = <BtnCornerTxt>(this.getChildAt(5));
		this.btn_back = <BtnCornerTxt>(this.getChildAt(6));
	}
}