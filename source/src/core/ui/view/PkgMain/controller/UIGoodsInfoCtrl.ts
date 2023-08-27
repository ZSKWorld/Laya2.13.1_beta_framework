import { ItemHandleService, ShopService } from "../../../../net/Services";
import { UserDataEvent } from "../../../../userData/UserDataEvent";
import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { UIGoodsInfoMsg, UIGoodsInfoView } from "../view/UIGoodsInfoView";

export interface UIGoodsInfoData {
	id: number;
	buy?: boolean;
}

export class UIGoodsInfoCtrl extends BaseViewCtrl<UIGoodsInfoView, UIGoodsInfoData>{

	override onAdded() {
		this.addMessage(UIGoodsInfoMsg.OnBtnCollectClick, this.onBtnCollectClick);
		this.addMessage(UIGoodsInfoMsg.OnBtnSellClick, this.onBtnSellClick);
		this.addMessage(UIGoodsInfoMsg.OnBtnUseClick, this.onBtnUseClick);
		this.addMessage(UIGoodsInfoMsg.OnBtnBuyClick, this.onBtnBuyClick);
		this.addMessage(UIGoodsInfoMsg.OnNumInput, this.onNumInput);
	}

	override onEnable() {
		this.refreshContent();
	}

	@RegisterEvent(UserDataEvent.UserData_Bag_Changed)
	refreshContent() {
		this.view.setContent(this.data.id, this.data.buy);
	}

	private onBtnCollectClick() {
		const isCollect = userData.bag.isCollect(this.data.id);
		ItemHandleService.Inst.changeCollect({ id: this.data.id, collect: !isCollect });
	}

	private onBtnSellClick(): void {
		const count = +this.view.txt_userNum.text;
		ItemHandleService.Inst.sellItem({ id: this.data.id, count });
	}

	private onBtnUseClick(): void {
		const count = +this.view.txt_userNum.text;
		ItemHandleService.Inst.useItem({ id: this.data.id, count });
	}

	private onBtnBuyClick(): void {
		const count = +this.view.txt_userNum.text;
		ShopService.Inst.buyGoods({ id: this.data.id, count });
	}

	private onNumInput() {
		const text = this.view.txt_userNum.text;
		const textNum = +text;
		if (Number.isNaN(textNum))
			this.view.setNumText(+text.substring(0, text.length - 1) || 1);
		else if (Number.isSafeInteger(textNum) == false)
			this.view.setNumText(Number.MAX_SAFE_INTEGER);
		else if (textNum < 0)
			this.view.setNumText(Math.abs(textNum));
		else
			this.view.setNumText(Math.max(textNum, 1));
	}

}