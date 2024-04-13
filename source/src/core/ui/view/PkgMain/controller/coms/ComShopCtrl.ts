import { BaseViewCtrl } from "../../../../core/BaseViewCtrl";
import { ViewID } from "../../../../core/ViewID";
import { UIUtil } from "../../../../tool/UIUtil";
import { ComShopMsg, ComShopView } from "../../view/coms/ComShopView";
import { RenderGoodsView } from "../../view/renders/RenderGoodsView";
import { UIGoodsInfoData } from "../UIGoodsInfoCtrl";
export const enum SellType {
	Prop = 1,
	Gem,
	Material,
	MiJi,
	Other,
	HeiShi,
	XianJie,
}

export interface ComShopData {

}

export class ComShopCtrl extends BaseViewCtrl<ComShopView, ComShopData> {
	private showType: SellType = SellType.Prop;
	private items: CfgShopData[];

	override onAdded() {
		this.addMessage(ComShopMsg.OnBtnPropClick, this.refreshListByType, [SellType.Prop]);
		this.addMessage(ComShopMsg.OnBtnGemClick, this.refreshListByType, [SellType.Gem]);
		this.addMessage(ComShopMsg.OnBtnMaterialClick, this.refreshListByType, [SellType.Material]);
		this.addMessage(ComShopMsg.OnBtnMiJiClick, this.refreshListByType, [SellType.MiJi]);
		this.addMessage(ComShopMsg.OnBtnOtherClick, this.refreshListByType, [SellType.Other]);
		this.addMessage(ComShopMsg.OnBtnHeiShiClick, this.refreshListByType, [SellType.HeiShi]);
		this.addMessage(ComShopMsg.OnBtnXianJieClick, this.refreshListByType, [SellType.XianJie]);

		UIUtil.SetList(this.view.list_item, true, this, this.onListRenderer, this.onListClick);
	}

	override onEnable() {
		this.refreshListByType(this.showType);
	}

	private refreshListByType(type: SellType): void {
		this.showType = type;
		this.items = cfgMgr.Shop.filter(v => v.sellType == type);
		this.items.sort((a, b) => cfgMgr.Item[a.sellID].quality - cfgMgr.Item[b.sellID].quality);
		this.view.list_item.numItems = this.items.length;
	}
	private onListRenderer(index: number, item: RenderGoodsView) {
		item.refreshShop(this.items[index].sellID);
	}
	private onListClick(item: RenderGoodsView) {
		const list = this.view.list_item;
		const index = list.childIndexToItemIndex(list.getChildIndex(item));
		this.showView<UIGoodsInfoData>(ViewID.UIGoodsInfoView, { id: this.items[index].id, buy: true });
	}

}