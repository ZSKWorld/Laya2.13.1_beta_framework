/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UILogin extends fgui.GComponent {

	public ctrlState:fgui.Controller;
	public btn_login:fgui.GButton;
	public btn_loginRegister:fgui.GButton;
	public input_account:fgui.GTextInput;
	public input_password:fgui.GTextInput;
	public btn_registerBack:fgui.GButton;
	public btn_register:fgui.GButton;
	public input_rAccount:fgui.GTextInput;
	public input_rPassword:fgui.GTextInput;
	public input_rName:fgui.GTextInput;
	public t0:fgui.Transition;
	public static URL:string = "ui://vs9845atqjdo0";

	public static createInstance():UILogin {
		return <UILogin>(fgui.UIPackage.createObject("PkgLogin", "UILogin"));
	}

	protected override onConstruct():void {
		this.ctrlState = this.getControllerAt(0);
		this.btn_login = <fgui.GButton>(this.getChildAt(3));
		this.btn_loginRegister = <fgui.GButton>(this.getChildAt(4));
		this.input_account = <fgui.GTextInput>(this.getChildAt(5));
		this.input_password = <fgui.GTextInput>(this.getChildAt(6));
		this.btn_registerBack = <fgui.GButton>(this.getChildAt(14));
		this.btn_register = <fgui.GButton>(this.getChildAt(15));
		this.input_rAccount = <fgui.GTextInput>(this.getChildAt(16));
		this.input_rPassword = <fgui.GTextInput>(this.getChildAt(17));
		this.input_rName = <fgui.GTextInput>(this.getChildAt(18));
		this.t0 = this.getTransitionAt(0);
	}
}