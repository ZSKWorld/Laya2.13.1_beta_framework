/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import BtnCornerTxt from "../PkgCommon/BtnCornerTxt";

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
	public btn_wuQi:BtnCornerTxt;
	public btn_xiangLian:BtnCornerTxt;
	public btn_jieZhi:BtnCornerTxt;
	public btn_huFu:BtnCornerTxt;
	public btn_zuoQi:BtnCornerTxt;
	public btn_anQi:BtnCornerTxt;
	public btn_touKui:BtnCornerTxt;
	public btn_yiFu:BtnCornerTxt;
	public btn_xiaZhuang:BtnCornerTxt;
	public btn_xieZi:BtnCornerTxt;
	public btn_shiZhuang:BtnCornerTxt;
	public btn_faBao:BtnCornerTxt;
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
		this.btn_wuQi = <BtnCornerTxt>(this.getChildAt(32));
		this.btn_xiangLian = <BtnCornerTxt>(this.getChildAt(33));
		this.btn_jieZhi = <BtnCornerTxt>(this.getChildAt(34));
		this.btn_huFu = <BtnCornerTxt>(this.getChildAt(35));
		this.btn_zuoQi = <BtnCornerTxt>(this.getChildAt(36));
		this.btn_anQi = <BtnCornerTxt>(this.getChildAt(37));
		this.btn_touKui = <BtnCornerTxt>(this.getChildAt(38));
		this.btn_yiFu = <BtnCornerTxt>(this.getChildAt(39));
		this.btn_xiaZhuang = <BtnCornerTxt>(this.getChildAt(40));
		this.btn_xieZi = <BtnCornerTxt>(this.getChildAt(41));
		this.btn_shiZhuang = <BtnCornerTxt>(this.getChildAt(42));
		this.btn_faBao = <BtnCornerTxt>(this.getChildAt(43));
	}
}