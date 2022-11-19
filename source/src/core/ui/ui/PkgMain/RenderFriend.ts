/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class RenderFriend extends fgui.GComponent {

	public state:fgui.Controller;
	public TxtNickname:fgui.GTextField;
	public TxtAccount:fgui.GTextField;
	public TxtState:fgui.GTextField;
	public BtnChat:fgui.GButton;
	public static URL:string = "ui://vith2b66roh22e";

	public static createInstance():RenderFriend {
		return <RenderFriend>(fgui.UIPackage.createObject("PkgMain", "RenderFriend"));
	}

	protected override onConstruct():void {
		this.state = this.getControllerAt(0);
		this.TxtNickname = <fgui.GTextField>(this.getChildAt(2));
		this.TxtAccount = <fgui.GTextField>(this.getChildAt(4));
		this.TxtState = <fgui.GTextField>(this.getChildAt(5));
		this.BtnChat = <fgui.GButton>(this.getChildAt(6));
	}
}