/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class ComWaiting extends fgui.GComponent {

	public t1: fgui.Transition;
	public static URL: string = "ui://vx9zwser7vow61";

	public static createInstance(): ComWaiting {
		return <ComWaiting>(fgui.UIPackage.createObject("PkgCommon", "ComWaiting"));
	}

	protected override onConstruct(): void {
		this.t1 = this.getTransitionAt(0);
	}
}