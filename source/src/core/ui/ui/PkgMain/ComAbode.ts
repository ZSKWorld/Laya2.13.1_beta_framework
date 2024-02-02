/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ComZhiZuoView } from "../../view/PkgMain/view/coms/ComZhiZuoView";
import { BtnTxtView } from "../../view/PkgCommon/view/btns/BtnTxtView";

export default class ComAbode extends fgui.GComponent {

	public c1: fgui.Controller;
	public btn_create: BtnTxtView;
	public btn_about: BtnTxtView;
	public btn_setting: BtnTxtView;
	public btn_meet: BtnTxtView;
	public btn_pet: BtnTxtView;
	public btn_repair: BtnTxtView;
	public com_zhiZuo: ComZhiZuoView;
	public static URL: string = "ui://vith2b66sbd05";

	public static createInstance(): ComAbode {
		return <ComAbode>(fgui.UIPackage.createObject("PkgMain", "ComAbode"));
	}

	protected override onConstruct(): void {
		this.c1 = this.getControllerAt(0);
		this.btn_create = <BtnTxtView>(this.getChildAt(0));
		this.btn_about = <BtnTxtView>(this.getChildAt(1));
		this.btn_setting = <BtnTxtView>(this.getChildAt(2));
		this.btn_meet = <BtnTxtView>(this.getChildAt(3));
		this.btn_pet = <BtnTxtView>(this.getChildAt(4));
		this.btn_repair = <BtnTxtView>(this.getChildAt(5));
		this.com_zhiZuo = <ComZhiZuoView>(this.getChildAt(7));
	}
}