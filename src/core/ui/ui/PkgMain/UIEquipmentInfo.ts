/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UIEquipmentInfo extends fgui.GComponent {

	public ctrlType:fgui.Controller;
	public BtnBg:fgui.GGraph;
	public TxtEquipInfo1:fgui.GRichTextField;
	public TxtEquipInfo2:fgui.GRichTextField;
	public BtnSell:fgui.GButton;
	public BtnDress:fgui.GButton;
	public BtnQiangHua:fgui.GButton;
	public BtnXiangQian:fgui.GButton;
	public BtnMingKe:fgui.GButton;
	public BtnShenYou:fgui.GButton;
	public static URL:string = "ui://vith2b66sbd01b";

	public static createInstance():UIEquipmentInfo {
		return <UIEquipmentInfo>(fgui.UIPackage.createObject("PkgMain", "UIEquipmentInfo"));
	}

	protected onConstruct():void {
		this.ctrlType = this.getControllerAt(0);
		this.BtnBg = <fgui.GGraph>(this.getChildAt(0));
		this.TxtEquipInfo1 = <fgui.GRichTextField>(this.getChildAt(2));
		this.TxtEquipInfo2 = <fgui.GRichTextField>(this.getChildAt(3));
		this.BtnSell = <fgui.GButton>(this.getChildAt(5));
		this.BtnDress = <fgui.GButton>(this.getChildAt(6));
		this.BtnQiangHua = <fgui.GButton>(this.getChildAt(7));
		this.BtnXiangQian = <fgui.GButton>(this.getChildAt(8));
		this.BtnMingKe = <fgui.GButton>(this.getChildAt(9));
		this.BtnShenYou = <fgui.GButton>(this.getChildAt(10));
	}
}