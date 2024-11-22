/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import ItemXinFa from "./ItemXinFa";
import { BtnTxtView } from "../../view/PkgCommon/view/btns/BtnTxtView";

export default class ComXinFa extends fgui.GComponent {

	public ctrlUpgrade: fgui.Controller;
	public btn_xinFa0: ItemXinFa;
	public btn_xinFa1: ItemXinFa;
	public btn_xinFa2: ItemXinFa;
	public btn_xinFa3: ItemXinFa;
	public btn_xinFa4: ItemXinFa;
	public btn_xinFa5: ItemXinFa;
	public btn_xinFa6: ItemXinFa;
	public btn_xinFa7: ItemXinFa;
	public btn_xinFa8: ItemXinFa;
	public graph_upgradeBg: fgui.GGraph;
	public txt_xinFaName: fgui.GTextField;
	public txt_xinFaDesc: fgui.GTextField;
	public txt_upgradeInfo: fgui.GTextField;
	public btn_skill0: BtnTxtView;
	public btn_skill1: BtnTxtView;
	public btn_skill2: BtnTxtView;
	public btn_skill3: BtnTxtView;
	public btn_upgrade0: BtnTxtView;
	public btn_upgrade1: BtnTxtView;
	public btn_upgrade2: BtnTxtView;
	public static url: string = "ui://vith2b66btv51i";

	public static createInstance(): ComXinFa {
		return <ComXinFa>(fgui.UIPackage.createObject("PkgMain", "ComXinFa"));
	}

	protected override onConstruct(): void {
		this.ctrlUpgrade = this.getControllerAt(0);
		this.btn_xinFa0 = <ItemXinFa>(this.getChildAt(0));
		this.btn_xinFa1 = <ItemXinFa>(this.getChildAt(1));
		this.btn_xinFa2 = <ItemXinFa>(this.getChildAt(2));
		this.btn_xinFa3 = <ItemXinFa>(this.getChildAt(3));
		this.btn_xinFa4 = <ItemXinFa>(this.getChildAt(4));
		this.btn_xinFa5 = <ItemXinFa>(this.getChildAt(5));
		this.btn_xinFa6 = <ItemXinFa>(this.getChildAt(6));
		this.btn_xinFa7 = <ItemXinFa>(this.getChildAt(7));
		this.btn_xinFa8 = <ItemXinFa>(this.getChildAt(8));
		this.graph_upgradeBg = <fgui.GGraph>(this.getChildAt(9));
		this.txt_xinFaName = <fgui.GTextField>(this.getChildAt(11));
		this.txt_xinFaDesc = <fgui.GTextField>(this.getChildAt(12));
		this.txt_upgradeInfo = <fgui.GTextField>(this.getChildAt(13));
		this.btn_skill0 = <BtnTxtView>(this.getChildAt(14));
		this.btn_skill1 = <BtnTxtView>(this.getChildAt(15));
		this.btn_skill2 = <BtnTxtView>(this.getChildAt(16));
		this.btn_skill3 = <BtnTxtView>(this.getChildAt(17));
		this.btn_upgrade0 = <BtnTxtView>(this.getChildAt(18));
		this.btn_upgrade1 = <BtnTxtView>(this.getChildAt(19));
		this.btn_upgrade2 = <BtnTxtView>(this.getChildAt(20));
	}
}