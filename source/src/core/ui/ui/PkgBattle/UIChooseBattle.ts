/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import BtnCornerTxt from "../PkgCommon/BtnCornerTxt";

export default class UIChooseBattle extends fgui.GComponent {

	public ctrlOpenType:fgui.Controller;
	public ctrlConfirm:fgui.Controller;
	public BtnBack:BtnCornerTxt;
	public ListBattle:fgui.GList;
	public graph_bg:fgui.GGraph;
	public txt_title:fgui.GRichTextField;
	public txt_content:fgui.GRichTextField;
	public btn_buyFood:BtnCornerTxt;
	public btn_buyTimes:BtnCornerTxt;
	public btn_saoDang:BtnCornerTxt;
	public btn_battle:BtnCornerTxt;
	public EffectShow:fgui.Transition;
	public static URL:string = "ui://va1qbl3hsbd0s";

	public static createInstance():UIChooseBattle {
		return <UIChooseBattle>(fgui.UIPackage.createObject("PkgBattle", "UIChooseBattle"));
	}

	protected override onConstruct():void {
		this.ctrlOpenType = this.getControllerAt(0);
		this.ctrlConfirm = this.getControllerAt(1);
		this.BtnBack = <BtnCornerTxt>(this.getChildAt(2));
		this.ListBattle = <fgui.GList>(this.getChildAt(4));
		this.graph_bg = <fgui.GGraph>(this.getChildAt(5));
		this.txt_title = <fgui.GRichTextField>(this.getChildAt(9));
		this.txt_content = <fgui.GRichTextField>(this.getChildAt(10));
		this.btn_buyFood = <BtnCornerTxt>(this.getChildAt(11));
		this.btn_buyTimes = <BtnCornerTxt>(this.getChildAt(12));
		this.btn_saoDang = <BtnCornerTxt>(this.getChildAt(13));
		this.btn_battle = <BtnCornerTxt>(this.getChildAt(14));
		this.EffectShow = this.getTransitionAt(0);
	}
}