/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UISect extends fgui.GComponent {

	public BtnSect0:fgui.GButton;
	public BtnSect1:fgui.GButton;
	public BtnSect2:fgui.GButton;
	public BtnSect3:fgui.GButton;
	public BtnSect4:fgui.GButton;
	public BtnSect5:fgui.GButton;
	public BtnSubmit:fgui.GButton;
	public TxtDesc:fgui.GTextField;
	public ProBar0:fgui.GProgressBar;
	public ProBar1:fgui.GProgressBar;
	public ProBar2:fgui.GProgressBar;
	public ProBar3:fgui.GProgressBar;
	public ProBar4:fgui.GProgressBar;
	public ProBar5:fgui.GProgressBar;
	public ProBar6:fgui.GProgressBar;
	public static URL:string = "ui://vith2b66btv51q";

	public static createInstance():UISect {
		return <UISect>(fgui.UIPackage.createObject("PkgMain", "UISect"));
	}

	protected override onConstruct():void {
		this.BtnSect0 = <fgui.GButton>(this.getChildAt(1));
		this.BtnSect1 = <fgui.GButton>(this.getChildAt(2));
		this.BtnSect2 = <fgui.GButton>(this.getChildAt(3));
		this.BtnSect3 = <fgui.GButton>(this.getChildAt(4));
		this.BtnSect4 = <fgui.GButton>(this.getChildAt(5));
		this.BtnSect5 = <fgui.GButton>(this.getChildAt(6));
		this.BtnSubmit = <fgui.GButton>(this.getChildAt(7));
		this.TxtDesc = <fgui.GTextField>(this.getChildAt(8));
		this.ProBar0 = <fgui.GProgressBar>(this.getChildAt(10));
		this.ProBar1 = <fgui.GProgressBar>(this.getChildAt(11));
		this.ProBar2 = <fgui.GProgressBar>(this.getChildAt(12));
		this.ProBar3 = <fgui.GProgressBar>(this.getChildAt(13));
		this.ProBar4 = <fgui.GProgressBar>(this.getChildAt(14));
		this.ProBar5 = <fgui.GProgressBar>(this.getChildAt(15));
		this.ProBar6 = <fgui.GProgressBar>(this.getChildAt(16));
	}
}