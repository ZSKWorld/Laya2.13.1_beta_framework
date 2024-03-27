/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UITest3D extends fgui.GComponent {

	public btn_back: fgui.GButton;
	public static URL: string = "ui://1gl1luitf5ii7";

	public static createInstance(): UITest3D {
		return <UITest3D>(fgui.UIPackage.createObject("PkgLittleGame", "UITest3D"));
	}

	protected override onConstruct(): void {
		this.btn_back = <fgui.GButton>(this.getChildAt(0));
	}
}