/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import BtnCornerTxt from "./BtnCornerTxt";

export default class UITipConfirm extends fgui.GComponent {

	public BtnBg:fgui.GGraph;
	public BtnConfirm:BtnCornerTxt;
	public TxtContent:fgui.GRichTextField;
	public TxtTitle:fgui.GTextField;
	public EffectShow:fgui.Transition;
	public static URL:string = "ui://vx9zwsersbd05j";

	public static createInstance():UITipConfirm {
		return <UITipConfirm>(fgui.UIPackage.createObject("PkgCommon", "UITipConfirm"));
	}

	protected onConstruct():void {
		this.BtnBg = <fgui.GGraph>(this.getChildAt(0));
		this.BtnConfirm = <BtnCornerTxt>(this.getChildAt(4));
		this.TxtContent = <fgui.GRichTextField>(this.getChildAt(5));
		this.TxtTitle = <fgui.GTextField>(this.getChildAt(6));
		this.EffectShow = this.getTransitionAt(0);
	}
}