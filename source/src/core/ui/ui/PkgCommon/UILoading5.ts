/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UILoading5 extends fgui.GComponent {

	public txt_tip: fgui.GTextField;
	public img_mask: fgui.GImage;
	public static url: string = "ui://vx9zwseros016v";

	public static createInstance(): UILoading5 {
		return <UILoading5>(fgui.UIPackage.createObject("PkgCommon", "UILoading5"));
	}

	protected override onConstruct(): void {
		this.txt_tip = <fgui.GTextField>(this.getChildAt(1));
		this.img_mask = <fgui.GImage>(this.getChildAt(16));
	}
}