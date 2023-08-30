/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import BtnCornerTxt from "../PkgCommon/BtnCornerTxt";

export default class UIGoodsInfo extends fgui.GComponent {

	public ctrlUse:fgui.Controller;
	public ctrlSell:fgui.Controller;
	public graph_bg:fgui.GGraph;
	public txt_content:fgui.GRichTextField;
	public txt_userNum:fgui.GTextInput;
	public btn_collect:fgui.GButton;
	public btn_sell:BtnCornerTxt;
	public btn_use:BtnCornerTxt;
	public btn_buy:BtnCornerTxt;
	public trans_show:fgui.Transition;
	public static URL:string = "ui://vith2b66irlv1e";

	public static createInstance():UIGoodsInfo {
		return <UIGoodsInfo>(fgui.UIPackage.createObject("PkgMain", "UIGoodsInfo"));
	}

	protected override onConstruct():void {
		this.ctrlUse = this.getControllerAt(0);
		this.ctrlSell = this.getControllerAt(1);
		this.graph_bg = <fgui.GGraph>(this.getChildAt(0));
		this.txt_content = <fgui.GRichTextField>(this.getChildAt(5));
		this.txt_userNum = <fgui.GTextInput>(this.getChildAt(7));
		this.btn_collect = <fgui.GButton>(this.getChildAt(8));
		this.btn_sell = <BtnCornerTxt>(this.getChildAt(9));
		this.btn_use = <BtnCornerTxt>(this.getChildAt(10));
		this.btn_buy = <BtnCornerTxt>(this.getChildAt(11));
		this.trans_show = this.getTransitionAt(0);
	}
}