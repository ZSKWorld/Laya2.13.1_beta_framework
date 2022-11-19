/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class RenderChatMsg extends fgui.GComponent {

	public TxtMsg:fgui.GTextField;
	public static URL:string = "ui://vith2b66j0ry2d";

	public static createInstance():RenderChatMsg {
		return <RenderChatMsg>(fgui.UIPackage.createObject("PkgMain", "RenderChatMsg"));
	}

	protected override onConstruct():void {
		this.TxtMsg = <fgui.GTextField>(this.getChildAt(1));
	}
}