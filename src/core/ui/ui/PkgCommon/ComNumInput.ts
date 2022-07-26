/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import BtnCornerTxt from "./BtnCornerTxt";

export default class ComNumInput extends fgui.GComponent {

	public BtnBg:fgui.GGraph;
	public Slider:fgui.GSlider;
	public TxtTitle:fgui.GRichTextField;
	public BtnBattle:BtnCornerTxt;
	public static URL:string = "ui://vx9zwsersbd05y";

	public static createInstance():ComNumInput {
		return <ComNumInput>(fgui.UIPackage.createObject("PkgCommon", "ComNumInput"));
	}

	protected onConstruct():void {
		this.BtnBg = <fgui.GGraph>(this.getChildAt(0));
		this.Slider = <fgui.GSlider>(this.getChildAt(4));
		this.TxtTitle = <fgui.GRichTextField>(this.getChildAt(5));
		this.BtnBattle = <BtnCornerTxt>(this.getChildAt(6));
	}
}