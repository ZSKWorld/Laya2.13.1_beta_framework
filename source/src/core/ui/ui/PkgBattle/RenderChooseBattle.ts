/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class RenderChooseBattle extends fgui.GButton {

	public ctrlState:fgui.Controller;
	public TxtContent1:fgui.GRichTextField;
	public TxtContent2:fgui.GRichTextField;
	public TxtContent3:fgui.GTextField;
	public BtnBreak:fgui.GButton;
	public static URL:string = "ui://va1qbl3hsbd0u";

	public static createInstance():RenderChooseBattle {
		return <RenderChooseBattle>(fgui.UIPackage.createObject("PkgBattle", "RenderChooseBattle"));
	}

	protected override onConstruct():void {
		this.ctrlState = this.getControllerAt(0);
		this.TxtContent1 = <fgui.GRichTextField>(this.getChildAt(2));
		this.TxtContent2 = <fgui.GRichTextField>(this.getChildAt(3));
		this.TxtContent3 = <fgui.GTextField>(this.getChildAt(4));
		this.BtnBreak = <fgui.GButton>(this.getChildAt(5));
	}
}