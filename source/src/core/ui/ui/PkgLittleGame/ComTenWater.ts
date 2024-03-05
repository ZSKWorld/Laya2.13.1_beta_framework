/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { BtnTxtView } from "../../view/PkgCommon/view/btns/BtnTxtView";

export default class ComTenWater extends fgui.GComponent {

	public loader_icon: fgui.GLoader;
	public btn_add: BtnTxtView;
	public btn_sub: BtnTxtView;
	public txt_needed: fgui.GTextField;
	public static URL: string = "ui://1gl1luit9hon2";

	public static createInstance(): ComTenWater {
		return <ComTenWater>(fgui.UIPackage.createObject("PkgLittleGame", "ComTenWater"));
	}

	protected override onConstruct(): void {
		this.loader_icon = <fgui.GLoader>(this.getChildAt(1));
		this.btn_add = <BtnTxtView>(this.getChildAt(2));
		this.btn_sub = <BtnTxtView>(this.getChildAt(3));
		this.txt_needed = <fgui.GTextField>(this.getChildAt(5));
	}
}