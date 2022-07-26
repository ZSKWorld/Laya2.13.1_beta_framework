/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class ComSkill extends fgui.GComponent {

	public ctrlState:fgui.Controller;
	public BtnNormal0:fgui.GButton;
	public BtnNormal1:fgui.GButton;
	public BtnNormal2:fgui.GButton;
	public BtnNormal3:fgui.GButton;
	public BtnNormal4:fgui.GButton;
	public BtnXian0:fgui.GButton;
	public BtnXian1:fgui.GButton;
	public BtnXian2:fgui.GButton;
	public BtnXian3:fgui.GButton;
	public BtnXian4:fgui.GButton;
	public ListSkill:fgui.GList;
	public static URL:string = "ui://vith2b66rwel1r";

	public static createInstance():ComSkill {
		return <ComSkill>(fgui.UIPackage.createObject("PkgMain", "ComSkill"));
	}

	protected onConstruct():void {
		this.ctrlState = this.getControllerAt(0);
		this.BtnNormal0 = <fgui.GButton>(this.getChildAt(2));
		this.BtnNormal1 = <fgui.GButton>(this.getChildAt(3));
		this.BtnNormal2 = <fgui.GButton>(this.getChildAt(4));
		this.BtnNormal3 = <fgui.GButton>(this.getChildAt(5));
		this.BtnNormal4 = <fgui.GButton>(this.getChildAt(6));
		this.BtnXian0 = <fgui.GButton>(this.getChildAt(7));
		this.BtnXian1 = <fgui.GButton>(this.getChildAt(8));
		this.BtnXian2 = <fgui.GButton>(this.getChildAt(9));
		this.BtnXian3 = <fgui.GButton>(this.getChildAt(10));
		this.BtnXian4 = <fgui.GButton>(this.getChildAt(11));
		this.ListSkill = <fgui.GList>(this.getChildAt(13));
	}
}