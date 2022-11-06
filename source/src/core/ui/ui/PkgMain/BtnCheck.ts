/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class BtnCheck extends fgui.GButton {

	public t0:fgui.Transition;
	public t1:fgui.Transition;
	public static URL:string = "ui://vith2b66j87q1w";

	public static createInstance():BtnCheck {
		return <BtnCheck>(fgui.UIPackage.createObject("PkgMain", "BtnCheck"));
	}

	protected override onConstruct():void {
		this.t0 = this.getTransitionAt(0);
		this.t1 = this.getTransitionAt(1);
	}
}