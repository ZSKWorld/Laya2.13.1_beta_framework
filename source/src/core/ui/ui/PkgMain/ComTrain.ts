/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import BtnTxt from "../PkgCommon/BtnTxt";

export default class ComTrain extends fgui.GComponent {

	public btn_level:BtnTxt;
	public btn_copy:BtnTxt;
	public btn_secret:BtnTxt;
	public btn_boss:BtnTxt;
	public btn_gather:BtnTxt;
	public btn_gongLue:BtnTxt;
	public btn_waiYu:BtnTxt;
	public list_log:fgui.GList;
	public static URL:string = "ui://vith2b66sbd01";

	public static createInstance():ComTrain {
		return <ComTrain>(fgui.UIPackage.createObject("PkgMain", "ComTrain"));
	}

	protected override onConstruct():void {
		this.btn_level = <BtnTxt>(this.getChildAt(1));
		this.btn_copy = <BtnTxt>(this.getChildAt(2));
		this.btn_secret = <BtnTxt>(this.getChildAt(3));
		this.btn_boss = <BtnTxt>(this.getChildAt(4));
		this.btn_gather = <BtnTxt>(this.getChildAt(5));
		this.btn_gongLue = <BtnTxt>(this.getChildAt(6));
		this.btn_waiYu = <BtnTxt>(this.getChildAt(7));
		this.list_log = <fgui.GList>(this.getChildAt(8));
	}
}