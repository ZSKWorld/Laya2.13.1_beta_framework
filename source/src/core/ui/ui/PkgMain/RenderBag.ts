/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class RenderBag extends fgui.GButton {

	public bg:fgui.GGraph;
	public txt_name:fgui.GTextField;
	public txt_count:fgui.GTextField;
	public static URL:string = "ui://vith2b66sbd0z";

	public static createInstance():RenderBag {
		return <RenderBag>(fgui.UIPackage.createObject("PkgMain", "RenderBag"));
	}

	protected override onConstruct():void {
		this.bg = <fgui.GGraph>(this.getChildAt(0));
		this.txt_name = <fgui.GTextField>(this.getChildAt(2));
		this.txt_count = <fgui.GTextField>(this.getChildAt(3));
	}
}