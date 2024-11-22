/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { BtnTxtView } from "../../view/PkgCommon/view/btns/BtnTxtView";

export default class UI2048 extends fgui.GComponent {

	public btn_back: fgui.GButton;
	public com_container: fgui.GComponent;
	public btn_reset: BtnTxtView;
	public btn_add: BtnTxtView;
	public static url: string = "ui://1gl1luitnirt8";

	public static createInstance(): UI2048 {
		return <UI2048>(fgui.UIPackage.createObject("PkgLittleGame", "UI2048"));
	}

	protected override onConstruct(): void {
		this.btn_back = <fgui.GButton>(this.getChildAt(0));
		this.com_container = <fgui.GComponent>(this.getChildAt(1));
		this.btn_reset = <BtnTxtView>(this.getChildAt(2));
		this.btn_add = <BtnTxtView>(this.getChildAt(3));
	}
}