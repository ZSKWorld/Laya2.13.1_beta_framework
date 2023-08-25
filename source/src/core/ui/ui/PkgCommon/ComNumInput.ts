/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import BtnCornerTxt from "./BtnCornerTxt";

export default class ComNumInput extends fgui.GComponent {

	public graph_bg:fgui.GGraph;
	public slider_num:fgui.GSlider;
	public txt_title:fgui.GRichTextField;
	public btn_submit:BtnCornerTxt;
	public static URL:string = "ui://vx9zwsersbd05y";

	public static createInstance():ComNumInput {
		return <ComNumInput>(fgui.UIPackage.createObject("PkgCommon", "ComNumInput"));
	}

	protected override onConstruct():void {
		this.graph_bg = <fgui.GGraph>(this.getChildAt(0));
		this.slider_num = <fgui.GSlider>(this.getChildAt(4));
		this.txt_title = <fgui.GRichTextField>(this.getChildAt(5));
		this.btn_submit = <BtnCornerTxt>(this.getChildAt(6));
	}
}