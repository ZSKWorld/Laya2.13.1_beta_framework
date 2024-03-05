/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ComTenWaterView } from "../../view/PkgLittleGame/view/coms/ComTenWaterView";
import { BtnTxtView } from "../../view/PkgCommon/view/btns/BtnTxtView";

export default class UITenWater extends fgui.GComponent {

	public btn_back: fgui.GButton;
	public com_00: ComTenWaterView;
	public com_01: ComTenWaterView;
	public com_02: ComTenWaterView;
	public com_03: ComTenWaterView;
	public com_04: ComTenWaterView;
	public com_05: ComTenWaterView;
	public com_10: ComTenWaterView;
	public com_11: ComTenWaterView;
	public com_12: ComTenWaterView;
	public com_13: ComTenWaterView;
	public com_14: ComTenWaterView;
	public com_15: ComTenWaterView;
	public com_20: ComTenWaterView;
	public com_21: ComTenWaterView;
	public com_22: ComTenWaterView;
	public com_23: ComTenWaterView;
	public com_24: ComTenWaterView;
	public com_25: ComTenWaterView;
	public com_30: ComTenWaterView;
	public com_31: ComTenWaterView;
	public com_32: ComTenWaterView;
	public com_33: ComTenWaterView;
	public com_34: ComTenWaterView;
	public com_35: ComTenWaterView;
	public com_40: ComTenWaterView;
	public com_41: ComTenWaterView;
	public com_42: ComTenWaterView;
	public com_43: ComTenWaterView;
	public com_44: ComTenWaterView;
	public com_45: ComTenWaterView;
	public com_50: ComTenWaterView;
	public com_51: ComTenWaterView;
	public com_52: ComTenWaterView;
	public com_53: ComTenWaterView;
	public com_54: ComTenWaterView;
	public com_55: ComTenWaterView;
	public btn_calcuate: BtnTxtView;
	public btn_resetMap: BtnTxtView;
	public input_canUse: fgui.GTextInput;
	public static URL: string = "ui://1gl1luit9hon1";

	public static createInstance(): UITenWater {
		return <UITenWater>(fgui.UIPackage.createObject("PkgLittleGame", "UITenWater"));
	}

	protected override onConstruct(): void {
		this.btn_back = <fgui.GButton>(this.getChildAt(0));
		this.com_00 = <ComTenWaterView>(this.getChildAt(1));
		this.com_01 = <ComTenWaterView>(this.getChildAt(2));
		this.com_02 = <ComTenWaterView>(this.getChildAt(3));
		this.com_03 = <ComTenWaterView>(this.getChildAt(4));
		this.com_04 = <ComTenWaterView>(this.getChildAt(5));
		this.com_05 = <ComTenWaterView>(this.getChildAt(6));
		this.com_10 = <ComTenWaterView>(this.getChildAt(8));
		this.com_11 = <ComTenWaterView>(this.getChildAt(9));
		this.com_12 = <ComTenWaterView>(this.getChildAt(10));
		this.com_13 = <ComTenWaterView>(this.getChildAt(11));
		this.com_14 = <ComTenWaterView>(this.getChildAt(12));
		this.com_15 = <ComTenWaterView>(this.getChildAt(13));
		this.com_20 = <ComTenWaterView>(this.getChildAt(15));
		this.com_21 = <ComTenWaterView>(this.getChildAt(16));
		this.com_22 = <ComTenWaterView>(this.getChildAt(17));
		this.com_23 = <ComTenWaterView>(this.getChildAt(18));
		this.com_24 = <ComTenWaterView>(this.getChildAt(19));
		this.com_25 = <ComTenWaterView>(this.getChildAt(20));
		this.com_30 = <ComTenWaterView>(this.getChildAt(22));
		this.com_31 = <ComTenWaterView>(this.getChildAt(23));
		this.com_32 = <ComTenWaterView>(this.getChildAt(24));
		this.com_33 = <ComTenWaterView>(this.getChildAt(25));
		this.com_34 = <ComTenWaterView>(this.getChildAt(26));
		this.com_35 = <ComTenWaterView>(this.getChildAt(27));
		this.com_40 = <ComTenWaterView>(this.getChildAt(29));
		this.com_41 = <ComTenWaterView>(this.getChildAt(30));
		this.com_42 = <ComTenWaterView>(this.getChildAt(31));
		this.com_43 = <ComTenWaterView>(this.getChildAt(32));
		this.com_44 = <ComTenWaterView>(this.getChildAt(33));
		this.com_45 = <ComTenWaterView>(this.getChildAt(34));
		this.com_50 = <ComTenWaterView>(this.getChildAt(36));
		this.com_51 = <ComTenWaterView>(this.getChildAt(37));
		this.com_52 = <ComTenWaterView>(this.getChildAt(38));
		this.com_53 = <ComTenWaterView>(this.getChildAt(39));
		this.com_54 = <ComTenWaterView>(this.getChildAt(40));
		this.com_55 = <ComTenWaterView>(this.getChildAt(41));
		this.btn_calcuate = <BtnTxtView>(this.getChildAt(44));
		this.btn_resetMap = <BtnTxtView>(this.getChildAt(45));
		this.input_canUse = <fgui.GTextInput>(this.getChildAt(46));
	}
}