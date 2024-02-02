/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { BtnTxtView } from "../../view/PkgCommon/view/btns/BtnTxtView";
import Pro1 from "../PkgCommon/Pro1";

export default class UISect extends fgui.GComponent {

	public btn_sect0: BtnTxtView;
	public btn_sect1: BtnTxtView;
	public btn_sect2: BtnTxtView;
	public btn_sect3: BtnTxtView;
	public btn_sect4: BtnTxtView;
	public btn_sect5: BtnTxtView;
	public btn_submit: BtnTxtView;
	public txt_desc: fgui.GTextField;
	public pro_0: Pro1;
	public pro_1: Pro1;
	public pro_2: Pro1;
	public pro_3: Pro1;
	public pro_4: Pro1;
	public pro_5: Pro1;
	public pro_6: Pro1;
	public static URL: string = "ui://vith2b66btv51q";

	public static createInstance(): UISect {
		return <UISect>(fgui.UIPackage.createObject("PkgMain", "UISect"));
	}

	protected override onConstruct(): void {
		this.btn_sect0 = <BtnTxtView>(this.getChildAt(1));
		this.btn_sect1 = <BtnTxtView>(this.getChildAt(2));
		this.btn_sect2 = <BtnTxtView>(this.getChildAt(3));
		this.btn_sect3 = <BtnTxtView>(this.getChildAt(4));
		this.btn_sect4 = <BtnTxtView>(this.getChildAt(5));
		this.btn_sect5 = <BtnTxtView>(this.getChildAt(6));
		this.btn_submit = <BtnTxtView>(this.getChildAt(7));
		this.txt_desc = <fgui.GTextField>(this.getChildAt(8));
		this.pro_0 = <Pro1>(this.getChildAt(10));
		this.pro_1 = <Pro1>(this.getChildAt(11));
		this.pro_2 = <Pro1>(this.getChildAt(12));
		this.pro_3 = <Pro1>(this.getChildAt(13));
		this.pro_4 = <Pro1>(this.getChildAt(14));
		this.pro_5 = <Pro1>(this.getChildAt(15));
		this.pro_6 = <Pro1>(this.getChildAt(16));
	}
}