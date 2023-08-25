/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import BtnCornerTxt from "../PkgCommon/BtnCornerTxt";

export default class RenderChooseBattle extends fgui.GButton {

	public ctrlState:fgui.Controller;
	public txt_content1:fgui.GRichTextField;
	public txt_content2:fgui.GRichTextField;
	public txt_content3:fgui.GTextField;
	public btn_break:BtnCornerTxt;
	public static URL:string = "ui://va1qbl3hsbd0u";

	public static createInstance():RenderChooseBattle {
		return <RenderChooseBattle>(fgui.UIPackage.createObject("PkgBattle", "RenderChooseBattle"));
	}

	protected override onConstruct():void {
		this.ctrlState = this.getControllerAt(0);
		this.txt_content1 = <fgui.GRichTextField>(this.getChildAt(2));
		this.txt_content2 = <fgui.GRichTextField>(this.getChildAt(3));
		this.txt_content3 = <fgui.GTextField>(this.getChildAt(4));
		this.btn_break = <BtnCornerTxt>(this.getChildAt(5));
	}
}