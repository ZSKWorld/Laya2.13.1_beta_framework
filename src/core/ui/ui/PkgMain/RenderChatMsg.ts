/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class RenderChatMsg extends fgui.GComponent {

	public ctrlAlign:fgui.Controller;
	public TxtMsg:fgui.GTextField;
	public static URL:string = "ui://vith2b66j0ry2d";

	public static createInstance():RenderChatMsg {
		return <RenderChatMsg>(fgui.UIPackage.createObject("PkgMain", "RenderChatMsg"));
	}

	protected onConstruct():void {
		this.ctrlAlign = this.getControllerAt(0);
		this.TxtMsg = <fgui.GTextField>(this.getChildAt(1));
	}
}