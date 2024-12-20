/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ComTrainView } from "../../view/PkgMain/view/coms/ComTrainView";
import { ComCharView } from "../../view/PkgMain/view/coms/ComCharView";
import { ComGoodsView } from "../../view/PkgMain/view/coms/ComGoodsView";
import { ComShopView } from "../../view/PkgMain/view/coms/ComShopView";
import { ComAbodeView } from "../../view/PkgMain/view/coms/ComAbodeView";
import { BtnMainKindView } from "../../view/PkgMain/view/btns/BtnMainKindView";

export default class UIMain extends fgui.GComponent {

	public ctrlShow: fgui.Controller;
	public com_train: ComTrainView;
	public com_char: ComCharView;
	public com_goods: ComGoodsView;
	public com_shop: ComShopView;
	public com_abode: ComAbodeView;
	public btn_train: BtnMainKindView;
	public btn_char: BtnMainKindView;
	public btn_goods: BtnMainKindView;
	public btn_shop: BtnMainKindView;
	public btn_abode: BtnMainKindView;
	public btn_chat: BtnMainKindView;
	public graph_info: fgui.GGraph;
	public txt_nickname: fgui.GTextField;
	public txt_level: fgui.GTextField;
	public txt_exp: fgui.GTextField;
	public txt_sect: fgui.GTextField;
	public txt_coin: fgui.GTextField;
	public txt_ingot: fgui.GTextField;
	public loader_head: fgui.GLoader;
	public btn_setting: fgui.GButton;
	public btn_rank: fgui.GButton;
	public btn_sphere: fgui.GButton;
	public static url: string = "ui://vith2b66qjdo0";

	public static createInstance(): UIMain {
		return <UIMain>(fgui.UIPackage.createObject("PkgMain", "UIMain"));
	}

	protected override onConstruct(): void {
		this.ctrlShow = this.getControllerAt(0);
		this.com_train = <ComTrainView>(this.getChildAt(2));
		this.com_char = <ComCharView>(this.getChildAt(3));
		this.com_goods = <ComGoodsView>(this.getChildAt(4));
		this.com_shop = <ComShopView>(this.getChildAt(5));
		this.com_abode = <ComAbodeView>(this.getChildAt(6));
		this.btn_train = <BtnMainKindView>(this.getChildAt(7));
		this.btn_char = <BtnMainKindView>(this.getChildAt(8));
		this.btn_goods = <BtnMainKindView>(this.getChildAt(9));
		this.btn_shop = <BtnMainKindView>(this.getChildAt(10));
		this.btn_abode = <BtnMainKindView>(this.getChildAt(11));
		this.btn_chat = <BtnMainKindView>(this.getChildAt(12));
		this.graph_info = <fgui.GGraph>(this.getChildAt(14));
		this.txt_nickname = <fgui.GTextField>(this.getChildAt(17));
		this.txt_level = <fgui.GTextField>(this.getChildAt(19));
		this.txt_exp = <fgui.GTextField>(this.getChildAt(20));
		this.txt_sect = <fgui.GTextField>(this.getChildAt(21));
		this.txt_coin = <fgui.GTextField>(this.getChildAt(23));
		this.txt_ingot = <fgui.GTextField>(this.getChildAt(24));
		this.loader_head = <fgui.GLoader>(this.getChildAt(25));
		this.btn_setting = <fgui.GButton>(this.getChildAt(26));
		this.btn_rank = <fgui.GButton>(this.getChildAt(27));
		this.btn_sphere = <fgui.GButton>(this.getChildAt(29));
	}
}