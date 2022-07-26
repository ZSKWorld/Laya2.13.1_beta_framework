import { NotifyConst } from "../../../../common/NotifyConst";
import { ViewID } from "../../../core/ViewID";
import { InsertNotify } from "../../../../libs/event/EventMgr";
import { GetLang } from "../../../../libs/utils/Util";
import { EquipmentPart } from "../../../../playerData/Interface";
import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { UIUtility } from "../../../tool/UIUtility";
import { ComRenWuMsg, ComRenWuView } from "../../../view/PkgMain/Coms/ComRenWuView";
import { UIEquipmentInfoData } from "../UIEquipmentInfoCtrl";

export interface ComRenWuData {

}

export class ComRenWuCtrl extends BaseViewCtrl<ComRenWuView, ComRenWuData>{

	onAwake(): void {
		super.onAwake();
		this.addMessageListener(ComRenWuMsg.OnBtnWQClick, this.showEquipmentInfo, [EquipmentPart.WuQi]);
		this.addMessageListener(ComRenWuMsg.OnBtnXLClick, this.showEquipmentInfo, [EquipmentPart.XiangLian]);
		this.addMessageListener(ComRenWuMsg.OnBtnJZClick, this.showEquipmentInfo, [EquipmentPart.JieZhi]);
		this.addMessageListener(ComRenWuMsg.OnBtnHFClick, this.showEquipmentInfo, [EquipmentPart.HuFu]);
		this.addMessageListener(ComRenWuMsg.OnBtnTKClick, this.showEquipmentInfo, [EquipmentPart.TouKui]);
		this.addMessageListener(ComRenWuMsg.OnBtnYFClick, this.showEquipmentInfo, [EquipmentPart.YiFu]);
		this.addMessageListener(ComRenWuMsg.OnBtnXZClick, this.showEquipmentInfo, [EquipmentPart.KuZi]);
		this.addMessageListener(ComRenWuMsg.OnBtnXieZClick, this.showEquipmentInfo, [EquipmentPart.XieZi]);

		this.addMessageListener(ComRenWuMsg.OnBtnZQClick, this.showEquipmentInfo, [EquipmentPart.ZuoQi]);
		this.addMessageListener(ComRenWuMsg.OnBtnAQClick, this.showEquipmentInfo, [EquipmentPart.AnQi]);
		this.addMessageListener(ComRenWuMsg.OnBtnSZClick, this.showEquipmentInfo, [EquipmentPart.ShiZhuang]);
		this.addMessageListener(ComRenWuMsg.OnBtnFBClick, this.showEquipmentInfo, [EquipmentPart.FaBao]);
	}

	onEnable(): void {
		super.onEnable();
		this.refreshEquipInfo();
	}

	@InsertNotify(NotifyConst.BaseDataChanged)
	private refreshEquipInfo() {
		this.view.refreshEquipInfo();
	}

	private showEquipmentInfo(type: EquipmentPart) {
		let equip1 = this.userData.base.getEquipmentByType(type);
		if (!equip1) return UIUtility.ShowTipInfo(GetLang(1012));
		this.addView<UIEquipmentInfoData>(ViewID.EquipmentInfoView, { equip1 });
	}

	onDisable(): void {
		super.onDisable();
	}

	onDestroy(): void {
		super.onDestroy();
	}
}