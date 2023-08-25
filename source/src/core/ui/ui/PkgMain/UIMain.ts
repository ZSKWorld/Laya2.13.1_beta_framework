/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import ComTrain from "./ComTrain";
import ComChar from "./ComChar";
import ComGoods from "./ComGoods";
import ComShop from "./ComShop";
import ComAbode from "./ComAbode";

export default class UIMain extends fgui.GComponent {

	public ctrlShow:fgui.Controller;
	public com_train:ComTrain;
	public com_char:ComChar;
	public com_goods:ComGoods;
	public com_shop:ComShop;
	public com_abode:ComAbode;
	public btn_train:fgui.GButton;
	public btn_char:fgui.GButton;
	public btn_goods:fgui.GButton;
	public btn_shop:fgui.GButton;
	public btn_abode:fgui.GButton;
	public btn_chat:fgui.GButton;
	public graph_info:fgui.GGraph;
	public txt_nickname:fgui.GTextField;
	public txt_level:fgui.GTextField;
	public txt_exp:fgui.GTextField;
	public txt_sect:fgui.GTextField;
	public txt_coin:fgui.GTextField;
	public txt_ingot:fgui.GTextField;
	public loader_head:fgui.GLoader;
	public btn_setting:fgui.GButton;
	public btn_rank:fgui.GButton;
	public btn_sphere:fgui.GButton;
	public static URL:string = "ui://vith2b66qjdo0";

	public static createInstance():UIMain {
		return <UIMain>(fgui.UIPackage.createObject("PkgMain", "UIMain"));
	}

	protected override onConstruct():void {
		this.ctrlShow = this.getControllerAt(0);
		this.com_train = <ComTrain>(this.getChildAt(2));
		this.com_char = <ComChar>(this.getChildAt(3));
		this.com_goods = <ComGoods>(this.getChildAt(4));
		this.com_shop = <ComShop>(this.getChildAt(5));
		this.com_abode = <ComAbode>(this.getChildAt(6));
		this.btn_train = <fgui.GButton>(this.getChildAt(7));
		this.btn_char = <fgui.GButton>(this.getChildAt(8));
		this.btn_goods = <fgui.GButton>(this.getChildAt(9));
		this.btn_shop = <fgui.GButton>(this.getChildAt(10));
		this.btn_abode = <fgui.GButton>(this.getChildAt(11));
		this.btn_chat = <fgui.GButton>(this.getChildAt(12));
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