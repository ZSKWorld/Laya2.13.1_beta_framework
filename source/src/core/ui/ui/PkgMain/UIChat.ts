/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { BtnTxtView } from "../../view/PkgCommon/view/btns/BtnTxtView";

export default class UIChat extends fgui.GComponent {

	public state: fgui.Controller;
	public list_msg: fgui.GList;
	public list_friend: fgui.GList;
	public input_msg: fgui.GTextInput;
	public btn_send: BtnTxtView;
	public btn_back: fgui.GButton;
	public static url: string = "ui://vith2b66o7722c";

	public static createInstance(): UIChat {
		return <UIChat>(fgui.UIPackage.createObject("PkgMain", "UIChat"));
	}

	protected override onConstruct(): void {
		this.state = this.getControllerAt(0);
		this.list_msg = <fgui.GList>(this.getChildAt(1));
		this.list_friend = <fgui.GList>(this.getChildAt(2));
		this.input_msg = <fgui.GTextInput>(this.getChildAt(3));
		this.btn_send = <BtnTxtView>(this.getChildAt(4));
		this.btn_back = <fgui.GButton>(this.getChildAt(5));
	}
}