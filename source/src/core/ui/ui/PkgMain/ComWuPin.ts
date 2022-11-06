/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class ComWuPin extends fgui.GComponent {

	public ctrlSelectType:fgui.Controller;
	public BtnShouCang:fgui.GButton;
	public BtnEquip:fgui.GButton;
	public BtnProp:fgui.GButton;
	public BtnGem:fgui.GButton;
	public BtnMaterial:fgui.GButton;
	public BtnBook:fgui.GButton;
	public BtnOther:fgui.GButton;
	public BtnQualityUp:fgui.GButton;
	public BtnQualityDown:fgui.GButton;
	public BtnTypeUp:fgui.GButton;
	public BtnTypeDown:fgui.GButton;
	public BtnScoreUp:fgui.GButton;
	public BtnScoreDown:fgui.GButton;
	public ListItem:fgui.GList;
	public EffectShow:fgui.Transition;
	public EffectList:fgui.Transition;
	public static URL:string = "ui://vith2b66sbd02";

	public static createInstance():ComWuPin {
		return <ComWuPin>(fgui.UIPackage.createObject("PkgMain", "ComWuPin"));
	}

	protected override onConstruct():void {
		this.ctrlSelectType = this.getControllerAt(0);
		this.BtnShouCang = <fgui.GButton>(this.getChildAt(0));
		this.BtnEquip = <fgui.GButton>(this.getChildAt(1));
		this.BtnProp = <fgui.GButton>(this.getChildAt(2));
		this.BtnGem = <fgui.GButton>(this.getChildAt(3));
		this.BtnMaterial = <fgui.GButton>(this.getChildAt(4));
		this.BtnBook = <fgui.GButton>(this.getChildAt(5));
		this.BtnOther = <fgui.GButton>(this.getChildAt(6));
		this.BtnQualityUp = <fgui.GButton>(this.getChildAt(8));
		this.BtnQualityDown = <fgui.GButton>(this.getChildAt(9));
		this.BtnTypeUp = <fgui.GButton>(this.getChildAt(10));
		this.BtnTypeDown = <fgui.GButton>(this.getChildAt(11));
		this.BtnScoreUp = <fgui.GButton>(this.getChildAt(12));
		this.BtnScoreDown = <fgui.GButton>(this.getChildAt(13));
		this.ListItem = <fgui.GList>(this.getChildAt(15));
		this.EffectShow = this.getTransitionAt(0);
		this.EffectList = this.getTransitionAt(1);
	}
}