/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { BtnTxtView } from "../../view/PkgCommon/view/btns/BtnTxtView";

export default class ComTrain extends fgui.GComponent {

	public btn_level:BtnTxtView;
	public btn_copy:BtnTxtView;
	public btn_secret:BtnTxtView;
	public btn_boss:BtnTxtView;
	public btn_gather:BtnTxtView;
	public btn_gongLue:BtnTxtView;
	public btn_waiYu:BtnTxtView;
	public list_log:fgui.GList;
	public static URL:string = "ui://vith2b66sbd01";

	public static createInstance():ComTrain {
		return <ComTrain>(fgui.UIPackage.createObject("PkgMain", "ComTrain"));
	}

	protected override onConstruct():void {
		this.btn_level = <BtnTxtView>(this.getChildAt(1));
		this.btn_copy = <BtnTxtView>(this.getChildAt(2));
		this.btn_secret = <BtnTxtView>(this.getChildAt(3));
		this.btn_boss = <BtnTxtView>(this.getChildAt(4));
		this.btn_gather = <BtnTxtView>(this.getChildAt(5));
		this.btn_gongLue = <BtnTxtView>(this.getChildAt(6));
		this.btn_waiYu = <BtnTxtView>(this.getChildAt(7));
		this.list_log = <fgui.GList>(this.getChildAt(8));
	}
}