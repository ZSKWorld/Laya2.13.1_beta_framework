/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import ComZhiZuo from "./ComZhiZuo";

export default class ComDongFu extends fgui.GComponent {

	public c1:fgui.Controller;
	public BtnCreate:fgui.GButton;
	public BtnAbout:fgui.GButton;
	public BtnSetting:fgui.GButton;
	public BtnMeet:fgui.GButton;
	public BtnPet:fgui.GButton;
	public BtnRepair:fgui.GButton;
	public ComZhiZuo:ComZhiZuo;
	public t0:fgui.Transition;
	public static URL:string = "ui://vith2b66sbd05";

	public static createInstance():ComDongFu {
		return <ComDongFu>(fgui.UIPackage.createObject("PkgMain", "ComDongFu"));
	}

	protected onConstruct():void {
		this.c1 = this.getControllerAt(0);
		this.BtnCreate = <fgui.GButton>(this.getChildAt(0));
		this.BtnAbout = <fgui.GButton>(this.getChildAt(1));
		this.BtnSetting = <fgui.GButton>(this.getChildAt(2));
		this.BtnMeet = <fgui.GButton>(this.getChildAt(3));
		this.BtnPet = <fgui.GButton>(this.getChildAt(4));
		this.BtnRepair = <fgui.GButton>(this.getChildAt(5));
		this.ComZhiZuo = <ComZhiZuo>(this.getChildAt(7));
		this.t0 = this.getTransitionAt(0);
	}
}