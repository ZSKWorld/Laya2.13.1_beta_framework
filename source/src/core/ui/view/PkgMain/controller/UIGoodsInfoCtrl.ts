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
		return UIUtil.animAlphaIn(this.view.graph_bg, this.view.com_panel);
	}

	override onCloseAni() {
		return UIUtil.animAlphaOut(this.view.graph_bg, this.view.com_panel);
	}

}