/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import BtnCornerTxt from "../PkgCommon/BtnCornerTxt";

export default class UIItemInfo extends fgui.GComponent {

	public ctrlUse:fgui.Controller;
	public ctrlSell:fgui.Controller;
	public BtnBg:fgui.GGraph;
	public TxtContent:fgui.GRichTextField;
	public TxtUseNum:fgui.GTextInput;
	public BtnShouCang:fgui.GButton;
	public BtnSell:BtnCornerTxt;
	public BtnUse:BtnCornerTxt;
	public BtnBuy:BtnCornerTxt;
	public static URL:string = "ui://vith2b66irlv1e";

	public static createInstance():UIItemInfo {
		return <UIItemInfo>(fgui.UIPackage.createObject("PkgMain", "UIItemInfo"));
	}

	protected override onConstruct():void {
		this.ctrlUse = this.getControllerAt(0);
		this.ctrlSell = this.getControllerAt(1);
		this.BtnBg = <fgui.GGraph>(this.getChildAt(0));
		this.TxtContent = <fgui.GRichTextField>(this.getChildAt(5));
		this.TxtUseNum = <fgui.GTextInput>(this.getChildAt(7));
		this.BtnShouCang = <fgui.GButton>(this.getChildAt(8));
		this.BtnSell = <BtnCornerTxt>(this.getChildAt(9));
		this.BtnUse = <BtnCornerTxt>(this.getChildAt(10));
		this.BtnBuy = <BtnCornerTxt>(this.getChildAt(11));
	}
}