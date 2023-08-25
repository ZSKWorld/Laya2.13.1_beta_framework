import { ItemBagType } from "../../../../net/enum/ItemEnum";
import { Equipment, ItemBase } from "../../../../userData/proxy/ItemData";
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
		this.addMessage(ComWuPinMsg.OnBtnShouCangClick, this.refreshList, [ ItemBagType.Collect ]);
		this.addMessage(ComWuPinMsg.OnBtnEquipClick, this.refreshList, [ ItemBagType.Equip ]);
		this.addMessage(ComWuPinMsg.OnBtnPropClick, this.refreshList, [ ItemBagType.Prop ]);
		this.addMessage(ComWuPinMsg.OnBtnGemClick, this.refreshList, [ ItemBagType.Gem ]);
		this.addMessage(ComWuPinMsg.OnBtnMaterialClick, this.refreshList, [ ItemBagType.Material ]);
		this.addMessage(ComWuPinMsg.OnBtnBookClick, this.refreshList, [ ItemBagType.Book ]);
		this.addMessage(ComWuPinMsg.OnBtnOtherClick, this.refreshList, [ ItemBagType.Other ]);

		this.addMessage(ComWuPinMsg.OnBtnQualityUpClick, this.onBtnQualityUpClick);
		this.addMessage(ComWuPinMsg.OnBtnQualityDownClick, this.onBtnQualityDownClick);
		this.addMessage(ComWuPinMsg.OnBtnTypeUpClick, this.onBtnTypeUpClick);
		this.addMessage(ComWuPinMsg.OnBtnTypeDownClick, this.onBtnTypeDownClick);
		this.addMessage(ComWuPinMsg.OnBtnScoreUpClick, this.onBtnScoreUpClick);
		this.addMessage(ComWuPinMsg.OnBtnScoreDownClick, this.onBtnScoreDownClick);

		UIUtility.SetList(this.view.ListItem, this, this.listRenderer, this.listClick);
	}

	override onEnable(): void {
		this.refreshList(this.showType);
	}

	override onDisable(): void {

	}

	override onDestroy(): void {

	}

	@RegisterEvent(UserDataEvent.Collect_Changed, false, [ null ])
	@RegisterEvent(UserDataEvent.Equipment_Changed, false, [ null ])
	@RegisterEvent(UserDataEvent.Gem_Changed, false, [ null ])
	@RegisterEvent(UserDataEvent.Prop_Changed, false, [ null ])
	@RegisterEvent(UserDataEvent.Material_Changed, false, [ null ])
	@RegisterEvent(UserDataEvent.Book_Changed, false, [ null ])
	@RegisterEvent(UserDataEvent.Other_Changed, false, [ null ])
	private refreshList(type: ItemBagType) {
		const same = type == null || type == this.showType;
		this.showType = type ?? this.showType;
		this.items = userData.getItems(this.showType) as any;
		this.view.ListItem.numItems = this.items.length;
		!same && this.view.EffectList.play();
	}

	private listRenderer(index: number, item: RenderBagView) {
		item.refreshWuPin(this.items[ index ]);
	}

	private listClick(_, __, index: number) {
		const data = this.items[ index ];
		if (this.showType == ItemBagType.Equip) {
			let equip1 = <Equipment>data;
			let equip2 = <Equipment>userData.getDressedEquip(equip1.part);
			this.showView<UIEquipmentInfoData>(ViewID.UIEquipmentInfoView, { equip1, equip2, fromBag: true });
		} else {
			this.showView<ComItemInfoData>(ViewID.ComItemInfoView, { id: data.id, buy: false });
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