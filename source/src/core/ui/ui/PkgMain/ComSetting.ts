/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import BtnTxt from "../PkgCommon/BtnTxt";

export default class ComSetting extends fgui.GComponent {

	public btn_mute:BtnTxt;
	public btn_signIn:BtnTxt;
	public btn_help:BtnTxt;
	public btn_clearAccount:BtnTxt;
	public btn_back:BtnTxt;
	public trans_show:fgui.Transition;
	public static URL:string = "ui://vith2b66g59f2g";

	public static createInstance():ComSetting {
		return <ComSetting>(fgui.UIPackage.createObject("PkgMain", "ComSetting"));
	}

	protected override onConstruct():void {
		this.btn_mute = <BtnTxt>(this.getChildAt(0));
		this.btn_signIn = <BtnTxt>(this.getChildAt(1));
		this.btn_help = <BtnTxt>(this.getChildAt(2));
		this.btn_clearAccount = <BtnTxt>(this.getChildAt(3));
		this.btn_back = <BtnTxt>(this.getChildAt(4));
		this.trans_show = this.getTransitionAt(0);
	}
}