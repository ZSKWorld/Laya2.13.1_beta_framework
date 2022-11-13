import { InsertEvent } from "../../../../libs/event/EventMgr";
import { ItemBagType } from "../../../../net/enum/ItemEnum";
import { Equipment, ItemBase } from "../../../../userData/proxy/ItemProxy";
import { UserDataEvent } from "../../../../userData/UserDataEvent";
import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { ViewID } from "../../../core/ViewID";
import { UIUtility } from "../../../tool/UIUtility";
import { ComWuPinMsg, ComWuPinView } from "../../../view/PkgMain/Coms/ComWuPinView";
import { RenderBagView } from "../../../view/PkgMain/Renders/RenderBagView";
import { UIEquipmentInfoData } from "../UIEquipmentInfoCtrl";
import { ComItemInfoData } from "./ComItemInfoCtrl";

export interface ComWuPinData {

}

export class ComWuPinCtrl extends BaseViewCtrl<ComWuPinView, ComWuPinData>{
	private items: ItemBase[];
	private showType: ItemBagType = ItemBagType.Collect;

	override onAwake(): void {
		this.addMessageListener(ComWuPinMsg.OnBtnShouCangClick, this.refreshList, [ ItemBagType.Collect ]);
		this.addMessageListener(ComWuPinMsg.OnBtnEquipClick, this.refreshList, [ ItemBagType.Equip ]);
		this.addMessageListener(ComWuPinMsg.OnBtnPropClick, this.refreshList, [ ItemBagType.Prop ]);
		this.addMessageListener(ComWuPinMsg.OnBtnGemClick, this.refreshList, [ ItemBagType.Gem ]);
		this.addMessageListener(ComWuPinMsg.OnBtnMaterialClick, this.refreshList, [ ItemBagType.Material ]);
		this.addMessageListener(ComWuPinMsg.OnBtnBookClick, this.refreshList, [ ItemBagType.Book ]);
		this.addMessageListener(ComWuPinMsg.OnBtnOtherClick, this.refreshList, [ ItemBagType.Other ]);

		this.addMessageListener(ComWuPinMsg.OnBtnQualityUpClick, this.onBtnQualityUpClick);
		this.addMessageListener(ComWuPinMsg.OnBtnQualityDownClick, this.onBtnQualityDownClick);
		this.addMessageListener(ComWuPinMsg.OnBtnTypeUpClick, this.onBtnTypeUpClick);
		this.addMessageListener(ComWuPinMsg.OnBtnTypeDownClick, this.onBtnTypeDownClick);
		this.addMessageListener(ComWuPinMsg.OnBtnScoreUpClick, this.onBtnScoreUpClick);
		this.addMessageListener(ComWuPinMsg.OnBtnScoreDownClick, this.onBtnScoreDownClick);
	}

	override onEnable(): void {
		this.refreshList(this.showType);
	}

	override onDisable(): void {

	}

	override onDestroy(): void {

	}

	@InsertEvent(UserDataEvent.Bag_Changed, false, [ null ])
	private refreshList(type: ItemBagType) {
		const same = type == null || type == this.showType;
		this.showType = type ?? this.showType;
		this.items = this.userData.bag.getItems(this.showType);
		UIUtility.setList(this.view.ListItem, this.items.length, this, this.listRenderer, this.listClick);
		!same && this.view.EffectList.play();
	}

	private listRenderer(index: number, item: RenderBagView) {
		item.refreshWuPin(this.items[ index ]);
	}

	private listClick(_, __, index: number) {
		const data = this.items[ index ];
		if (this.showType == ItemBagType.Equip) {
			let equip1 = <Equipment>data;
			let equip2 = this.userData.getDressedEquip(equip1.part);
			this.addView<UIEquipmentInfoData>(ViewID.EquipmentInfoView, { equip1, equip2, fromBag: true }, null, false);
		} else {
			this.addView<ComItemInfoData>(ViewID.ComItemInfoView, { id: data.id, buy: false }, null, false);
		}
	}

	private onBtnQualityUpClick(): void {

	}

	private onBtnQualityDownClick(): void {

	}

	private onBtnTypeUpClick(): void {

	}

	private onBtnTypeDownClick(): void {

	}

	private onBtnScoreUpClick(): void {

	}

	private onBtnScoreDownClick(): void {

	}

}