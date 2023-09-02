import { ItemBagType } from "../../../../../net/enum/ItemEnum";
import { UserDataEvent } from "../../../../../userData/UserDataEvent";
import { BaseViewCtrl } from "../../../../core/BaseViewCtrl";
import { ViewID } from "../../../../core/ViewID";
import { UIUtility } from "../../../../tool/UIUtility";
import { ComGoodsMsg, ComGoodsView } from "../../view/coms/ComGoodsView";
import { RenderBagView } from "../../view/renders/RenderBagView";
import { UIEquipmentInfoData } from "../UIEquipmentInfoCtrl";
import { UIGoodsInfoData } from "../UIGoodsInfoCtrl";

export interface ComGoodsData {

}

export class ComGoodsCtrl extends BaseViewCtrl<ComGoodsView, ComGoodsData>{
	private items: (IGoods | IEquipment)[];
	private showType: ItemBagType = ItemBagType.Collect;

	override onAdded() {
		this.addMessage(ComGoodsMsg.OnBtnShouCangClick, this.refreshListByType, [ ItemBagType.Collect ]);
		this.addMessage(ComGoodsMsg.OnBtnEquipClick, this.refreshListByType, [ ItemBagType.Equip ]);
		this.addMessage(ComGoodsMsg.OnBtnPropClick, this.refreshListByType, [ ItemBagType.Prop ]);
		this.addMessage(ComGoodsMsg.OnBtnGemClick, this.refreshListByType, [ ItemBagType.Gem ]);
		this.addMessage(ComGoodsMsg.OnBtnMaterialClick, this.refreshListByType, [ ItemBagType.Material ]);
		this.addMessage(ComGoodsMsg.OnBtnBookClick, this.refreshListByType, [ ItemBagType.Book ]);
		this.addMessage(ComGoodsMsg.OnBtnOtherClick, this.refreshListByType, [ ItemBagType.Other ]);

		UIUtility.SetList(this.view.list_item, true, this, this.onListRenderer, this.onListClick);
	}

	override onEnable(): void {
		this.refreshListByType(this.showType);
	}

	@RegisterEvent(UserDataEvent.UserData_Bag_Changed)
	private refreshListByType(type: ItemBagType) {
		this.showType = type ?? this.showType;
		this.items = userData.bag.getItems(this.showType);
		this.items.sort((a, b) => a.quality - b.quality);
		this.view.list_item.numItems = this.items.length;
	}

	private onListRenderer(index: number, item: RenderBagView) {
		item.refreshGoods(this.items[ index ]);
	}

	private onListClick(item: any) {
		const list = this.view.list_item;
		const index = list.childIndexToItemIndex(list.getChildIndex(item));
		const data = this.items[ index ];
		if (this.showType == ItemBagType.Equip) {
			let equip1 = <IEquipment>data;
			let equip2 = <IEquipment>userData.body.getDressedEquip(equip1.part);
			this.showView<UIEquipmentInfoData>(ViewID.UIEquipmentInfoView, { equip1, equip2, fromBag: true });
		} else {
			this.showView<UIGoodsInfoData>(ViewID.UIGoodsInfoView, { id: data.id, buy: false });
		}
	}

}