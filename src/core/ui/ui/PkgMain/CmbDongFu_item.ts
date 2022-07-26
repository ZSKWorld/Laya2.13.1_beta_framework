/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class CmbDongFu_item extends fgui.GButton {

	public ctrlSelected:fgui.Controller;
	public static URL:string = "ui://vith2b66sbd0l";

	public static createInstance():CmbDongFu_item {
		return <CmbDongFu_item>(fgui.UIPackage.createObject("PkgMain", "CmbDongFu_item"));
	}

	protected onConstruct():void {
		this.ctrlSelected = this.getControllerAt(1);
	}
}