import { NotifyConst } from "../../../../common/NotifyConst";
import { ResPath } from "../../../../common/ResPath";
import { InsertNotify } from "../../../../libs/event/EventMgr";
import { ExtensionClass, GetJingJieString } from "../../../../libs/utils/Util";
import { tableMgr } from "../../../../table/TableManager";
import { ViewExtension } from "../../../core/interfaces";
import ComXinFa from "../../../ui/PkgMain/ComXinFa";
import ItemXinFa from "../../../ui/PkgMain/ItemXinFa";

export const enum ComXinFaMsg {
	OnBtnXinFa0Click = "ComXinFa_OnBtnXinFa0Click",
	OnBtnXinFa1Click = "ComXinFa_OnBtnXinFa1Click",
	OnBtnXinFa2Click = "ComXinFa_OnBtnXinFa2Click",
	OnBtnXinFa3Click = "ComXinFa_OnBtnXinFa3Click",
	OnBtnXinFa4Click = "ComXinFa_OnBtnXinFa4Click",
	OnBtnXinFa5Click = "ComXinFa_OnBtnXinFa5Click",
	OnBtnXinFa6Click = "ComXinFa_OnBtnXinFa6Click",
	OnBtnXinFa7Click = "ComXinFa_OnBtnXinFa7Click",
	OnBtnXinFa8Click = "ComXinFa_OnBtnXinFa8Click",
	OnBtnUpgradeBgClick = "ComXinFa_OnBtnUpgradeBgClick",
	OnBtnSkill0Click = "ComXinFa_OnBtnSkill0Click",
	OnBtnSkill1Click = "ComXinFa_OnBtnSkill1Click",
	OnBtnSkill2Click = "ComXinFa_OnBtnSkill2Click",
	OnBtnSkill3Click = "ComXinFa_OnBtnSkill3Click",
	OnBtnUpgrade0Click = "ComXinFa_OnBtnUpgrade0Click",
	OnBtnUpgrade1Click = "ComXinFa_OnBtnUpgrade1Click",
	OnBtnUpgrade2Click = "ComXinFa_OnBtnUpgrade2Click",
}

export class ComXinFaView extends ExtensionClass<ViewExtension, ComXinFa>(ComXinFa) {
	static PkgRes = ResPath.Ui_PkgMain;

	onCreate(): void {
		const { BtnXinFa0, BtnXinFa1, BtnXinFa2, BtnXinFa3, BtnXinFa4, BtnXinFa5, BtnXinFa6, BtnXinFa7, BtnXinFa8, BtnUpgradeBg,
			BtnSkill0, BtnSkill1, BtnSkill2, BtnSkill3, BtnUpgrade0, BtnUpgrade1, BtnUpgrade2 } = this;
		BtnXinFa0.onClick(this, this.sendMessage, [ComXinFaMsg.OnBtnXinFa0Click]);
		BtnXinFa1.onClick(this, this.sendMessage, [ComXinFaMsg.OnBtnXinFa1Click]);
		BtnXinFa2.onClick(this, this.sendMessage, [ComXinFaMsg.OnBtnXinFa2Click]);
		BtnXinFa3.onClick(this, this.sendMessage, [ComXinFaMsg.OnBtnXinFa3Click]);
		BtnXinFa4.onClick(this, this.sendMessage, [ComXinFaMsg.OnBtnXinFa4Click]);
		BtnXinFa5.onClick(this, this.sendMessage, [ComXinFaMsg.OnBtnXinFa5Click]);
		BtnXinFa6.onClick(this, this.sendMessage, [ComXinFaMsg.OnBtnXinFa6Click]);
		BtnXinFa7.onClick(this, this.sendMessage, [ComXinFaMsg.OnBtnXinFa7Click]);
		BtnXinFa8.onClick(this, this.sendMessage, [ComXinFaMsg.OnBtnXinFa8Click]);
		BtnUpgradeBg.onClick(this, this.sendMessage, [ComXinFaMsg.OnBtnUpgradeBgClick]);
		BtnSkill0.onClick(this, this.sendMessage, [ComXinFaMsg.OnBtnSkill0Click]);
		BtnSkill1.onClick(this, this.sendMessage, [ComXinFaMsg.OnBtnSkill1Click]);
		BtnSkill2.onClick(this, this.sendMessage, [ComXinFaMsg.OnBtnSkill2Click]);
		BtnSkill3.onClick(this, this.sendMessage, [ComXinFaMsg.OnBtnSkill3Click]);
		BtnUpgrade0.onClick(this, this.sendMessage, [ComXinFaMsg.OnBtnUpgrade0Click]);
		BtnUpgrade1.onClick(this, this.sendMessage, [ComXinFaMsg.OnBtnUpgrade1Click]);
		BtnUpgrade2.onClick(this, this.sendMessage, [ComXinFaMsg.OnBtnUpgrade2Click]);
	}

