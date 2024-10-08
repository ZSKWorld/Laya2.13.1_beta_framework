import { UserDataEvent } from "../../../../../userData/UserDataEvent";
import { BaseViewCtrl } from "../../../../core/BaseViewCtrl";
import { ComGoodsInfoMsg, ComGoodsInfoView } from "../../view/coms/ComGoodsInfoView";

export interface ComGoodsInfoData {
	id: number;
	buy?: boolean;
}

export class ComGoodsInfoCtrl extends BaseViewCtrl<ComGoodsInfoView, ComGoodsInfoData> {

	override onAdded() {
		this.addMessage(ComGoodsInfoMsg.OnBtnCollectClick, this.onBtnCollectClick);
		this.addMessage(ComGoodsInfoMsg.OnBtnUseClick, this.onBtnUseClick);
		this.addMessage(ComGoodsInfoMsg.OnBtnSellClick, this.onBtnSellClick);
		this.addMessage(ComGoodsInfoMsg.OnBtnBuyClick, this.onBtnBuyClick);
		this.addMessage(ComGoodsInfoMsg.OnNumInput, this.checkNumInput);
	}

	override onEnable() {
		this.refreshContent();
	}

	@RegisterEvent(UserDataEvent.User_Bag_Changed)
	refreshContent() {
		const { id, buy } = this.data;
		const haveCnt = buy ? 1 : userData.bag.getItemCount(id);
		this.view.setContent(id, buy);
		this.checkNumInput();
		haveCnt <= 0 && this.removeView(ViewID.UIGoodsInfoView);
	}

	private onBtnCollectClick() {
		const isCollect = userData.bag.isCollect(this.data.id);
		netService.changeCollect({ id: this.data.id, collect: !isCollect });
	}

	private onBtnUseClick() {
		const count = +this.view.input_num.text;
		netService.useItem({ id: this.data.id, count });
	}

	private onBtnSellClick() {
		const count = +this.view.input_num.text;
		netService.sellItem({ id: this.data.id, count });
	}

	private onBtnBuyClick() {
		const count = +this.view.input_num.text;
		netService.buyGoods({ id: this.data.id, count });
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