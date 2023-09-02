import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
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
		return new Promise<void>(resolve => this.view.trans_show.play(Laya.Handler.create(null, resolve)));
	}

	override onCloseAni() {
		return new Promise<void>(resolve => this.view.trans_close.play(Laya.Handler.create(null, resolve)));
	}

}