	@InsertNotify(NotifyConst.BaseDataChanged)
	refresh() {
		const { BtnXinFa0, BtnXinFa1, BtnXinFa2, BtnXinFa3, BtnXinFa4, BtnXinFa5, BtnXinFa6, BtnXinFa7, BtnXinFa8 } = this;
		const [xinFa0, xinFa1, xinFa2, xinFa3, xinFa4, xinFa5, xinFa6, xinFa7, xinFa8] = [
			tableMgr.Item[6000], tableMgr.Item[6001], tableMgr.Item[6002], tableMgr.Item[6003],
			tableMgr.Item[6004], tableMgr.Item[6005], tableMgr.Item[6006], tableMgr.Item[6007], tableMgr.Item[6008],
		];
		const [data0, data1, data2, data3, data4, data5, data6, data7, data8] = [
			this.userData.base.xinFaData[6000], this.userData.base.xinFaData[6001], this.userData.base.xinFaData[6002],
			this.userData.base.xinFaData[6003], this.userData.base.xinFaData[6004], this.userData.base.xinFaData[6005],
			this.userData.base.xinFaData[6006], this.userData.base.xinFaData[6007], this.userData.base.xinFaData[6008],
		]
		this.setBtnState(BtnXinFa0, xinFa0.Name, data0);
		this.setBtnState(BtnXinFa1, xinFa1.Name, data1);
		this.setBtnState(BtnXinFa2, xinFa2.Name, data2);
		this.setBtnState(BtnXinFa3, xinFa3.Name, data3);
		this.setBtnState(BtnXinFa4, xinFa4.Name, data4);
		this.setBtnState(BtnXinFa5, xinFa5.Name, data5);
		this.setBtnState(BtnXinFa6, xinFa6.Name, data6);
		this.setBtnState(BtnXinFa7, xinFa7.Name, data7);
		this.setBtnState(BtnXinFa8, xinFa8.Name, data8);

	}
	private setBtnState(btn: ItemXinFa, name: string, data: number) {
		btn.touchable = data != null;
		btn.title = name + " Lv." + (data || 0);
		btn.getControllerAt(0).selectedIndex = data == null ? 1 : 0;
	}

	showUpgrade(id: number) {
		const { TxtXinFaName, TxtXinFaDesc, TxtUpgradeInfo } = this;
		const { Name, Description, UseRequire } = tableMgr.Item[id];
		TxtXinFaName.text = Name;
		TxtXinFaDesc.text = Description;
		TxtUpgradeInfo.text = `境界需求:${GetJingJieString(UseRequire.jingJie, UseRequire.cengJi)}
心法等级:${this.userData.base.xinFaData[id]}    最高等级:4096
拥有经验:17.4亿    需要经验:1.2亿
拥有金币:88.7亿    需要金币:7840.7万`;
		this.ctrlUpgrade.selectedIndex = 1;
	}
	hideUpgrade() {
		this.ctrlUpgrade.selectedIndex = 0;
	}

}
