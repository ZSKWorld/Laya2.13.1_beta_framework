/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class ComLiLian extends fgui.GComponent {

	public BtnGuanQia:fgui.GButton;
	public BtnFuBen:fgui.GButton;
	public BtnMiJing:fgui.GButton;
	public BtnBoss:fgui.GButton;
	public BtnCaiJi:fgui.GButton;
	public BtnGongLue:fgui.GButton;
	public BtnWaiYu:fgui.GButton;
	public ListLog:fgui.GList;
	public EffectShow:fgui.Transition;
	public static URL:string = "ui://vith2b66sbd01";

	public static createInstance():ComLiLian {
		return <ComLiLian>(fgui.UIPackage.createObject("PkgMain", "ComLiLian"));
	}

	protected onConstruct():void {
		this.BtnGuanQia = <fgui.GButton>(this.getChildAt(1));
		this.BtnFuBen = <fgui.GButton>(this.getChildAt(2));
		this.BtnMiJing = <fgui.GButton>(this.getChildAt(3));
		this.BtnBoss = <fgui.GButton>(this.getChildAt(4));
		this.BtnCaiJi = <fgui.GButton>(this.getChildAt(5));
		this.BtnGongLue = <fgui.GButton>(this.getChildAt(6));
		this.BtnWaiYu = <fgui.GButton>(this.getChildAt(7));
		this.ListLog = <fgui.GList>(this.getChildAt(8));
		this.EffectShow = this.getTransitionAt(0);
	}
}