/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import BtnTxt from "../PkgCommon/BtnTxt";

export default class ComRenWu extends fgui.GComponent {

	public txt_jingLi:fgui.GRichTextField;
	public txt_jinAtk:fgui.GRichTextField;
	public txt_muAtk:fgui.GRichTextField;
	public txt_shuiAtk:fgui.GRichTextField;
	public txt_huoAtk:fgui.GRichTextField;
	public txt_tuAtk:fgui.GRichTextField;
	public txt_moHe:fgui.GRichTextField;
	public txt_moBi:fgui.GRichTextField;
	public txt_lingShi:fgui.GRichTextField;
	public txt_jingLiHF:fgui.GRichTextField;
	public txt_jinDef:fgui.GRichTextField;
	public txt_muDef:fgui.GRichTextField;
	public txt_shuiDef:fgui.GRichTextField;
	public txt_huoDef:fgui.GRichTextField;
	public txt_tuDef:fgui.GRichTextField;
	public txt_hunPo:fgui.GRichTextField;
	public txt_gemScore:fgui.GRichTextField;
	public txt_exp:fgui.GRichTextField;
	public btn_wuQi:BtnTxt;
	public btn_xiangLian:BtnTxt;
	public btn_jieZhi:BtnTxt;
	public btn_huFu:BtnTxt;
	public btn_zuoQi:BtnTxt;
	public btn_anQi:BtnTxt;
	public btn_touKui:BtnTxt;
	public btn_yiFu:BtnTxt;
	public btn_xiaZhuang:BtnTxt;
	public btn_xieZi:BtnTxt;
	public btn_shiZhuang:BtnTxt;
	public btn_faBao:BtnTxt;
	public static URL:string = "ui://vith2b66whk31d";

	public static createInstance():ComRenWu {
		return <ComRenWu>(fgui.UIPackage.createObject("PkgMain", "ComRenWu"));
	}

	protected override onConstruct():void {
		this.txt_jingLi = <fgui.GRichTextField>(this.getChildAt(2));
		this.txt_jinAtk = <fgui.GRichTextField>(this.getChildAt(3));
		this.txt_muAtk = <fgui.GRichTextField>(this.getChildAt(4));
		this.txt_shuiAtk = <fgui.GRichTextField>(this.getChildAt(5));
		this.txt_huoAtk = <fgui.GRichTextField>(this.getChildAt(6));
		this.txt_tuAtk = <fgui.GRichTextField>(this.getChildAt(7));
		this.txt_moHe = <fgui.GRichTextField>(this.getChildAt(8));
		this.txt_moBi = <fgui.GRichTextField>(this.getChildAt(9));
		this.txt_lingShi = <fgui.GRichTextField>(this.getChildAt(10));
		this.txt_jingLiHF = <fgui.GRichTextField>(this.getChildAt(11));
		this.txt_jinDef = <fgui.GRichTextField>(this.getChildAt(12));
		this.txt_muDef = <fgui.GRichTextField>(this.getChildAt(13));
		this.txt_shuiDef = <fgui.GRichTextField>(this.getChildAt(14));
		this.txt_huoDef = <fgui.GRichTextField>(this.getChildAt(15));
		this.txt_tuDef = <fgui.GRichTextField>(this.getChildAt(16));
		this.txt_hunPo = <fgui.GRichTextField>(this.getChildAt(17));
		this.txt_gemScore = <fgui.GRichTextField>(this.getChildAt(18));
		this.txt_exp = <fgui.GRichTextField>(this.getChildAt(19));
		this.btn_wuQi = <BtnTxt>(this.getChildAt(32));
		this.btn_xiangLian = <BtnTxt>(this.getChildAt(33));
		this.btn_jieZhi = <BtnTxt>(this.getChildAt(34));
		this.btn_huFu = <BtnTxt>(this.getChildAt(35));
		this.btn_zuoQi = <BtnTxt>(this.getChildAt(36));
		this.btn_anQi = <BtnTxt>(this.getChildAt(37));
		this.btn_touKui = <BtnTxt>(this.getChildAt(38));
		this.btn_yiFu = <BtnTxt>(this.getChildAt(39));
		this.btn_xiaZhuang = <BtnTxt>(this.getChildAt(40));
		this.btn_xieZi = <BtnTxt>(this.getChildAt(41));
		this.btn_shiZhuang = <BtnTxt>(this.getChildAt(42));
		this.btn_faBao = <BtnTxt>(this.getChildAt(43));
	}
}