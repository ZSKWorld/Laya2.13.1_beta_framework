/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import CmbDongFu from "./CmbDongFu";
import BtnTxt from "../PkgCommon/BtnTxt";

export default class ComZhiZuo extends fgui.GComponent {

	public btn_jpyl:BtnTxt;
	public btn_dzzb:BtnTxt;
	public btn_zjzb:BtnTxt;
	public btn_czzb:BtnTxt;
	public btn_bshc:BtnTxt;
	public btn_zztz:BtnTxt;
	public btn_fjzb:BtnTxt;
	public btn_fjbs:BtnTxt;
	public btn_yjhc:BtnTxt;
	public cmb_level:CmbDongFu;
	public cmb_type:CmbDongFu;
	public cmb_detail:CmbDongFu;
	public cmb_fjzbdj:CmbDongFu;
	public cmb_fjbsdj:CmbDongFu;
	public static URL:string = "ui://vith2b669f1k1h";

	public static createInstance():ComZhiZuo {
		return <ComZhiZuo>(fgui.UIPackage.createObject("PkgMain", "ComZhiZuo"));
	}

	protected override onConstruct():void {
		this.btn_jpyl = <BtnTxt>(this.getChildAt(6));
		this.btn_dzzb = <BtnTxt>(this.getChildAt(7));
		this.btn_zjzb = <BtnTxt>(this.getChildAt(8));
		this.btn_czzb = <BtnTxt>(this.getChildAt(9));
		this.btn_bshc = <BtnTxt>(this.getChildAt(10));
		this.btn_zztz = <BtnTxt>(this.getChildAt(11));
		this.btn_fjzb = <BtnTxt>(this.getChildAt(13));
		this.btn_fjbs = <BtnTxt>(this.getChildAt(14));
		this.btn_yjhc = <BtnTxt>(this.getChildAt(15));
		this.cmb_level = <CmbDongFu>(this.getChildAt(16));
		this.cmb_type = <CmbDongFu>(this.getChildAt(17));
		this.cmb_detail = <CmbDongFu>(this.getChildAt(18));
		this.cmb_fjzbdj = <CmbDongFu>(this.getChildAt(19));
		this.cmb_fjbsdj = <CmbDongFu>(this.getChildAt(20));
	}
}