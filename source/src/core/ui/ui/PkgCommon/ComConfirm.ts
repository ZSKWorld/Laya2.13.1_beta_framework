/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { BtnTxtView } from "../../view/PkgCommon/view/btns/BtnTxtView";

export default class ComConfirm extends fgui.GComponent {

	public txt_title: fgui.GTextField;
	public txt_content: fgui.GRichTextField;
	public btn_cancel: BtnTxtView;
	public btn_confirm: BtnTxtView;
	public static URL: string = "ui://vx9zwsershjv6l";

	public static createInstance(): ComConfirm {
		return <ComConfirm>(fgui.UIPackage.createObject("PkgCommon", "ComConfirm"));
	}

	protected override onConstruct(): void {
		this.txt_title = <fgui.GTextField>(this.getChildAt(2));
		this.txt_content = <fgui.GRichTextField>(this.getChildAt(3));
		this.btn_cancel = <BtnTxtView>(this.getChildAt(4));
		this.btn_confirm = <BtnTxtView>(this.getChildAt(5));
	}
}