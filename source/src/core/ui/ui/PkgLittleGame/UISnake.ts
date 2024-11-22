/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UISnake extends fgui.GComponent {

	public btn_back: fgui.GButton;
	public static url: string = "ui://1gl1luitmzzoa";

	public static createInstance(): UISnake {
		return <UISnake>(fgui.UIPackage.createObject("PkgLittleGame", "UISnake"));
	}

	protected override onConstruct(): void {
		this.btn_back = <fgui.GButton>(this.getChildAt(0));
	}
}