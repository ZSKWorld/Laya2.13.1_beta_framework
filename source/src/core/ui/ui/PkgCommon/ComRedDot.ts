/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class ComRedDot extends fgui.GComponent {

	public img_redDot: fgui.GImage;
	public trans_anim: fgui.Transition;
	public static url: string = "ui://vx9zwseryz4q6o";

	public static createInstance(): ComRedDot {
		return <ComRedDot>(fgui.UIPackage.createObject("PkgCommon", "ComRedDot"));
	}

	protected override onConstruct(): void {
		this.img_redDot = <fgui.GImage>(this.getChildAt(0));
		this.trans_anim = this.getTransitionAt(0);
	}
}