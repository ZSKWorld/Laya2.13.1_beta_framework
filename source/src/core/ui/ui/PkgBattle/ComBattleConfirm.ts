/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import BtnTxt from "../PkgCommon/BtnTxt";

export default class ComBattleConfirm extends fgui.GComponent {

	public ctrl_openType:fgui.Controller;
	public txt_title:fgui.GRichTextField;
	public txt_content:fgui.GRichTextField;
	public slider_num:fgui.GSlider;
	public btn_buyFood:BtnTxt;
	public btn_buyTimes:BtnTxt;
	public btn_saoDang:BtnTxt;
	public btn_battle:BtnTxt;
	public group_btns:fgui.GGroup;
	public static URL:string = "ui://va1qbl3hawbvw";

	public static createInstance():ComBattleConfirm {
		return <ComBattleConfirm>(fgui.UIPackage.createObject("PkgBattle", "ComBattleConfirm"));
	}

	protected override onConstruct():void {
		this.ctrl_openType = this.getControllerAt(0);
		this.txt_title = <fgui.GRichTextField>(this.getChildAt(3));
		this.txt_content = <fgui.GRichTextField>(this.getChildAt(4));
		this.slider_num = <fgui.GSlider>(this.getChildAt(5));
		this.btn_buyFood = <BtnTxt>(this.getChildAt(6));
		this.btn_buyTimes = <BtnTxt>(this.getChildAt(7));
		this.btn_saoDang = <BtnTxt>(this.getChildAt(8));
		this.btn_battle = <BtnTxt>(this.getChildAt(9));
		this.group_btns = <fgui.GGroup>(this.getChildAt(10));
	}
}