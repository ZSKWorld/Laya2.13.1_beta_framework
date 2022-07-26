/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class CmbDongFu_popup extends fgui.GComponent {

	public list:fgui.GList;
	public t0:fgui.Transition;
	public static URL:string = "ui://vith2b66sbd0m";

	public static createInstance():CmbDongFu_popup {
		return <CmbDongFu_popup>(fgui.UIPackage.createObject("PkgMain", "CmbDongFu_popup"));
	}

	protected onConstruct():void {
		this.list = <fgui.GList>(this.getChildAt(0));
		this.t0 = this.getTransitionAt(0);
	}
}