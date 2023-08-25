/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import BtnCornerTxt from "./BtnCornerTxt";

export default class UITipConfirm extends fgui.GComponent {

	public graph_bg:fgui.GGraph;
	public btn_confirm:BtnCornerTxt;
	public txt_content:fgui.GRichTextField;
	public txt_title:fgui.GTextField;
	public EffectShow:fgui.Transition;
	public static URL:string = "ui://vx9zwsersbd05j";

	public static createInstance():UITipConfirm {
		return <UITipConfirm>(fgui.UIPackage.createObject("PkgCommon", "UITipConfirm"));
	}

	protected override onConstruct():void {
		this.graph_bg = <fgui.GGraph>(this.getChildAt(0));
		this.btn_confirm = <BtnCornerTxt>(this.getChildAt(4));
		this.txt_content = <fgui.GRichTextField>(this.getChildAt(5));
		this.txt_title = <fgui.GTextField>(this.getChildAt(6));
		this.EffectShow = this.getTransitionAt(0);
	}
}