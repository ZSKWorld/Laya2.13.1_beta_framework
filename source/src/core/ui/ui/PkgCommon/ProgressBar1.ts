/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class ProgressBar1 extends fgui.GProgressBar {

	public ctrlColor:fgui.Controller;
	public ctrlFontSize:fgui.Controller;
	public ctrlText:fgui.Controller;
	public static URL:string = "ui://vx9zwsersbd05t";

	public static createInstance():ProgressBar1 {
		return <ProgressBar1>(fgui.UIPackage.createObject("PkgCommon", "ProgressBar1"));
	}

	protected override onConstruct():void {
		this.ctrlColor = this.getControllerAt(0);
		this.ctrlFontSize = this.getControllerAt(1);
		this.ctrlText = this.getControllerAt(2);
	}
}