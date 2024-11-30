/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { BtnTxtView } from "../../view/PkgCommon/view/btns/BtnTxtView";

export default class UILittleGame extends fgui.GComponent {

	public btn_back: fgui.GButton;
	public btn_2048: BtnTxtView;
	public static url: string = "ui://1gl1luityfsi0";

	public static createInstance(): UILittleGame {
		return <UILittleGame>(fgui.UIPackage.createObject("PkgLittleGame", "UILittleGame"));
	}

	protected override onConstruct(): void {
		this.btn_back = <fgui.GButton>(this.getChildAt(0));
		this.btn_2048 = <BtnTxtView>(this.getChildAt(1));
	}
}