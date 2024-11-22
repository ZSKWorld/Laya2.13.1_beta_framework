/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { BtnTxtView } from "../../view/PkgCommon/view/btns/BtnTxtView";

export default class UILogin extends fgui.GComponent {

	public ctrlState: fgui.Controller;
	public btn_login: BtnTxtView;
	public btn_loginRegister: BtnTxtView;
	public input_account: fgui.GTextInput;
	public input_password: fgui.GTextInput;
	public btn_registerBack: BtnTxtView;
	public btn_register: BtnTxtView;
	public input_rAccount: fgui.GTextInput;
	public input_rPassword: fgui.GTextInput;
	public input_rName: fgui.GTextInput;
	public btn_cancel: BtnTxtView;
	public t0: fgui.Transition;
	public t1: fgui.Transition;
	public static url: string = "ui://vs9845atqjdo0";

	public static createInstance(): UILogin {
		return <UILogin>(fgui.UIPackage.createObject("PkgLogin", "UILogin"));
	}

	protected override onConstruct(): void {
		this.ctrlState = this.getControllerAt(0);
		this.btn_login = <BtnTxtView>(this.getChildAt(4));
		this.btn_loginRegister = <BtnTxtView>(this.getChildAt(5));
		this.input_account = <fgui.GTextInput>(this.getChildAt(6));
		this.input_password = <fgui.GTextInput>(this.getChildAt(7));
		this.btn_registerBack = <BtnTxtView>(this.getChildAt(14));
		this.btn_register = <BtnTxtView>(this.getChildAt(15));
		this.input_rAccount = <fgui.GTextInput>(this.getChildAt(16));
		this.input_rPassword = <fgui.GTextInput>(this.getChildAt(17));
		this.input_rName = <fgui.GTextInput>(this.getChildAt(18));
		this.btn_cancel = <BtnTxtView>(this.getChildAt(23));
		this.t0 = this.getTransitionAt(0);
		this.t1 = this.getTransitionAt(1);
	}
}