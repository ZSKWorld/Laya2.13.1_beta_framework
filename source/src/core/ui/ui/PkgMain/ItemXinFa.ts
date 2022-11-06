/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class ItemXinFa extends fgui.GLabel {

	public c1:fgui.Controller;
	public static URL:string = "ui://vith2b66btv51j";

	public static createInstance():ItemXinFa {
		return <ItemXinFa>(fgui.UIPackage.createObject("PkgMain", "ItemXinFa"));
	}

	protected override onConstruct():void {
		this.c1 = this.getControllerAt(0);
	}
}