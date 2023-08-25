/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import BtnCornerTxt from "../PkgCommon/BtnCornerTxt";

export default class ComGoods extends fgui.GComponent {

	public ctrlSelectType:fgui.Controller;
	public btn_shouCang:BtnCornerTxt;
	public btn_equip:BtnCornerTxt;
	public btn_prop:BtnCornerTxt;
	public btn_gem:BtnCornerTxt;
	public btn_material:BtnCornerTxt;
	public btn_book:BtnCornerTxt;
	public btn_other:BtnCornerTxt;
	public btn_qualityUp:BtnCornerTxt;
	public btn_qualityDown:BtnCornerTxt;
	public btn_typeUp:BtnCornerTxt;
	public btn_typeDown:BtnCornerTxt;
	public btn_scoreUp:BtnCornerTxt;
	public btn_scoreDown:BtnCornerTxt;
	public list_item:fgui.GList;
	public EffectShow:fgui.Transition;
	public EffectList:fgui.Transition;
	public static URL:string = "ui://vith2b66sbd02";

	public static createInstance():ComGoods {
		return <ComGoods>(fgui.UIPackage.createObject("PkgMain", "ComGoods"));
	}

	protected override onConstruct():void {
		this.ctrlSelectType = this.getControllerAt(0);
		this.btn_shouCang = <BtnCornerTxt>(this.getChildAt(0));
		this.btn_equip = <BtnCornerTxt>(this.getChildAt(1));
		this.btn_prop = <BtnCornerTxt>(this.getChildAt(2));
		this.btn_gem = <BtnCornerTxt>(this.getChildAt(3));
		this.btn_material = <BtnCornerTxt>(this.getChildAt(4));
		this.btn_book = <BtnCornerTxt>(this.getChildAt(5));
		this.btn_other = <BtnCornerTxt>(this.getChildAt(6));
		this.btn_qualityUp = <BtnCornerTxt>(this.getChildAt(8));
		this.btn_qualityDown = <BtnCornerTxt>(this.getChildAt(9));
		this.btn_typeUp = <BtnCornerTxt>(this.getChildAt(10));
		this.btn_typeDown = <BtnCornerTxt>(this.getChildAt(11));
		this.btn_scoreUp = <BtnCornerTxt>(this.getChildAt(12));
		this.btn_scoreDown = <BtnCornerTxt>(this.getChildAt(13));
		this.list_item = <fgui.GList>(this.getChildAt(15));
		this.EffectShow = this.getTransitionAt(0);
		this.EffectList = this.getTransitionAt(1);
	}
}