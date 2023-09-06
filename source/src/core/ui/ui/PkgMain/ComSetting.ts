/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import BtnCornerTxt from "../PkgCommon/BtnCornerTxt";

export default class ComSetting extends fgui.GComponent {

	public btn_mute:BtnCornerTxt;
	public btn_signIn:BtnCornerTxt;
	public btn_help:BtnCornerTxt;
	public btn_clearAccount:BtnCornerTxt;
	public btn_back:BtnCornerTxt;
	public trans_show:fgui.Transition;
	public static URL:string = "ui://vith2b66g59f2g";

	public static createInstance():ComSetting {
		return <ComSetting>(fgui.UIPackage.createObject("PkgMain", "ComSetting"));
	}

	protected override onConstruct():void {
		this.btn_mute = <BtnCornerTxt>(this.getChildAt(0));
		this.btn_signIn = <BtnCornerTxt>(this.getChildAt(1));
		this.btn_help = <BtnCornerTxt>(this.getChildAt(2));
		this.btn_clearAccount = <BtnCornerTxt>(this.getChildAt(3));
		this.btn_back = <BtnCornerTxt>(this.getChildAt(4));
		this.trans_show = this.getTransitionAt(0);
	}
}