/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UIBattle extends fgui.GComponent {

	public ctrlState:fgui.Controller;
	public ProWave:fgui.GProgressBar;
	public ProExp:fgui.GProgressBar;
	public ProSelfHp:fgui.GProgressBar;
	public ProEnemyHp:fgui.GProgressBar;
	public TxtSelfName:fgui.GTextField;
	public TxtEnemyName:fgui.GTextField;
	public TxtInfo:fgui.GRichTextField;
	public ListItem:fgui.GList;
	public BtnOffline:fgui.GButton;
	public BtnEnemyInfo:fgui.GButton;
	public BtnQuitBattle:fgui.GButton;
	public CmbBeiSu:fgui.GComboBox;
	public BtnCloseInfo:fgui.GGraph;
	public TxtEnemy:fgui.GTextField;
	public static URL:string = "ui://va1qbl3hsbd00";

	public static createInstance():UIBattle {
		return <UIBattle>(fgui.UIPackage.createObject("PkgBattle", "UIBattle"));
	}

	protected override onConstruct():void {
		this.ctrlState = this.getControllerAt(0);
		this.ProWave = <fgui.GProgressBar>(this.getChildAt(3));
		this.ProExp = <fgui.GProgressBar>(this.getChildAt(4));
		this.ProSelfHp = <fgui.GProgressBar>(this.getChildAt(5));
		this.ProEnemyHp = <fgui.GProgressBar>(this.getChildAt(6));
		this.TxtSelfName = <fgui.GTextField>(this.getChildAt(7));
		this.TxtEnemyName = <fgui.GTextField>(this.getChildAt(8));
		this.TxtInfo = <fgui.GRichTextField>(this.getChildAt(9));
		this.ListItem = <fgui.GList>(this.getChildAt(10));
		this.BtnOffline = <fgui.GButton>(this.getChildAt(11));
		this.BtnEnemyInfo = <fgui.GButton>(this.getChildAt(12));
		this.BtnQuitBattle = <fgui.GButton>(this.getChildAt(13));
		this.CmbBeiSu = <fgui.GComboBox>(this.getChildAt(14));
		this.BtnCloseInfo = <fgui.GGraph>(this.getChildAt(15));
		this.TxtEnemy = <fgui.GTextField>(this.getChildAt(16));
	}
}