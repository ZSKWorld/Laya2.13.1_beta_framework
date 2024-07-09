/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class ComRedDot extends fgui.GComponent {

	public txt_count: fgui.GTextField;
	public static URL: string = "ui://vx9zwseryz4q6o";

	public static createInstance(): ComRedDot {
		return <ComRedDot>(fgui.UIPackage.createObject("PkgCommon", "ComRedDot"));
	}

	protected override onConstruct(): void {
		this.txt_count = <fgui.GTextField>(this.getChildAt(1));
	}
}