import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { UIUtil } from "../../../tool/UIUtil";
import { UIGoodsInfoView } from "../view/UIGoodsInfoView";
import { ComGoodsInfoCtrl } from "./coms/ComGoodsInfoCtrl";

export interface UIGoodsInfoData {
	id: number;
	buy?: boolean;
}

export class UIGoodsInfoCtrl extends BaseViewCtrl<UIGoodsInfoView, UIGoodsInfoData> {
	private _panelCtrl: ComGoodsInfoCtrl;

	override onAdded() {
		this._panelCtrl = this.view.com_panel.getComponent(ComGoodsInfoCtrl);
	}

	override onEnable() {
		this._panelCtrl.data = this.data;
	}

	refreshContent() {
		this._panelCtrl.refreshContent();
	}

	override onOpenAni() {
		const { graph_bg, com_panel } = this.view;
		return UIUtil.animAlphaIn(graph_bg, com_panel);
	}

	override onCloseAni() {
		const { graph_bg, com_panel } = this.view;
		return UIUtil.animAlphaOut(graph_bg, com_panel);
	}

}