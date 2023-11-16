/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { BtnTxtView } from "../../view/PkgCommon/view/btns/BtnTxtView";

export default class ComSetting extends fgui.GComponent {

	public btn_mute:BtnTxtView;
	public btn_signIn:BtnTxtView;
	public btn_help:BtnTxtView;
	public btn_clearAccount:BtnTxtView;
	public btn_back:BtnTxtView;
	public trans_show:fgui.Transition;
	public static URL:string = "ui://vith2b66g59f2g";

	public static createInstance():ComSetting {
		return <ComSetting>(fgui.UIPackage.createObject("PkgMain", "ComSetting"));
	}

	protected override onConstruct():void {
		this.btn_mute = <BtnTxtView>(this.getChildAt(0));
		this.btn_signIn = <BtnTxtView>(this.getChildAt(1));
		this.btn_help = <BtnTxtView>(this.getChildAt(2));
		this.btn_clearAccount = <BtnTxtView>(this.getChildAt(3));
		this.btn_back = <BtnTxtView>(this.getChildAt(4));
		this.trans_show = this.getTransitionAt(0);
	}
}