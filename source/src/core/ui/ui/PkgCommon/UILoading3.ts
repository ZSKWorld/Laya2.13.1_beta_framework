/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UILoading3 extends fgui.GComponent {

	public txt_tip: fgui.GTextField;
	public t0: fgui.Transition;
	public static url: string = "ui://vx9zwseros016t";

	public static createInstance(): UILoading3 {
		return <UILoading3>(fgui.UIPackage.createObject("PkgCommon", "UILoading3"));
	}

	protected override onConstruct(): void {
		this.txt_tip = <fgui.GTextField>(this.getChildAt(4));
		this.t0 = this.getTransitionAt(0);
	}
}