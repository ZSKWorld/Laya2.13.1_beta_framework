import { ItemBagType } from "../../../../../userData/const/ItemEnum";
import { UserDataEvent } from "../../../../../userData/UserDataEvent";
import { BaseViewCtrl } from "../../../../core/BaseViewCtrl";
import { UIUtil } from "../../../../tool/UIUtil";
import { ComGoodsMsg, ComGoodsView } from "../../view/coms/ComGoodsView";
import { RenderGoodsView } from "../../view/renders/RenderGoodsView";
import { RenderGoodsCtrl } from "../renders/RenderGoodsCtrl";
import { UIEquipmentInfoData } from "../UIEquipmentInfoCtrl";
import { UIGoodsInfoData } from "../UIGoodsInfoCtrl";

export interface ComGoodsData {

}

export class ComGoodsCtrl extends BaseViewCtrl<ComGoodsView, ComGoodsData> {
	private items: (IGoods | IEquipment)[];
	private showType: ItemBagType = ItemBagType.Collect;

	override onAdded() {
		this.addMessage(ComGoodsMsg.OnBtnShouCangClick, this.refreshListByType, [ItemBagType.Collect]);
		this.addMessage(ComGoodsMsg.OnBtnEquipClick, this.refreshListByType, [ItemBagType.Equip]);
		this.addMessage(ComGoodsMsg.OnBtnPropClick, this.refreshListByType, [ItemBagType.Prop]);
		this.addMessage(ComGoodsMsg.OnBtnGemClick, this.refreshListByType, [ItemBagType.Gem]);
		this.addMessage(ComGoodsMsg.OnBtnMaterialClick, this.refreshListByType, [ItemBagType.Material]);
		this.addMessage(ComGoodsMsg.OnBtnBookClick, this.refreshListByType, [ItemBagType.Book]);
		this.addMessage(ComGoodsMsg.OnBtnOtherClick, this.refreshListByType, [ItemBagType.Other]);

		UIUtil.setList(this.view.list_item, true, this, this.onListRenderer, this.onListClick);
	}

	override onEnable() {
		this.refreshListByType(this.showType);
	}

	@RegisterEvent(UserDataEvent.User_Bag_Changed)
	private refreshListByType(type: ItemBagType) {
		this.showType = type ?? this.showType;
		this.items = userData.bag.getItems(this.showType);
		this.items.sort((a, b) => a.quality - b.quality);
		this.view.list_item.numItems = this.items.length;
	}

	private onListRenderer(index: number, item: RenderGoodsView) {
		(<RenderGoodsCtrl>item.viewCtrl).refreshGoods(this.items[index], this.showType == ItemBagType.Equip);
	}

	private onListClick(item: any) {
		const list = this.view.list_item;
		const index = list.childIndexToItemIndex(list.getChildIndex(item));
		const data = this.items[index];
		if (this.showType == ItemBagType.Equip) {
			let equip1 = <IEquipment>data;
			let equip2 = <IEquipment>userData.body.getDressedEquip(equip1.part);
			this.showView<UIEquipmentInfoData>(ViewID.UIEquipmentInfoView, { equip1, equip2, fromBag: true });
		} else {
			this.showView<UIGoodsInfoData>(ViewID.UIGoodsInfoView, { id: data.id, buy: false });
		}
	}

}