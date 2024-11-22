/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class BtnTxt extends fgui.GButton {

	public ctrlBgColor: fgui.Controller;
	public static url: string = "ui://vx9zwsersbd05i";

	public static createInstance(): BtnTxt {
		return <BtnTxt>(fgui.UIPackage.createObject("PkgCommon", "BtnTxt"));
	}

	protected override onConstruct(): void {
		this.ctrlBgColor = this.getControllerAt(1);
	}
}