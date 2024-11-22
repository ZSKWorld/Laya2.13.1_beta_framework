/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { BtnTxtView } from "../../view/PkgCommon/view/btns/BtnTxtView";

export default class ComBattleConfirm extends fgui.GComponent {

	public ctrl_openType: fgui.Controller;
	public txt_title: fgui.GRichTextField;
	public txt_content: fgui.GRichTextField;
	public slider_num: fgui.GSlider;
	public btn_buyFood: BtnTxtView;
	public btn_buyTimes: BtnTxtView;
	public btn_saoDang: BtnTxtView;
	public btn_battle: BtnTxtView;
	public group_btns: fgui.GGroup;
	public static url: string = "ui://va1qbl3hawbvw";

	public static createInstance(): ComBattleConfirm {
		return <ComBattleConfirm>(fgui.UIPackage.createObject("PkgBattle", "ComBattleConfirm"));
	}

	protected override onConstruct(): void {
		this.ctrl_openType = this.getControllerAt(0);
		this.txt_title = <fgui.GRichTextField>(this.getChildAt(3));
		this.txt_content = <fgui.GRichTextField>(this.getChildAt(4));
		this.slider_num = <fgui.GSlider>(this.getChildAt(5));
		this.btn_buyFood = <BtnTxtView>(this.getChildAt(6));
		this.btn_buyTimes = <BtnTxtView>(this.getChildAt(7));
		this.btn_saoDang = <BtnTxtView>(this.getChildAt(8));
		this.btn_battle = <BtnTxtView>(this.getChildAt(9));
		this.group_btns = <fgui.GGroup>(this.getChildAt(10));
	}
}