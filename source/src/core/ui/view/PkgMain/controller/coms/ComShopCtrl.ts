import { BaseViewCtrl } from "../../../../core/BaseViewCtrl";
import { ViewID } from "../../../../core/ViewID";
import { UIUtility } from "../../../../tool/UIUtility";
import { ComShopMsg, ComShopView } from "../../view/coms/ComShopView";
import { RenderBagView } from "../../view/renders/RenderBagView";
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

export class ComShopCtrl extends BaseViewCtrl<ComShopView, ComShopData>{
	private showType: SellType = SellType.Prop;
	private showFilter: (...args: any) => boolean;
	private items: CfgShopData[];

	override onAdded() {
		this.addMessage(ComShopMsg.OnBtnPropClick, this.refreshListByType, [ SellType.Prop ]);
		this.addMessage(ComShopMsg.OnBtnGemClick, this.refreshListByType, [ SellType.Gem ]);
		this.addMessage(ComShopMsg.OnBtnMaterialClick, this.refreshListByType, [ SellType.Material ]);
		this.addMessage(ComShopMsg.OnBtnMiJiClick, this.refreshListByType, [ SellType.MiJi ]);
		this.addMessage(ComShopMsg.OnBtnOtherClick, this.refreshListByType, [ SellType.Other ]);
		this.addMessage(ComShopMsg.OnBtnHeiShiClick, this.refreshListByType, [ SellType.HeiShi ]);
		this.addMessage(ComShopMsg.OnBtnXianJieClick, this.refreshListByType, [ SellType.XianJie ]);

		this.addMessage(ComShopMsg.OnBtnZbqhClick, this.onBtnZbqhClick);
		this.addMessage(ComShopMsg.OnBtnBsjgClick, this.onBtnBsjgClick);
		this.addMessage(ComShopMsg.OnBtnJsClick, this.onBtnJsClick);
		this.addMessage(ComShopMsg.OnBtnTsdjClick, this.onBtnTsdjClick);
		this.addMessage(ComShopMsg.OnBtnGemLv1Click, this.onBtnGemLv1Click);
		this.addMessage(ComShopMsg.OnBtnGemLv2Click, this.onBtnGemLv2Click);
		this.addMessage(ComShopMsg.OnBtnGemLv3Click, this.onBtnGemLv3Click);
		this.addMessage(ComShopMsg.OnBtnGemLv4Click, this.onBtnGemLv4Click);
		this.addMessage(ComShopMsg.OnBtnSgclClick, this.onBtnSgclClick);
		this.addMessage(ComShopMsg.OnBtnTsclClick, this.onBtnTsclClick);
		this.addMessage(ComShopMsg.OnBtnZwClick, this.onBtnZwClick);
		this.addMessage(ComShopMsg.OnBtnQhclClick, this.onBtnQhclClick);
		this.addMessage(ComShopMsg.OnBtnTjClick, this.onBtnTjClick);
		this.addMessage(ComShopMsg.OnBtnXfClick, this.onBtnXfClick);
		this.addMessage(ComShopMsg.OnBtnJnClick, this.onBtnJnClick);
		this.addMessage(ComShopMsg.OnBtnQtClick, this.onBtnQtClick);
		this.addMessage(ComShopMsg.OnBtnYrClick, this.onBtnYrClick);

		UIUtility.SetList(this.view.list_item, true, this, this.onListRenderer, this.onListClick);
	}

	override onEnable() {
		this.refreshListByType(this.showType, this.showFilter);
	}

	private refreshListByType(type: SellType, filter: (...args: any) => boolean): void {
		this.showFilter = filter;
		const shop = cfgMgr.Shop;
		this.items = Object.keys(shop).filter((v) => shop[ v ].sellType == type).map((v) => shop[ v ]);
		this.view.list_item.numItems = this.items.length;
		this.showType = type;
	}
	private onListRenderer(index: number, item: RenderBagView) {
		item.refreshShop(this.items[ index ].sellID);
	}
	private onListClick(item: RenderBagView) {
		const list = this.view.list_item;
		const index = list.childIndexToItemIndex(list.getChildIndex(item));
		this.showView<UIGoodsInfoData>(ViewID.UIGoodsInfoView, { id: this.items[ index ].id, buy: true });
	}

	private onBtnPropClick() {

	}

	private onBtnGemClick() {

	}

	private onBtnMaterialClick() {

	}

	private onBtnMiJiClick() {

	}

	private onBtnOtherClick() {

	}

	private onBtnHeiShiClick() {

	}

	private onBtnXianJieClick() {

	}

	private onBtnZbqhClick() {

	}

	private onBtnBsjgClick() {

	}

	private onBtnJsClick() {

	}

	private onBtnTsdjClick() {

	}

	private onBtnGemLv1Click() {

	}

	private onBtnGemLv2Click() {

	}

	private onBtnGemLv3Click() {

	}

	private onBtnGemLv4Click() {

	}

	private onBtnSgclClick() {

	}

	private onBtnTsclClick() {

	}

	private onBtnZwClick() {

	}

	private onBtnQhclClick() {

	}

	private onBtnTjClick() {

	}

	private onBtnXfClick() {

	}

	private onBtnJnClick() {

	}

	private onBtnQtClick() {

	}

	private onBtnYrClick() {

	}

}