/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class ComShangCheng extends fgui.GComponent {

	public ctrlSelectType:fgui.Controller;
	public BtnProp:fgui.GButton;
	public BtnGem:fgui.GButton;
	public BtnMaterial:fgui.GButton;
	public BtnMiJi:fgui.GButton;
	public BtnOther:fgui.GButton;
	public BtnHeiShi:fgui.GButton;
	public BtnXianJie:fgui.GButton;
	public BtnZBQH:fgui.GButton;
	public BtnBSJG:fgui.GButton;
	public BtnJS:fgui.GButton;
	public BtnTSDJ:fgui.GButton;
	public BtnGemLv1:fgui.GButton;
	public BtnGemLv2:fgui.GButton;
	public BtnGemLv3:fgui.GButton;
	public BtnGemLv4:fgui.GButton;
	public BtnSGCL:fgui.GButton;
	public BtnTSCL:fgui.GButton;
	public BtnZW:fgui.GButton;
	public BtnQHCL:fgui.GButton;
	public BtnTJ:fgui.GButton;
	public BtnXF:fgui.GButton;
	public BtnJN:fgui.GButton;
	public BtnQT:fgui.GButton;
	public BtnYR:fgui.GButton;
	public ListItem:fgui.GList;
	public EffectShow:fgui.Transition;
	public EffectList:fgui.Transition;
	public static URL:string = "ui://vith2b66sbd03";

	public static createInstance():ComShangCheng {
		return <ComShangCheng>(fgui.UIPackage.createObject("PkgMain", "ComShangCheng"));
	}

	protected override onConstruct():void {
		this.ctrlSelectType = this.getControllerAt(0);
		this.BtnProp = <fgui.GButton>(this.getChildAt(0));
		this.BtnGem = <fgui.GButton>(this.getChildAt(1));
		this.BtnMaterial = <fgui.GButton>(this.getChildAt(2));
		this.BtnMiJi = <fgui.GButton>(this.getChildAt(3));
		this.BtnOther = <fgui.GButton>(this.getChildAt(4));
		this.BtnHeiShi = <fgui.GButton>(this.getChildAt(5));
		this.BtnXianJie = <fgui.GButton>(this.getChildAt(6));
		this.BtnZBQH = <fgui.GButton>(this.getChildAt(8));
		this.BtnBSJG = <fgui.GButton>(this.getChildAt(9));
		this.BtnJS = <fgui.GButton>(this.getChildAt(10));
		this.BtnTSDJ = <fgui.GButton>(this.getChildAt(11));
		this.BtnGemLv1 = <fgui.GButton>(this.getChildAt(13));
		this.BtnGemLv2 = <fgui.GButton>(this.getChildAt(14));
		this.BtnGemLv3 = <fgui.GButton>(this.getChildAt(15));
		this.BtnGemLv4 = <fgui.GButton>(this.getChildAt(16));
		this.BtnSGCL = <fgui.GButton>(this.getChildAt(18));
		this.BtnTSCL = <fgui.GButton>(this.getChildAt(19));
		this.BtnZW = <fgui.GButton>(this.getChildAt(20));
		this.BtnQHCL = <fgui.GButton>(this.getChildAt(21));
		this.BtnTJ = <fgui.GButton>(this.getChildAt(23));
		this.BtnXF = <fgui.GButton>(this.getChildAt(24));
		this.BtnJN = <fgui.GButton>(this.getChildAt(25));
		this.BtnQT = <fgui.GButton>(this.getChildAt(27));
		this.BtnYR = <fgui.GButton>(this.getChildAt(28));
		this.ListItem = <fgui.GList>(this.getChildAt(30));
		this.EffectShow = this.getTransitionAt(0);
		this.EffectList = this.getTransitionAt(1);
	}
}