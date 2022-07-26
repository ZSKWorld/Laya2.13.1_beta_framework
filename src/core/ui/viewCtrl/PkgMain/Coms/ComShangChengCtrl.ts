import { tableMgr } from "../../../../table/TableManager";
import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { UIUtility } from "../../../tool/UIUtility";
import { ComShangChengMsg, ComShangChengView } from "../../../view/PkgMain/Coms/ComShangChengView";
import { RenderBagView } from "../../../view/PkgMain/Renders/RenderBagView";

export const enum SellType {
	Prop = 1,
	Gem,
	Material,
	MiJi,
	Other,
	HeiShi,
	XianJie,
}
export interface ComShangChengData {

}

export class ComShangChengCtrl extends BaseViewCtrl<ComShangChengView, ComShangChengData>{
	private showType: SellType;
	private showFilter: (...args: any) => boolean;
	private items: ConfigShopData[];
	onAwake(): void {
		super.onAwake();
		this.addMessageListener(ComShangChengMsg.OnBtnPropClick, this.refreshList, [SellType.Prop]);
		this.addMessageListener(ComShangChengMsg.OnBtnGemClick, this.refreshList, [SellType.Gem]);
		this.addMessageListener(ComShangChengMsg.OnBtnMaterialClick, this.refreshList, [SellType.Material]);
		this.addMessageListener(ComShangChengMsg.OnBtnMiJiClick, this.refreshList, [SellType.MiJi]);
		this.addMessageListener(ComShangChengMsg.OnBtnOtherClick, this.refreshList, [SellType.Other]);
		this.addMessageListener(ComShangChengMsg.OnBtnHeiShiClick, this.refreshList, [SellType.HeiShi]);
		this.addMessageListener(ComShangChengMsg.OnBtnXianJieClick, this.refreshList, [SellType.XianJie]);

		this.addMessageListener(ComShangChengMsg.OnBtnZBQHClick, this.ComShangCheng_OnBtnZBQHClick);
		this.addMessageListener(ComShangChengMsg.OnBtnBSJGClick, this.ComShangCheng_OnBtnBSJGClick);
		this.addMessageListener(ComShangChengMsg.OnBtnJSClick, this.ComShangCheng_OnBtnJSClick);
		this.addMessageListener(ComShangChengMsg.OnBtnTSDJClick, this.ComShangCheng_OnBtnTSDJClick);

		this.addMessageListener(ComShangChengMsg.OnBtnGemLv1Click, this.refreshList, [SellType.Gem,]);
		this.addMessageListener(ComShangChengMsg.OnBtnGemLv2Click, this.refreshList, [SellType.Gem,]);
		this.addMessageListener(ComShangChengMsg.OnBtnGemLv3Click, this.refreshList, [SellType.Gem,]);
		this.addMessageListener(ComShangChengMsg.OnBtnGemLv4Click, this.refreshList, [SellType.Gem,]);

		this.addMessageListener(ComShangChengMsg.OnBtnSGCLClick, this.ComShangCheng_OnBtnSGCLClick);
		this.addMessageListener(ComShangChengMsg.OnBtnTSCLClick, this.ComShangCheng_OnBtnTSCLClick);
		this.addMessageListener(ComShangChengMsg.OnBtnZWClick, this.ComShangCheng_OnBtnZWClick);
		this.addMessageListener(ComShangChengMsg.OnBtnQHCLClick, this.ComShangCheng_OnBtnQHCLClick);

		this.addMessageListener(ComShangChengMsg.OnBtnTJClick, this.ComShangCheng_OnBtnTJClick);
		this.addMessageListener(ComShangChengMsg.OnBtnXFClick, this.ComShangCheng_OnBtnXFClick);
		this.addMessageListener(ComShangChengMsg.OnBtnJNClick, this.ComShangCheng_OnBtnJNClick);

		this.addMessageListener(ComShangChengMsg.OnBtnQTClick, this.ComShangCheng_OnBtnQTClick);
		this.addMessageListener(ComShangChengMsg.OnBtnYRClick, this.ComShangCheng_OnBtnYRClick);

		this.showType = SellType.Prop;
	}

	onEnable(): void {
		super.onEnable();
		this.refreshList(this.showType, this.showFilter);
	}

	private refreshList(type: SellType, filter: (...args: any) => boolean): void {
		this.showFilter = filter;
		const shop = tableMgr.Shop;
		this.items = Object.keys(shop).filter((v) => shop[v].SellType == type).map((v) => shop[v]);
		UIUtility.SetList(this.view.ListItem, this.items.length, this, this.listRenderer, this.listClick);
		this.showType != type && this.view.EffectList.play();
		this.showType = type;
	}
	private listRenderer(index: number, item: RenderBagView) {
		item.refreshShangCheng(this.items[index].SellID);
	}
	private listClick(item: RenderBagView, __, index: number) {
		UIUtility.ShowItemInfo(this.items[index].ID, true);
	}

	private ComShangCheng_OnBtnZBQHClick(): void {

	}

	private ComShangCheng_OnBtnBSJGClick(): void {

	}

	private ComShangCheng_OnBtnJSClick(): void {

	}

	private ComShangCheng_OnBtnTSDJClick(): void {

	}

	private ComShangCheng_OnBtnGemLv1Click(): void {

	}

	private ComShangCheng_OnBtnGemLv2Click(): void {

	}

	private ComShangCheng_OnBtnGemLv3Click(): void {

	}

	private ComShangCheng_OnBtnGemLv4Click(): void {

	}

	private ComShangCheng_OnBtnSGCLClick(): void {

	}

	private ComShangCheng_OnBtnTSCLClick(): void {

	}

	private ComShangCheng_OnBtnZWClick(): void {

	}

	private ComShangCheng_OnBtnQHCLClick(): void {

	}

	private ComShangCheng_OnBtnTJClick(): void {

	}

	private ComShangCheng_OnBtnXFClick(): void {

	}

	private ComShangCheng_OnBtnJNClick(): void {

	}

	private ComShangCheng_OnBtnQTClick(): void {

	}

	private ComShangCheng_OnBtnYRClick(): void {

	}

	onDisable(): void {
		super.onDisable();
	}

	onDestroy(): void {
		super.onDestroy();
		this.showFilter = null;
	}
}