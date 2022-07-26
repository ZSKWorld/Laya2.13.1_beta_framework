/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UISetting extends fgui.GComponent {

	public BtnBg:fgui.GGraph;
	public BtnHangUp:fgui.GButton;
	public BtnMute:fgui.GButton;
	public BtnSignIn:fgui.GButton;
	public BtnHelp:fgui.GButton;
	public BtnClearAccount:fgui.GButton;
	public BtnBack:fgui.GButton;
	public static URL:string = "ui://vith2b66sbd0x";

	public static createInstance():UISetting {
		return <UISetting>(fgui.UIPackage.createObject("PkgMain", "UISetting"));
	}

	protected onConstruct():void {
		this.BtnBg = <fgui.GGraph>(this.getChildAt(0));
		this.BtnHangUp = <fgui.GButton>(this.getChildAt(3));
		this.BtnMute = <fgui.GButton>(this.getChildAt(4));
		this.BtnSignIn = <fgui.GButton>(this.getChildAt(5));
		this.BtnHelp = <fgui.GButton>(this.getChildAt(6));
		this.BtnClearAccount = <fgui.GButton>(this.getChildAt(7));
		this.BtnBack = <fgui.GButton>(this.getChildAt(10));
	}
}