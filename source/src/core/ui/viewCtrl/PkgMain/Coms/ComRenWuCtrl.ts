import { GameUtil } from "../../../../common/GameUtil";
import { EquipmentPart } from "../../../../net/enum/ItemEnum";
import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { ViewID } from "../../../core/ViewID";
import { UIUtility } from "../../../tool/UIUtility";
import { ComRenWuMsg, ComRenWuView } from "../../../view/PkgMain/Coms/ComRenWuView";
import { UIEquipmentInfoData } from "../UIEquipmentInfoCtrl";

export interface ComRenWuData {

}

export class ComRenWuCtrl extends BaseViewCtrl<ComRenWuView, ComRenWuData>{

	override onAwake(): void {
		this.addMessageListener(ComRenWuMsg.OnBtnWQClick, this.showEquipmentInfo, [ EquipmentPart.Weapon ]);
		this.addMessageListener(ComRenWuMsg.OnBtnXLClick, this.showEquipmentInfo, [ EquipmentPart.Necklace ]);
		this.addMessageListener(ComRenWuMsg.OnBtnJZClick, this.showEquipmentInfo, [ EquipmentPart.Ring ]);
		this.addMessageListener(ComRenWuMsg.OnBtnHFClick, this.showEquipmentInfo, [ EquipmentPart.Amulet ]);
		this.addMessageListener(ComRenWuMsg.OnBtnZQClick, this.showEquipmentInfo, [ EquipmentPart.Mount ]);
		this.addMessageListener(ComRenWuMsg.OnBtnAQClick, this.showEquipmentInfo, [ EquipmentPart.HiddenWeeapon ]);
		this.addMessageListener(ComRenWuMsg.OnBtnTKClick, this.showEquipmentInfo, [ EquipmentPart.Helmet ]);
		this.addMessageListener(ComRenWuMsg.OnBtnYFClick, this.showEquipmentInfo, [ EquipmentPart.Clothes ]);
		this.addMessageListener(ComRenWuMsg.OnBtnXZClick, this.showEquipmentInfo, [ EquipmentPart.Trousers ]);
		this.addMessageListener(ComRenWuMsg.OnBtnXieZClick, this.showEquipmentInfo, [ EquipmentPart.Shoes ]);
		this.addMessageListener(ComRenWuMsg.OnBtnSZClick, this.showEquipmentInfo, [ EquipmentPart.Fashion ]);
		this.addMessageListener(ComRenWuMsg.OnBtnFBClick, this.showEquipmentInfo, [ EquipmentPart.MagicWeapon ]);
	}

	override onEnable(): void {
		this.view.refreshEquipInfo();
	}

	override onDisable(): void {

	}

	override onDestroy(): void {

	}

	private showEquipmentInfo(type: EquipmentPart) {
		let equip1 = this.userData.getDressedEquip(type);
		if (!equip1) return UIUtility.showTipInfo(GameUtil.getLang(1012));
		this.addView<UIEquipmentInfoData>(ViewID.EquipmentInfoView, { equip1 });
	}

}