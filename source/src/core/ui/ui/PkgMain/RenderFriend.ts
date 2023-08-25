/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class RenderFriend extends fgui.GComponent {

	public state:fgui.Controller;
	public txt_nickname:fgui.GTextField;
	public txt_account:fgui.GTextField;
	public txt_state:fgui.GTextField;
	public btn_chat:fgui.GButton;
	public static URL:string = "ui://vith2b66roh22e";

	public static createInstance():RenderFriend {
		return <RenderFriend>(fgui.UIPackage.createObject("PkgMain", "RenderFriend"));
	}

	protected override onConstruct():void {
		this.state = this.getControllerAt(0);
		this.txt_nickname = <fgui.GTextField>(this.getChildAt(2));
		this.txt_account = <fgui.GTextField>(this.getChildAt(4));
		this.txt_state = <fgui.GTextField>(this.getChildAt(5));
		this.btn_chat = <fgui.GButton>(this.getChildAt(6));
	}
}