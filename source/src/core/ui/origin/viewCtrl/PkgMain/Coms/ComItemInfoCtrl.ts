import { ItemHandleService, ShopService } from "../../../../net/Services";
import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { ComItemInfoMsg, ComItemInfoView } from "../../../view/PkgMain/Coms/ComItemInfoView";

export interface ComItemInfoData {
	id: number;
	buy?: boolean;
}

export class ComItemInfoCtrl extends BaseViewCtrl<ComItemInfoView, ComItemInfoData>{

	override onAwake(): void {
		this.addMessage(ComItemInfoMsg.OnBtnBgClick, this.removeSelf);
		this.addMessage(ComItemInfoMsg.OnBtnShouCangClick, this.onBtnShouCangClick);
		this.addMessage(ComItemInfoMsg.OnBtnSellClick, this.onBtnSellClick);
		this.addMessage(ComItemInfoMsg.OnBtnUseClick, this.onBtnUseClick);
		this.addMessage(ComItemInfoMsg.OnBtnBuyClick, this.onBtnBuyClick);
		this.addMessage(ComItemInfoMsg.OnNumInput, this.OnNumInput);
	}

	override onEnable(): void {
		this.refreshContent();
	}

	override onDisable(): void {

	}

	override onDestroy(): void {

	}

	refreshContent() {
		this.view.setContent(this.data.id, this.data.buy);
	}

	private onBtnShouCangClick(): void {
		const isCollect = this.userData.isCollect(this.data.id);
		ItemHandleService.Inst.changeCollect({ id: this.data.id, collect: !isCollect });
	}

	private onBtnSellClick(): void {
		const count = +this.view.TxtUseNum.text;
		ItemHandleService.Inst.sellItem({ id: this.data.id, count });
	}

	private onBtnUseClick(): void {
		const count = +this.view.TxtUseNum.text;
		ItemHandleService.Inst.useItem({ id: this.data.id, count });
	}

	private onBtnBuyClick(): void {
		const count = +this.view.TxtUseNum.text;
		ShopService.Inst.buyGoods({ id: this.data.id, count });
	}

	private OnNumInput() {
		const text = this.view.TxtUseNum.text;
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