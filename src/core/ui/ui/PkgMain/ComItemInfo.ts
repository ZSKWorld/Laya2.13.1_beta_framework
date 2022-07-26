/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class ComItemInfo extends fgui.GComponent {

	public ctrlUse:fgui.Controller;
	public ctrlSell:fgui.Controller;
	public BtnBg:fgui.GGraph;
	public TxtContent:fgui.GRichTextField;
	public TxtUseNum:fgui.GTextInput;
	public BtnShouCang:fgui.GButton;
	public BtnSell:fgui.GButton;
	public BtnUse:fgui.GButton;
	public BtnBuy:fgui.GButton;
	public static URL:string = "ui://vith2b66irlv1e";

	public static createInstance():ComItemInfo {
		return <ComItemInfo>(fgui.UIPackage.createObject("PkgMain", "ComItemInfo"));
	}

	protected onConstruct():void {
		this.ctrlUse = this.getControllerAt(0);
		this.ctrlSell = this.getControllerAt(1);
		this.BtnBg = <fgui.GGraph>(this.getChildAt(0));
		this.TxtContent = <fgui.GRichTextField>(this.getChildAt(5));
		this.TxtUseNum = <fgui.GTextInput>(this.getChildAt(7));
		this.BtnShouCang = <fgui.GButton>(this.getChildAt(8));
		this.BtnSell = <fgui.GButton>(this.getChildAt(9));
		this.BtnUse = <fgui.GButton>(this.getChildAt(10));
		this.BtnBuy = <fgui.GButton>(this.getChildAt(11));
	}
}