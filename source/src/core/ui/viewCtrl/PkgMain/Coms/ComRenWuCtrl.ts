import { GameUtil } from "../../../../common/GameUtil";
import { Logger } from "../../../../libs/utils/Logger";
import { EquipmentPart } from "../../../../net/enum/ItemEnum";
import { Equipment } from "../../../../userData/proxy/ItemData";
import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { ViewID } from "../../../core/ViewID";
import { UIUtility } from "../../../tool/UIUtility";
import { ComRenWuMsg, ComRenWuView } from "../../../view/PkgMain/Coms/ComRenWuView";
import { UIEquipmentInfoData } from "../UIEquipmentInfoCtrl";

const logger = Logger.Create("ComRenWuCtrl", true);

export interface ComRenWuData {

}

export class ComRenWuCtrl extends BaseViewCtrl<ComRenWuView, ComRenWuData>{

	override onAwake(): void {
		this.addMessage(ComRenWuMsg.OnBtnWQClick, this.showEquipmentInfo, [ EquipmentPart.Weapon ]);
		this.addMessage(ComRenWuMsg.OnBtnXLClick, this.showEquipmentInfo, [ EquipmentPart.Necklace ]);
		this.addMessage(ComRenWuMsg.OnBtnJZClick, this.showEquipmentInfo, [ EquipmentPart.Ring ]);
		this.addMessage(ComRenWuMsg.OnBtnHFClick, this.showEquipmentInfo, [ EquipmentPart.Amulet ]);
		this.addMessage(ComRenWuMsg.OnBtnZQClick, this.showEquipmentInfo, [ EquipmentPart.Mount ]);
		this.addMessage(ComRenWuMsg.OnBtnAQClick, this.showEquipmentInfo, [ EquipmentPart.HiddenWeeapon ]);
		this.addMessage(ComRenWuMsg.OnBtnTKClick, this.showEquipmentInfo, [ EquipmentPart.Helmet ]);
		this.addMessage(ComRenWuMsg.OnBtnYFClick, this.showEquipmentInfo, [ EquipmentPart.Clothes ]);
		this.addMessage(ComRenWuMsg.OnBtnXZClick, this.showEquipmentInfo, [ EquipmentPart.Trousers ]);
		this.addMessage(ComRenWuMsg.OnBtnXieZClick, this.showEquipmentInfo, [ EquipmentPart.Shoes ]);
		this.addMessage(ComRenWuMsg.OnBtnSZClick, this.showEquipmentInfo, [ EquipmentPart.Fashion ]);
		this.addMessage(ComRenWuMsg.OnBtnFBClick, this.showEquipmentInfo, [ EquipmentPart.MagicWeapon ]);
	}

	override onEnable(): void {
		this.view.refreshEquipInfo();
	}

	override onDisable(): void {

	}

	override onDestroy(): void {

	}

	private showEquipmentInfo(type: EquipmentPart) {
		let equip1 = this.userData.getDressedEquip(type) as Equipment;
		if (!equip1) return UIUtility.showTipInfo(GameUtil.getLang(1012));
		this.addView<UIEquipmentInfoData>(ViewID.EquipmentInfoView, { equip1 });
	}

}