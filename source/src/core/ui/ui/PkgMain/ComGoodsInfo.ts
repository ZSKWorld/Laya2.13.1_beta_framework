/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import BtnCornerTxt from "../PkgCommon/BtnCornerTxt";

export default class ComGoodsInfo extends fgui.GComponent {

	public ctrlState:fgui.Controller;
	public txt_content:fgui.GRichTextField;
	public input_num:fgui.GTextInput;
	public btn_collect:fgui.GButton;
	public btn_use:BtnCornerTxt;
	public btn_sell:BtnCornerTxt;
	public btn_buy:BtnCornerTxt;
	public static URL:string = "ui://vith2b66awbv2f";

	public static createInstance():ComGoodsInfo {
		return <ComGoodsInfo>(fgui.UIPackage.createObject("PkgMain", "ComGoodsInfo"));
	}

	protected override onConstruct():void {
		this.ctrlState = this.getControllerAt(0);
		this.txt_content = <fgui.GRichTextField>(this.getChildAt(4));
		this.input_num = <fgui.GTextInput>(this.getChildAt(6));
		this.btn_collect = <fgui.GButton>(this.getChildAt(7));
		this.btn_use = <BtnCornerTxt>(this.getChildAt(8));
		this.btn_sell = <BtnCornerTxt>(this.getChildAt(9));
		this.btn_buy = <BtnCornerTxt>(this.getChildAt(10));
	}
}