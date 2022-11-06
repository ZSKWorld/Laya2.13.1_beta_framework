/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import CmbDongFu from "./CmbDongFu";

export default class ComZhiZuo extends fgui.GComponent {

	public BtnJPYL:fgui.GButton;
	public BtnDZZB:fgui.GButton;
	public BtnZJZB:fgui.GButton;
	public BtnCZZB:fgui.GButton;
	public BtnBSHC:fgui.GButton;
	public BtnZZTZ:fgui.GButton;
	public BtnFJZB:fgui.GButton;
	public BtnFJBS:fgui.GButton;
	public BtnYJHC:fgui.GButton;
	public CmbLevel:CmbDongFu;
	public CmbType:CmbDongFu;
	public CmbDetail:CmbDongFu;
	public CmbFJZBDJ:CmbDongFu;
	public CmbFJBSDJ:CmbDongFu;
	public EffectShow:fgui.Transition;
	public static URL:string = "ui://vith2b669f1k1h";

	public static createInstance():ComZhiZuo {
		return <ComZhiZuo>(fgui.UIPackage.createObject("PkgMain", "ComZhiZuo"));
	}

	protected override onConstruct():void {
		this.BtnJPYL = <fgui.GButton>(this.getChildAt(6));
		this.BtnDZZB = <fgui.GButton>(this.getChildAt(7));
		this.BtnZJZB = <fgui.GButton>(this.getChildAt(8));
		this.BtnCZZB = <fgui.GButton>(this.getChildAt(9));
		this.BtnBSHC = <fgui.GButton>(this.getChildAt(10));
		this.BtnZZTZ = <fgui.GButton>(this.getChildAt(11));
		this.BtnFJZB = <fgui.GButton>(this.getChildAt(12));
		this.BtnFJBS = <fgui.GButton>(this.getChildAt(13));
		this.BtnYJHC = <fgui.GButton>(this.getChildAt(14));
		this.CmbLevel = <CmbDongFu>(this.getChildAt(15));
		this.CmbType = <CmbDongFu>(this.getChildAt(16));
		this.CmbDetail = <CmbDongFu>(this.getChildAt(17));
		this.CmbFJZBDJ = <CmbDongFu>(this.getChildAt(18));
		this.CmbFJBSDJ = <CmbDongFu>(this.getChildAt(19));
		this.EffectShow = this.getTransitionAt(0);
	}
}