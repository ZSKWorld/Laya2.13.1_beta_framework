/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import ComLiLian from "./ComLiLian";
import ComJueSe from "./ComJueSe";
import ComWuPin from "./ComWuPin";
import ComShangCheng from "./ComShangCheng";
import ComDongFu from "./ComDongFu";

export default class UIMain extends fgui.GComponent {

	public ctrlShow:fgui.Controller;
	public ComLiLian:ComLiLian;
	public ComJueSe:ComJueSe;
	public ComWuPin:ComWuPin;
	public ComShangCheng:ComShangCheng;
	public ComDongFu:ComDongFu;
	public BtnLiLian:fgui.GButton;
	public BtnJueSe:fgui.GButton;
	public BtnWuPin:fgui.GButton;
	public BtnShangCheng:fgui.GButton;
	public BtnDongFu:fgui.GButton;
	public BtnChat:fgui.GButton;
	public BtnInfo:fgui.GGraph;
	public TxtNickName:fgui.GTextField;
	public TxtLevel:fgui.GTextField;
	public TxtExp:fgui.GTextField;
	public TxtSect:fgui.GTextField;
	public TxtJinBi:fgui.GTextField;
	public TxtYuanBao:fgui.GTextField;
	public BtnHead:fgui.GLoader;
	public BtnSetting:fgui.GButton;
	public BtnRank:fgui.GButton;
	public BtnSphere:fgui.GButton;
	public static URL:string = "ui://vith2b66qjdo0";

	public static createInstance():UIMain {
		return <UIMain>(fgui.UIPackage.createObject("PkgMain", "UIMain"));
	}

	protected onConstruct():void {
		this.ctrlShow = this.getControllerAt(0);
		this.ComLiLian = <ComLiLian>(this.getChildAt(2));
		this.ComJueSe = <ComJueSe>(this.getChildAt(3));
		this.ComWuPin = <ComWuPin>(this.getChildAt(4));
		this.ComShangCheng = <ComShangCheng>(this.getChildAt(5));
		this.ComDongFu = <ComDongFu>(this.getChildAt(6));
		this.BtnLiLian = <fgui.GButton>(this.getChildAt(7));
		this.BtnJueSe = <fgui.GButton>(this.getChildAt(8));
		this.BtnWuPin = <fgui.GButton>(this.getChildAt(9));
		this.BtnShangCheng = <fgui.GButton>(this.getChildAt(10));
		this.BtnDongFu = <fgui.GButton>(this.getChildAt(11));
		this.BtnChat = <fgui.GButton>(this.getChildAt(12));
		this.BtnInfo = <fgui.GGraph>(this.getChildAt(13));
		this.TxtNickName = <fgui.GTextField>(this.getChildAt(16));
		this.TxtLevel = <fgui.GTextField>(this.getChildAt(18));
		this.TxtExp = <fgui.GTextField>(this.getChildAt(19));
		this.TxtSect = <fgui.GTextField>(this.getChildAt(20));
		this.TxtJinBi = <fgui.GTextField>(this.getChildAt(22));
		this.TxtYuanBao = <fgui.GTextField>(this.getChildAt(23));
		this.BtnHead = <fgui.GLoader>(this.getChildAt(24));
		this.BtnSetting = <fgui.GButton>(this.getChildAt(25));
		this.BtnRank = <fgui.GButton>(this.getChildAt(26));
		this.BtnSphere = <fgui.GButton>(this.getChildAt(28));
	}
}