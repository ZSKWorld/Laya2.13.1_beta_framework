/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class ComTipInfo extends fgui.GComponent {

	public title:fgui.GRichTextField;
	public t0:fgui.Transition;
	public static URL:string = "ui://vx9zwsersbd05c";

	public static createInstance():ComTipInfo {
		return <ComTipInfo>(fgui.UIPackage.createObject("PkgCommon", "ComTipInfo"));
	}

	protected override onConstruct():void {
		this.title = <fgui.GRichTextField>(this.getChildAt(1));
		this.t0 = this.getTransitionAt(0);
	}
}