import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { UIUtility } from "../../../tool/UIUtility";
import { UIGoodsInfoView } from "../view/UIGoodsInfoView";
import { ComGoodsInfoCtrl } from "./coms/ComGoodsInfoCtrl";

export interface UIGoodsInfoData {
	id: number;
	buy?: boolean;
}

export class UIGoodsInfoCtrl extends BaseViewCtrl<UIGoodsInfoView, UIGoodsInfoData>{
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
		return UIUtility.AnimAlphaIn(graph_bg, com_panel);
	}

	override onCloseAni() {
		const { graph_bg, com_panel } = this.view;
		return UIUtility.AnimAlphaOut(graph_bg, com_panel);
	}

}