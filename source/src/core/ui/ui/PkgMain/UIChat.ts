/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UIChat extends fgui.GComponent {

	public ListMsg:fgui.GList;
	public InputMsg:fgui.GTextInput;
	public BtnSend:fgui.GButton;
	public BtnBack:fgui.GButton;
	public static URL:string = "ui://vith2b66o7722c";

	public static createInstance():UIChat {
		return <UIChat>(fgui.UIPackage.createObject("PkgMain", "UIChat"));
	}

	protected override onConstruct():void {
		this.ListMsg = <fgui.GList>(this.getChildAt(1));
		this.InputMsg = <fgui.GTextInput>(this.getChildAt(2));
		this.BtnSend = <fgui.GButton>(this.getChildAt(3));
		this.BtnBack = <fgui.GButton>(this.getChildAt(4));
	}
}