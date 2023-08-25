/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import CmbDongFu from "./CmbDongFu";
import BtnCornerTxt from "../PkgCommon/BtnCornerTxt";

export default class ComZhiZuo extends fgui.GComponent {

	public btn_jpyl:BtnCornerTxt;
	public btn_dzzb:BtnCornerTxt;
	public btn_zjzb:BtnCornerTxt;
	public btn_czzb:BtnCornerTxt;
	public btn_bshc:BtnCornerTxt;
	public btn_zztz:BtnCornerTxt;
	public btn_fjzb:BtnCornerTxt;
	public btn_fjbs:BtnCornerTxt;
	public btn_yjhc:BtnCornerTxt;
	public cmb_level:CmbDongFu;
	public cmb_type:CmbDongFu;
	public cmb_detail:CmbDongFu;
	public cmb_fjzbdj:CmbDongFu;
	public cmb_fjbsdj:CmbDongFu;
	public EffectShow:fgui.Transition;
	public static URL:string = "ui://vith2b669f1k1h";

	public static createInstance():ComZhiZuo {
		return <ComZhiZuo>(fgui.UIPackage.createObject("PkgMain", "ComZhiZuo"));
	}

	protected override onConstruct():void {
		this.btn_jpyl = <BtnCornerTxt>(this.getChildAt(6));
		this.btn_dzzb = <BtnCornerTxt>(this.getChildAt(7));
		this.btn_zjzb = <BtnCornerTxt>(this.getChildAt(8));
		this.btn_czzb = <BtnCornerTxt>(this.getChildAt(9));
		this.btn_bshc = <BtnCornerTxt>(this.getChildAt(10));
		this.btn_zztz = <BtnCornerTxt>(this.getChildAt(11));
		this.btn_fjzb = <BtnCornerTxt>(this.getChildAt(12));
		this.btn_fjbs = <BtnCornerTxt>(this.getChildAt(13));
		this.btn_yjhc = <BtnCornerTxt>(this.getChildAt(14));
		this.cmb_level = <CmbDongFu>(this.getChildAt(15));
		this.cmb_type = <CmbDongFu>(this.getChildAt(16));
		this.cmb_detail = <CmbDongFu>(this.getChildAt(17));
		this.cmb_fjzbdj = <CmbDongFu>(this.getChildAt(18));
		this.cmb_fjbsdj = <CmbDongFu>(this.getChildAt(19));
		this.EffectShow = this.getTransitionAt(0);
	}
}