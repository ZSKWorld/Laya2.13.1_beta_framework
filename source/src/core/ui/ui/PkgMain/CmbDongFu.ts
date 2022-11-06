/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class CmbDongFu extends fgui.GComboBox {

	public ctrlBgColor:fgui.Controller;
	public static URL:string = "ui://vith2b66sbd0n";

	public static createInstance():CmbDongFu {
		return <CmbDongFu>(fgui.UIPackage.createObject("PkgMain", "CmbDongFu"));
	}

	protected override onConstruct():void {
		this.ctrlBgColor = this.getControllerAt(1);
	}
}