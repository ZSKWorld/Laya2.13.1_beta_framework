/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import ComGoodsInfo from "./ComGoodsInfo";

export default class UIGoodsInfo extends fgui.GComponent {

	public ctrlState:fgui.Controller;
	public graph_bg:fgui.GGraph;
	public com_panel:ComGoodsInfo;
	public trans_show:fgui.Transition;
	public trans_close:fgui.Transition;
	public static URL:string = "ui://vith2b66irlv1e";

	public static createInstance():UIGoodsInfo {
		return <UIGoodsInfo>(fgui.UIPackage.createObject("PkgMain", "UIGoodsInfo"));
	}

	protected override onConstruct():void {
		this.ctrlState = this.getControllerAt(0);
		this.graph_bg = <fgui.GGraph>(this.getChildAt(0));
		this.com_panel = <ComGoodsInfo>(this.getChildAt(1));
		this.trans_show = this.getTransitionAt(0);
		this.trans_close = this.getTransitionAt(1);
	}
}