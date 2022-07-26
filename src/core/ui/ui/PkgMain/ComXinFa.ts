/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import ItemXinFa from "./ItemXinFa";

export default class ComXinFa extends fgui.GComponent {

	public ctrlUpgrade:fgui.Controller;
	public BtnXinFa0:ItemXinFa;
	public BtnXinFa1:ItemXinFa;
	public BtnXinFa2:ItemXinFa;
	public BtnXinFa3:ItemXinFa;
	public BtnXinFa4:ItemXinFa;
	public BtnXinFa5:ItemXinFa;
	public BtnXinFa6:ItemXinFa;
	public BtnXinFa7:ItemXinFa;
	public BtnXinFa8:ItemXinFa;
	public BtnUpgradeBg:fgui.GGraph;
	public TxtXinFaName:fgui.GTextField;
	public TxtXinFaDesc:fgui.GTextField;
	public TxtUpgradeInfo:fgui.GTextField;
	public BtnSkill0:fgui.GButton;
	public BtnSkill1:fgui.GButton;
	public BtnSkill2:fgui.GButton;
	public BtnSkill3:fgui.GButton;
	public BtnUpgrade0:fgui.GButton;
	public BtnUpgrade1:fgui.GButton;
	public BtnUpgrade2:fgui.GButton;
	public static URL:string = "ui://vith2b66btv51i";

	public static createInstance():ComXinFa {
		return <ComXinFa>(fgui.UIPackage.createObject("PkgMain", "ComXinFa"));
	}

	protected onConstruct():void {
		this.ctrlUpgrade = this.getControllerAt(0);
		this.BtnXinFa0 = <ItemXinFa>(this.getChildAt(0));
		this.BtnXinFa1 = <ItemXinFa>(this.getChildAt(1));
		this.BtnXinFa2 = <ItemXinFa>(this.getChildAt(2));
		this.BtnXinFa3 = <ItemXinFa>(this.getChildAt(3));
		this.BtnXinFa4 = <ItemXinFa>(this.getChildAt(4));
		this.BtnXinFa5 = <ItemXinFa>(this.getChildAt(5));
		this.BtnXinFa6 = <ItemXinFa>(this.getChildAt(6));
		this.BtnXinFa7 = <ItemXinFa>(this.getChildAt(7));
		this.BtnXinFa8 = <ItemXinFa>(this.getChildAt(8));
		this.BtnUpgradeBg = <fgui.GGraph>(this.getChildAt(9));
		this.TxtXinFaName = <fgui.GTextField>(this.getChildAt(11));
		this.TxtXinFaDesc = <fgui.GTextField>(this.getChildAt(12));
		this.TxtUpgradeInfo = <fgui.GTextField>(this.getChildAt(13));
		this.BtnSkill0 = <fgui.GButton>(this.getChildAt(14));
		this.BtnSkill1 = <fgui.GButton>(this.getChildAt(15));
		this.BtnSkill2 = <fgui.GButton>(this.getChildAt(16));
		this.BtnSkill3 = <fgui.GButton>(this.getChildAt(17));
		this.BtnUpgrade0 = <fgui.GButton>(this.getChildAt(18));
		this.BtnUpgrade1 = <fgui.GButton>(this.getChildAt(19));
		this.BtnUpgrade2 = <fgui.GButton>(this.getChildAt(20));
	}
}