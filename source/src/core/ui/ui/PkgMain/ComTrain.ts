/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import BtnCornerTxt from "../PkgCommon/BtnCornerTxt";

export default class ComTrain extends fgui.GComponent {

	public btn_level:BtnCornerTxt;
	public btn_copy:BtnCornerTxt;
	public btn_secret:BtnCornerTxt;
	public btn_boss:BtnCornerTxt;
	public btn_gather:BtnCornerTxt;
	public btn_gongLue:BtnCornerTxt;
	public btn_waiYu:BtnCornerTxt;
	public list_log:fgui.GList;
	public static URL:string = "ui://vith2b66sbd01";

	public static createInstance():ComTrain {
		return <ComTrain>(fgui.UIPackage.createObject("PkgMain", "ComTrain"));
	}

	protected override onConstruct():void {
		this.btn_level = <BtnCornerTxt>(this.getChildAt(1));
		this.btn_copy = <BtnCornerTxt>(this.getChildAt(2));
		this.btn_secret = <BtnCornerTxt>(this.getChildAt(3));
		this.btn_boss = <BtnCornerTxt>(this.getChildAt(4));
		this.btn_gather = <BtnCornerTxt>(this.getChildAt(5));
		this.btn_gongLue = <BtnCornerTxt>(this.getChildAt(6));
		this.btn_waiYu = <BtnCornerTxt>(this.getChildAt(7));
		this.list_log = <fgui.GList>(this.getChildAt(8));
	}
}