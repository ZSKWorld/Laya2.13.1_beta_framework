/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import BtnCornerTxt from "../PkgCommon/BtnCornerTxt";

export default class ComBattleConfirm extends fgui.GComponent {

	public ctrl_openType:fgui.Controller;
	public txt_title:fgui.GRichTextField;
	public txt_content:fgui.GRichTextField;
	public btn_buyFood:BtnCornerTxt;
	public btn_buyTimes:BtnCornerTxt;
	public btn_saoDang:BtnCornerTxt;
	public btn_battle:BtnCornerTxt;
	public group_btns:fgui.GGroup;
	public static URL:string = "ui://va1qbl3hawbvw";

	public static createInstance():ComBattleConfirm {
		return <ComBattleConfirm>(fgui.UIPackage.createObject("PkgBattle", "ComBattleConfirm"));
	}

	protected override onConstruct():void {
		this.ctrl_openType = this.getControllerAt(0);
		this.txt_title = <fgui.GRichTextField>(this.getChildAt(3));
		this.txt_content = <fgui.GRichTextField>(this.getChildAt(4));
		this.btn_buyFood = <BtnCornerTxt>(this.getChildAt(5));
		this.btn_buyTimes = <BtnCornerTxt>(this.getChildAt(6));
		this.btn_saoDang = <BtnCornerTxt>(this.getChildAt(7));
		this.btn_battle = <BtnCornerTxt>(this.getChildAt(8));
		this.group_btns = <fgui.GGroup>(this.getChildAt(9));
	}
}