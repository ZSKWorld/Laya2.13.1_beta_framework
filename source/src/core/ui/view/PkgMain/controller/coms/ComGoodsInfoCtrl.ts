import { BagService, ShopService } from "../../../../../net/Services";
import { UserDataEvent } from "../../../../../userData/UserDataEvent";
import { BaseViewCtrl } from "../../../../core/BaseViewCtrl";
import { ComGoodsInfoMsg, ComGoodsInfoView } from "../../view/coms/ComGoodsInfoView";

export interface ComGoodsInfoData {
	id: number;
	buy?: boolean;
}

export class ComGoodsInfoCtrl extends BaseViewCtrl<ComGoodsInfoView, ComGoodsInfoData>{

	override onAdded() {
		this.addMessage(ComGoodsInfoMsg.OnBtnCollectClick, this.onBtnCollectClick);
		this.addMessage(ComGoodsInfoMsg.OnBtnUseClick, this.onBtnUseClick);
		this.addMessage(ComGoodsInfoMsg.OnBtnSellClick, this.onBtnSellClick);
		this.addMessage(ComGoodsInfoMsg.OnBtnBuyClick, this.onBtnBuyClick);
		this.addMessage(ComGoodsInfoMsg.OnNumInput, this.checkNumInput);
	}

	override onEnable() {
		this.refreshContent();
		this.checkNumInput();
	}

	@RegisterEvent(UserDataEvent.UserData_Bag_Changed)
	refreshContent() {
		this.view.setContent(this.data.id, this.data.buy);
	}

	private onBtnCollectClick() {
		const isCollect = userData.bag.isCollect(this.data.id);
		BagService.Inst.changeCollect({ id: this.data.id, collect: !isCollect });
	}

	private onBtnUseClick() {
		const count = +this.view.input_num.text;
		BagService.Inst.useItem({ id: this.data.id, count });
	}

	private onBtnSellClick() {
		const count = +this.view.input_num.text;
		BagService.Inst.sellItem({ id: this.data.id, count });
	}

	private onBtnBuyClick() {
		const count = +this.view.input_num.text;
		ShopService.Inst.buyGoods({ id: this.data.id, count });
	}

	private checkNumInput() {
		const text = this.view.input_num.text;
		let haveCnt = Number.MAX_SAFE_INTEGER;
		let num = Math.min(Math.abs(+text || 1), haveCnt);
		if (!this.data.buy) {
			haveCnt = userData.bag.getItemCount(this.data.id);
			num = Math.min(num, haveCnt);
		}
		this.view.setNumText(num);
	}

}