import { NotifyConst } from "../../../../common/NotifyConst";
import { ViewID } from "../../../core/ViewID";
import { InsertNotify } from "../../../../libs/event/EventMgr";
import { BagItem, EquipmentItem } from "../../../../playerData/BagData";
import { BagType } from "../../../../playerData/Interface";
import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { UIUtility } from "../../../tool/UIUtility";
import { ComWuPinMsg, ComWuPinView } from "../../../view/PkgMain/Coms/ComWuPinView";
import { RenderBagView } from "../../../view/PkgMain/Renders/RenderBagView";
import { UIEquipmentInfoData } from "../UIEquipmentInfoCtrl";
const enum WuPinSortType {
	QualityUp,
	QualityDown,
	TypeUp,
	TypeDown,
	ScoreUp,
	ScoreDown,
}

export interface ComWuPinData {
}

export class ComWuPinCtrl extends BaseViewCtrl<ComWuPinView, ComWuPinData>{
	private items: BagItem[];
	private showType: BagType;

	onAwake(): void {
		super.onAwake();
		this.addMessageListener(ComWuPinMsg.OnBtnShouCangClick, this.refreshList, [BagType.ShouCang]);
		this.addMessageListener(ComWuPinMsg.OnBtnEquipClick, this.refreshList, [BagType.Equip]);
		this.addMessageListener(ComWuPinMsg.OnBtnPropClick, this.refreshList, [BagType.Prop]);
		this.addMessageListener(ComWuPinMsg.OnBtnGemClick, this.refreshList, [BagType.Gem]);
		this.addMessageListener(ComWuPinMsg.OnBtnMaterialClick, this.refreshList, [BagType.Material]);
		this.addMessageListener(ComWuPinMsg.OnBtnBookClick, this.refreshList, [BagType.Book]);
		this.addMessageListener(ComWuPinMsg.OnBtnOtherClick, this.refreshList, [BagType.Other]);

		this.addMessageListener(ComWuPinMsg.OnBtnQualityUpClick, this.sortItem, [WuPinSortType.QualityUp]);
		this.addMessageListener(ComWuPinMsg.OnBtnQualityDownClick, this.sortItem, [WuPinSortType.QualityDown]);
		this.addMessageListener(ComWuPinMsg.OnBtnTypeUpClick, this.sortItem, [WuPinSortType.TypeUp]);
		this.addMessageListener(ComWuPinMsg.OnBtnTypeDownClick, this.sortItem, [WuPinSortType.TypeDown]);
		this.addMessageListener(ComWuPinMsg.OnBtnScoreUpClick, this.sortItem, [WuPinSortType.ScoreUp]);
		this.addMessageListener(ComWuPinMsg.OnBtnScoreDownClick, this.sortItem, [WuPinSortType.ScoreDown]);

		this.showType = BagType.ShouCang;
	}

	onEnable(): void {
		super.onEnable();
		this.refreshList(this.showType);
	}

	@InsertNotify(NotifyConst.BagDataChanged)
	private refreshList(type: BagType) {
		const same = type == null || type == this.showType;
		this.showType = type ?? this.showType;
		this.items = this.userData.bag.getItems(this.showType);
		UIUtility.SetList(this.view.ListItem, this.items.length, this, this.listRenderer, this.listClick);
		!same && this.view.EffectList.play();
	}
	private listRenderer(index: number, item: RenderBagView) {
		item.refreshWuPin(this.items[index]);
	}
	private listClick(_, __, index: number) {
		const data = this.items[index];
		if (this.showType == BagType.Equip) {
			let equip1 = <EquipmentItem>data;
			let equip2 = this.userData.base.getEquipmentByType(equip1.part);
			this.addView<UIEquipmentInfoData>(ViewID.EquipmentInfoView, { equip1, equip2, openBag: true }, null, false);
		} else {
			UIUtility.ShowItemInfo(data.id, false);
		}
	}

	private sortItem(sortType: WuPinSortType) {

	}

	onDisable(): void {
		super.onDisable();
	}

	onDestroy(): void {
		super.onDestroy();
		this.items = null;
	}
}