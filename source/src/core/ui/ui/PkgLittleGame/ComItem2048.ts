/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class ComItem2048 extends fgui.GComponent {

	public txt_num: fgui.GTextField;
	public static url: string = "ui://1gl1luitnirt9";

	public static createInstance(): ComItem2048 {
		return <ComItem2048>(fgui.UIPackage.createObject("PkgLittleGame", "ComItem2048"));
	}

	protected override onConstruct(): void {
		this.txt_num = <fgui.GTextField>(this.getChildAt(1));
	}
}