/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import Pro1 from "../PkgCommon/Pro1";
import { BtnTxtView } from "../../view/PkgCommon/view/btns/BtnTxtView";
import CmbDongFu from "../PkgMain/CmbDongFu";

export default class UIBattle extends fgui.GComponent {

	public ctrlState: fgui.Controller;
	public pro_wave: Pro1;
	public pro_exp: Pro1;
	public pro_selfHp: Pro1;
	public pro_enemyHp: Pro1;
	public txt_selfName: fgui.GTextField;
	public txt_enemyName: fgui.GTextField;
	public txt_info: fgui.GRichTextField;
	public list_log: fgui.GList;
	public btn_offline: BtnTxtView;
	public btn_enemyInfo: BtnTxtView;
	public btn_quitBattle: BtnTxtView;
	public cmb_beiSu: CmbDongFu;
	public graph_closeInfo: fgui.GGraph;
	public txt_enemy: fgui.GTextField;
	public static url: string = "ui://va1qbl3hsbd00";

	public static createInstance(): UIBattle {
		return <UIBattle>(fgui.UIPackage.createObject("PkgBattle", "UIBattle"));
	}

	protected override onConstruct(): void {
		this.ctrlState = this.getControllerAt(0);
		this.pro_wave = <Pro1>(this.getChildAt(3));
		this.pro_exp = <Pro1>(this.getChildAt(4));
		this.pro_selfHp = <Pro1>(this.getChildAt(5));
		this.pro_enemyHp = <Pro1>(this.getChildAt(6));
		this.txt_selfName = <fgui.GTextField>(this.getChildAt(7));
		this.txt_enemyName = <fgui.GTextField>(this.getChildAt(8));
		this.txt_info = <fgui.GRichTextField>(this.getChildAt(9));
		this.list_log = <fgui.GList>(this.getChildAt(10));
		this.btn_offline = <BtnTxtView>(this.getChildAt(11));
		this.btn_enemyInfo = <BtnTxtView>(this.getChildAt(12));
		this.btn_quitBattle = <BtnTxtView>(this.getChildAt(13));
		this.cmb_beiSu = <CmbDongFu>(this.getChildAt(14));
		this.graph_closeInfo = <fgui.GGraph>(this.getChildAt(15));
		this.txt_enemy = <fgui.GTextField>(this.getChildAt(16));
	}
}