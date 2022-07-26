/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UIChooseBattle extends fgui.GComponent {

	public ctrlOpenType:fgui.Controller;
	public ctrlConfirm:fgui.Controller;
	public BtnBack:fgui.GButton;
	public ListBattle:fgui.GList;
	public BtnConfirmBg:fgui.GGraph;
	public TxtTitle:fgui.GRichTextField;
	public TxtContent:fgui.GRichTextField;
	public BtnBuyFood:fgui.GButton;
	public BtnBuyTimes:fgui.GButton;
	public BtnSaoDang:fgui.GButton;
	public BtnBattle:fgui.GButton;
	public EffectShow:fgui.Transition;
	public static URL:string = "ui://va1qbl3hsbd0s";

	public static createInstance():UIChooseBattle {
		return <UIChooseBattle>(fgui.UIPackage.createObject("PkgBattle", "UIChooseBattle"));
	}

	protected onConstruct():void {
		this.ctrlOpenType = this.getControllerAt(0);
		this.ctrlConfirm = this.getControllerAt(1);
		this.BtnBack = <fgui.GButton>(this.getChildAt(2));
		this.ListBattle = <fgui.GList>(this.getChildAt(4));
		this.BtnConfirmBg = <fgui.GGraph>(this.getChildAt(5));
		this.TxtTitle = <fgui.GRichTextField>(this.getChildAt(9));
		this.TxtContent = <fgui.GRichTextField>(this.getChildAt(10));
		this.BtnBuyFood = <fgui.GButton>(this.getChildAt(11));
		this.BtnBuyTimes = <fgui.GButton>(this.getChildAt(12));
		this.BtnSaoDang = <fgui.GButton>(this.getChildAt(13));
		this.BtnBattle = <fgui.GButton>(this.getChildAt(14));
		this.EffectShow = this.getTransitionAt(0);
	}
}