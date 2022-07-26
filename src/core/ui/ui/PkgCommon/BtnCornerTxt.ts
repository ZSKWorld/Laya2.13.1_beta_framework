/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class BtnCornerTxt extends fgui.GButton {

	public ctrlBgColor:fgui.Controller;
	public static URL:string = "ui://vx9zwsersbd05i";

	public static createInstance():BtnCornerTxt {
		return <BtnCornerTxt>(fgui.UIPackage.createObject("PkgCommon", "BtnCornerTxt"));
	}

	protected onConstruct():void {
		this.ctrlBgColor = this.getControllerAt(1);
	}
}