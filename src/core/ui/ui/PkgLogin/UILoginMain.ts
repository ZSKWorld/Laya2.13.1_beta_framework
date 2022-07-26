/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UILoginMain extends fgui.GComponent {

	public ctrlState:fgui.Controller;
	public BtnLogin:fgui.GButton;
	public BtnLoginRegister:fgui.GButton;
	public TxtAccount:fgui.GTextInput;
	public TxtPassword:fgui.GTextInput;
	public BtnRegisterBack:fgui.GButton;
	public BtnRegister:fgui.GButton;
	public TxtRegisterAccount:fgui.GTextInput;
	public TxtRegisterPassword:fgui.GTextInput;
	public TxtRegisterName:fgui.GTextInput;
	public t0:fgui.Transition;
	public static URL:string = "ui://vs9845atqjdo0";

	public static createInstance():UILoginMain {
		return <UILoginMain>(fgui.UIPackage.createObject("PkgLogin", "UILoginMain"));
	}

	protected onConstruct():void {
		this.ctrlState = this.getControllerAt(0);
		this.BtnLogin = <fgui.GButton>(this.getChildAt(3));
		this.BtnLoginRegister = <fgui.GButton>(this.getChildAt(4));
		this.TxtAccount = <fgui.GTextInput>(this.getChildAt(5));
		this.TxtPassword = <fgui.GTextInput>(this.getChildAt(6));
		this.BtnRegisterBack = <fgui.GButton>(this.getChildAt(14));
		this.BtnRegister = <fgui.GButton>(this.getChildAt(15));
		this.TxtRegisterAccount = <fgui.GTextInput>(this.getChildAt(16));
		this.TxtRegisterPassword = <fgui.GTextInput>(this.getChildAt(17));
		this.TxtRegisterName = <fgui.GTextInput>(this.getChildAt(18));
		this.t0 = this.getTransitionAt(0);
	}
}