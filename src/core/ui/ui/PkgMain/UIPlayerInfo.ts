/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UIPlayerInfo extends fgui.GComponent {

	public TxtInfo1:fgui.GRichTextField;
	public TxtInfo2:fgui.GRichTextField;
	public CmbTitle:fgui.GComboBox;
	public BtnExplain:fgui.GButton;
	public BtnBack:fgui.GButton;
	public BtnCopyID:fgui.GButton;
	public BtnGift:fgui.GButton;
	public static URL:string = "ui://vith2b66sbd010";

	public static createInstance():UIPlayerInfo {
		return <UIPlayerInfo>(fgui.UIPackage.createObject("PkgMain", "UIPlayerInfo"));
	}

	protected onConstruct():void {
		this.TxtInfo1 = <fgui.GRichTextField>(this.getChildAt(3));
		this.TxtInfo2 = <fgui.GRichTextField>(this.getChildAt(4));
		this.CmbTitle = <fgui.GComboBox>(this.getChildAt(5));
		this.BtnExplain = <fgui.GButton>(this.getChildAt(6));
		this.BtnBack = <fgui.GButton>(this.getChildAt(7));
		this.BtnCopyID = <fgui.GButton>(this.getChildAt(8));
		this.BtnGift = <fgui.GButton>(this.getChildAt(9));
	}
}