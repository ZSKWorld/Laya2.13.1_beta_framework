/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import CmbDongFu from "./CmbDongFu";
import { BtnTxtView } from "../../view/PkgCommon/view/btns/BtnTxtView";

export default class ComZhiZuo extends fgui.GComponent {

	public btn_jpyl: BtnTxtView;
	public btn_dzzb: BtnTxtView;
	public btn_zjzb: BtnTxtView;
	public btn_czzb: BtnTxtView;
	public btn_bshc: BtnTxtView;
	public btn_zztz: BtnTxtView;
	public btn_fjzb: BtnTxtView;
	public btn_fjbs: BtnTxtView;
	public btn_yjhc: BtnTxtView;
	public cmb_level: CmbDongFu;
	public cmb_type: CmbDongFu;
	public cmb_detail: CmbDongFu;
	public cmb_fjzbdj: CmbDongFu;
	public cmb_fjbsdj: CmbDongFu;
	public static url: string = "ui://vith2b669f1k1h";

	public static createInstance(): ComZhiZuo {
		return <ComZhiZuo>(fgui.UIPackage.createObject("PkgMain", "ComZhiZuo"));
	}

	protected override onConstruct(): void {
		this.btn_jpyl = <BtnTxtView>(this.getChildAt(6));
		this.btn_dzzb = <BtnTxtView>(this.getChildAt(7));
		this.btn_zjzb = <BtnTxtView>(this.getChildAt(8));
		this.btn_czzb = <BtnTxtView>(this.getChildAt(9));
		this.btn_bshc = <BtnTxtView>(this.getChildAt(10));
		this.btn_zztz = <BtnTxtView>(this.getChildAt(11));
		this.btn_fjzb = <BtnTxtView>(this.getChildAt(13));
		this.btn_fjbs = <BtnTxtView>(this.getChildAt(14));
		this.btn_yjhc = <BtnTxtView>(this.getChildAt(15));
		this.cmb_level = <CmbDongFu>(this.getChildAt(16));
		this.cmb_type = <CmbDongFu>(this.getChildAt(17));
		this.cmb_detail = <CmbDongFu>(this.getChildAt(18));
		this.cmb_fjzbdj = <CmbDongFu>(this.getChildAt(19));
		this.cmb_fjbsdj = <CmbDongFu>(this.getChildAt(20));
	}
}