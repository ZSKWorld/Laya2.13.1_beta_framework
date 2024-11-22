/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { BtnTxtView } from "../../view/PkgCommon/view/btns/BtnTxtView";

export default class RenderChooseBattle extends fgui.GButton {

	public ctrlState: fgui.Controller;
	public graph_touch: fgui.GGraph;
	public graph_light: fgui.GGraph;
	public txt_content1: fgui.GRichTextField;
	public txt_content2: fgui.GRichTextField;
	public txt_content3: fgui.GTextField;
	public txt_content4: fgui.GTextField;
	public txt_content5: fgui.GTextField;
	public btn_break: BtnTxtView;
	public static url: string = "ui://va1qbl3hsbd0u";

	public static createInstance(): RenderChooseBattle {
		return <RenderChooseBattle>(fgui.UIPackage.createObject("PkgBattle", "RenderChooseBattle"));
	}

	protected override onConstruct(): void {
		this.ctrlState = this.getControllerAt(0);
		this.graph_touch = <fgui.GGraph>(this.getChildAt(0));
		this.graph_light = <fgui.GGraph>(this.getChildAt(1));
		this.txt_content1 = <fgui.GRichTextField>(this.getChildAt(2));
		this.txt_content2 = <fgui.GRichTextField>(this.getChildAt(3));
		this.txt_content3 = <fgui.GTextField>(this.getChildAt(4));
		this.txt_content4 = <fgui.GTextField>(this.getChildAt(5));
		this.txt_content5 = <fgui.GTextField>(this.getChildAt(6));
		this.btn_break = <BtnTxtView>(this.getChildAt(7));
	}
}