/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UILoading4 extends fgui.GComponent {

	public txt_tip: fgui.GTextField;
	public static url: string = "ui://vx9zwseros016u";

	public static createInstance(): UILoading4 {
		return <UILoading4>(fgui.UIPackage.createObject("PkgCommon", "UILoading4"));
	}

	protected override onConstruct(): void {
		this.txt_tip = <fgui.GTextField>(this.getChildAt(1));
	}
}