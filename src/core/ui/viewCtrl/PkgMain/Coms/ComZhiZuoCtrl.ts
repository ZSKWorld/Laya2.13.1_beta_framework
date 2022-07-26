import { GetColorStr } from "../../../../libs/utils/Util";
import { EquipmentItem } from "../../../../playerData/BagData";
import { BagType } from "../../../../playerData/Interface";
import { tableMgr } from "../../../../table/TableManager";
import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { UIUtility } from "../../../tool/UIUtility";
import { ComZhiZuoMsg, ComZhiZuoView } from "../../../view/PkgMain/Coms/ComZhiZuoView";

export interface ComZhiZuoData {

}

export class ComZhiZuoCtrl extends BaseViewCtrl<ComZhiZuoView, ComZhiZuoData>{
	private _fjzbArr: number[] = tableMgr.Const[1007].Value.split(",").map(v => +v);
	private _fjbsArr: number[] = tableMgr.Const[1008].Value.split(",").map(v => +v);
	private _fjzbLevel: number = this._fjzbArr[0];
	private _fjbsLevel: number = this._fjbsArr[0];

	onAwake(): void {
		super.onAwake();
		this.addMessageListener(ComZhiZuoMsg.OnBtnFJZBClick, this.ComZhiZuo_OnBtnFJZBClick);
		this.addMessageListener(ComZhiZuoMsg.OnBtnFJBSClick, this.ComZhiZuo_OnBtnFJBSClick);

		this.addMessageListener(ComZhiZuoMsg.OnBtnYJHCClick, this.ComZhiZuo_OnBtnYJHCClick);
		this.addMessageListener(ComZhiZuoMsg.OnBtnJPYLClick, this.ComZhiZuo_OnBtnJPYLClick);
		this.addMessageListener(ComZhiZuoMsg.OnBtnDZZBClick, this.ComZhiZuo_OnBtnDZZBClick);
		this.addMessageListener(ComZhiZuoMsg.OnBtnZJZBClick, this.ComZhiZuo_OnBtnZJZBClick);
		this.addMessageListener(ComZhiZuoMsg.OnBtnCZZBClick, this.ComZhiZuo_OnBtnCZZBClick);
		this.addMessageListener(ComZhiZuoMsg.OnBtnBSHCClick, this.ComZhiZuo_OnBtnBSHCClick);
		this.addMessageListener(ComZhiZuoMsg.OnBtnZZTZClick, this.ComZhiZuo_OnBtnZZTZClick);

		this.addMessageListener(ComZhiZuoMsg.OnCmbFJZBDropDownDisplay, this.onCmbDropDownDisplay, [this.view.CmbFJZBDJ]);
		this.addMessageListener(ComZhiZuoMsg.OnCmbFJBSDropDownDisplay, this.onCmbDropDownDisplay, [this.view.CmbFJBSDJ]);
		const fjzbArr = this._fjzbArr.map(v => GetColorStr(v, `${v}星装备`));
		const fjbsArr = this._fjbsArr.map(v => GetColorStr(v, `${v}级宝石`));
		UIUtility.SetCombox(this.view.CmbFJZBDJ, fjzbArr, fjzbArr, this, this.onFJZBCmbStateChanged, fjzbArr[0]);
		UIUtility.SetCombox(this.view.CmbFJBSDJ, fjbsArr, fjbsArr, this, this.onFJBSCmbStateChanged, fjbsArr[0]);
	}

	onEnable(): void {
		super.onEnable();
	}

	private onFJZBCmbStateChanged() { this._fjzbLevel = this._fjzbArr[this.view.CmbFJZBDJ.selectedIndex]; }

	private onFJBSCmbStateChanged() { this._fjbsLevel = this._fjzbArr[this.view.CmbFJBSDJ.selectedIndex]; }
	private onCmbDropDownDisplay(cmb: fgui.GComboBox) {
		const { selectedIndex, dropdown } = cmb;
		dropdown.getChild("list").asList._children.forEach(
			(v, index) => v.asCom.getController("ctrlSelected").selectedIndex = Number(selectedIndex == index)
		);
	}

	private ComZhiZuo_OnBtnFJZBClick(): void {
		const equips = this.userData.bag.getItems(BagType.Equip).filter((v: EquipmentItem) => v.star <= this._fjzbLevel);
		equips.forEach(v => this.userData.sellBagItem(v.id, v.count, v.uid));
	}

	private ComZhiZuo_OnBtnFJBSClick(): void {
		const gems = this.userData.bag.getItems(BagType.Gem).filter(v => tableMgr.Gem[v.id].Level <= this._fjbsLevel);
		gems.forEach(v => this.userData.sellBagItem(v.id, v.count, v.uid));
	}

	private ComZhiZuo_OnBtnYJHCClick(): void {

	}

	private ComZhiZuo_OnBtnJPYLClick(): void {

	}

	private ComZhiZuo_OnBtnDZZBClick(): void {

	}

	private ComZhiZuo_OnBtnZJZBClick(): void {

	}

	private ComZhiZuo_OnBtnCZZBClick(): void {

	}

	private ComZhiZuo_OnBtnBSHCClick(): void {

	}

	private ComZhiZuo_OnBtnZZTZClick(): void {

	}

	onDisable(): void {
		super.onDisable();
	}

	onDestroy(): void {
		super.onDestroy();
	}
}