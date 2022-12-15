import { tableMgr } from "../../../../table/TableManager";
import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { ViewID } from "../../../core/ViewID";
import { UIUtility } from "../../../tool/UIUtility";
import { ComShangChengMsg, ComShangChengView } from "../../../view/PkgMain/Coms/ComShangChengView";
import { RenderBagView } from "../../../view/PkgMain/Renders/RenderBagView";
import { ComItemInfoData } from "./ComItemInfoCtrl";

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
	private showType: SellType = SellType.Prop;
	private showFilter: (...args: any) => boolean;
	private items: ConfigShopData[];

	override onAwake(): void {
		this.addMessage(ComShangChengMsg.OnBtnPropClick, this.refreshList, [ SellType.Prop ]);
		this.addMessage(ComShangChengMsg.OnBtnGemClick, this.refreshList, [ SellType.Gem ]);
		this.addMessage(ComShangChengMsg.OnBtnMaterialClick, this.refreshList, [ SellType.Material ]);
		this.addMessage(ComShangChengMsg.OnBtnMiJiClick, this.refreshList, [ SellType.MiJi ]);
		this.addMessage(ComShangChengMsg.OnBtnOtherClick, this.refreshList, [ SellType.Other ]);
		this.addMessage(ComShangChengMsg.OnBtnHeiShiClick, this.refreshList, [ SellType.HeiShi ]);
		this.addMessage(ComShangChengMsg.OnBtnXianJieClick, this.refreshList, [ SellType.XianJie ]);

		this.addMessage(ComShangChengMsg.OnBtnZBQHClick, this.onBtnZBQHClick);
		this.addMessage(ComShangChengMsg.OnBtnBSJGClick, this.onBtnBSJGClick);
		this.addMessage(ComShangChengMsg.OnBtnJSClick, this.onBtnJSClick);
		this.addMessage(ComShangChengMsg.OnBtnTSDJClick, this.onBtnTSDJClick);
		this.addMessage(ComShangChengMsg.OnBtnGemLv1Click, this.onBtnGemLv1Click);
		this.addMessage(ComShangChengMsg.OnBtnGemLv2Click, this.onBtnGemLv2Click);
		this.addMessage(ComShangChengMsg.OnBtnGemLv3Click, this.onBtnGemLv3Click);
		this.addMessage(ComShangChengMsg.OnBtnGemLv4Click, this.onBtnGemLv4Click);
		this.addMessage(ComShangChengMsg.OnBtnSGCLClick, this.onBtnSGCLClick);
		this.addMessage(ComShangChengMsg.OnBtnTSCLClick, this.onBtnTSCLClick);
		this.addMessage(ComShangChengMsg.OnBtnZWClick, this.onBtnZWClick);
		this.addMessage(ComShangChengMsg.OnBtnQHCLClick, this.onBtnQHCLClick);
		this.addMessage(ComShangChengMsg.OnBtnTJClick, this.onBtnTJClick);
		this.addMessage(ComShangChengMsg.OnBtnXFClick, this.onBtnXFClick);
		this.addMessage(ComShangChengMsg.OnBtnJNClick, this.onBtnJNClick);
		this.addMessage(ComShangChengMsg.OnBtnQTClick, this.onBtnQTClick);
		this.addMessage(ComShangChengMsg.OnBtnYRClick, this.onBtnYRClick);
	}

	override onEnable(): void {
		this.refreshList(this.showType, this.showFilter);
	}

	override onDisable(): void {

	}

	override onDestroy(): void {

	}

	private refreshList(type: SellType, filter: (...args: any) => boolean): void {
		this.showFilter = filter;
		const shop = tableMgr.Shop;
		this.items = Object.keys(shop).filter((v) => shop[ v ].SellType == type).map((v) => shop[ v ]);
		UIUtility.setList(this.view.ListItem, this.items.length, this, this.listRenderer, this.listClick);
		this.showType != type && this.view.EffectList.play();
		this.showType = type;
	}
	private listRenderer(index: number, item: RenderBagView) {
		item.refreshShangCheng(this.items[ index ].SellID);
	}
	private listClick(item: RenderBagView, __, index: number) {
		this.addView<ComItemInfoData>(ViewID.ComItemInfoView, { id: this.items[ index ].ID, buy: true }, null, false);
	}

	private onBtnZBQHClick(): void {

	}

	private onBtnBSJGClick(): void {

	}

	private onBtnJSClick(): void {

	}

	private onBtnTSDJClick(): void {

	}

	private onBtnGemLv1Click(): void {

	}

	private onBtnGemLv2Click(): void {

	}

	private onBtnGemLv3Click(): void {

	}

	private onBtnGemLv4Click(): void {

	}

	private onBtnSGCLClick(): void {

	}

	private onBtnTSCLClick(): void {

	}

	private onBtnZWClick(): void {

	}

	private onBtnQHCLClick(): void {

	}

	private onBtnTJClick(): void {

	}

	private onBtnXFClick(): void {

	}

	private onBtnJNClick(): void {

	}

	private onBtnQTClick(): void {

	}

	private onBtnYRClick(): void {

	}

}