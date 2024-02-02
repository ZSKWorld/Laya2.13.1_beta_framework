/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class RenderGoods extends fgui.GButton {

	public bg: fgui.GGraph;
	public img_collect: fgui.GImage;
	public txt_name: fgui.GTextField;
	public txt_count: fgui.GTextField;
	public static URL: string = "ui://vith2b66sbd0z";

	public static createInstance(): RenderGoods {
		return <RenderGoods>(fgui.UIPackage.createObject("PkgMain", "RenderGoods"));
	}

	protected override onConstruct(): void {
		this.bg = <fgui.GGraph>(this.getChildAt(0));
		this.img_collect = <fgui.GImage>(this.getChildAt(2));
		this.txt_name = <fgui.GTextField>(this.getChildAt(3));
		this.txt_count = <fgui.GTextField>(this.getChildAt(4));
	}
}