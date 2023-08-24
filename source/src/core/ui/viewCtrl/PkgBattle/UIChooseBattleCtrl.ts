import { logicSceneMgr } from "../../../../logicScene/LogicSceneManager";
import { LogicScene } from "../../../../logicScene/LogicSceneType";
import { BattleType } from "../../../net/enum/BattleEnums";
import { BattleService } from "../../../net/Services";
import { tableMgr } from "../../../table/TableManager";
import { BaseViewCtrl } from "../../core/BaseViewCtrl";
import { UIUtility } from "../../tool/UIUtility";
import { RenderChooseBattleView } from "../../view/PkgBattle/Renders/RenderChooseBattleView";
import { UIChooseBattleMsg, UIChooseBattleView } from "../../view/PkgBattle/UIChooseBattleView";

export class UIChooseBattleCtrl extends BaseViewCtrl<UIChooseBattleView, BattleType>{
	private items: BattleLevel[];
	private clickIndex: number;

	override onAwake(): void {
		this.addMessage(UIChooseBattleMsg.OnBtnBackClick, this.onBtnBackClick);
		this.addMessage(UIChooseBattleMsg.OnBtnConfirmBgClick, this.onBtnConfirmBgClick);
		this.addMessage(UIChooseBattleMsg.OnBtnBuyFoodClick, this.onBtnBuyFoodClick);
		this.addMessage(UIChooseBattleMsg.OnBtnBuyTimesClick, this.onBtnBuyTimesClick);
		this.addMessage(UIChooseBattleMsg.OnBtnSaoDangClick, this.onBtnSaoDangClick);
		this.addMessage(UIChooseBattleMsg.OnBtnBattleClick, this.onBtnBattleClick);

		UIUtility.SetList(this.view.ListBattle, this, this.battleListRender, this.battleListClick);
	}

	override onEnable(): void {
		this.view.showConfirm2(false);
		this.refreshList(this.data);
	}

	override onDisable(): void {

	}

	override onDestroy(): void {

	}

	private refreshList(type: BattleType) {
		this.view.setBattleType(type - 1);
		let itemCfg;
		switch (type) {
			case BattleType.GuanQia: itemCfg = tableMgr.Level; break;
			case BattleType.FuBen: itemCfg = tableMgr.FuBen; break;
			case BattleType.MiJing: itemCfg = tableMgr.MiJing; break;
			case BattleType.Boss: itemCfg = tableMgr.Boss; break;
			case BattleType.CaiJi: itemCfg = tableMgr.CaiJi; break;
			default: this.items ? this.items.length = 0 : this.items = []; break;
		}
		itemCfg && (this.items = Object.keys(itemCfg).map((v) => itemCfg[ v ]));
		this.view.ListBattle.numItems = this.items.length;
	}

	private battleListRender(index: number, item: RenderChooseBattleView) {
		const data = this.items[ index ];
		switch (this.data) {
			case BattleType.GuanQia:
				item.refreshGuanQia(<ConfigLevelData>data);
				break;
			case BattleType.FuBen:
				item.refreshFuBen(<ConfigFuBenData>data);
				break;
			case BattleType.MiJing:
				item.refreshMiJing(<ConfigMiJingData>data);
				break;
			case BattleType.Boss:
				item.refreshBoss(<ConfigBossData>data);
				break;
			case BattleType.CaiJi:
				item.refreshCaiJi(data);
				break;
			default: break;
		}
	}

	private battleListClick(_, __, index: number) {
		this.clickIndex = index;
		if (this.data == BattleType.CaiJi) {
			UIUtility.ShowNumInput("你要采集多久呢？(小时)", 1, 24, Laya.Handler.create(this, (value: number) => {
				if (value != null) this.onBtnBattleClick(value);
			}));
		} else
			this.view.showConfirm2(true, this.items[ index ]);
	}

	private onBtnBackClick(): void {
		logicSceneMgr.enterScene(LogicScene.MainScene);
	}

	private onBtnConfirmBgClick(): void {
		this.view.showConfirm2(false);
	}

	private onBtnBuyFoodClick(): void {

	}

	private onBtnBuyTimesClick(): void {

	}

	private onBtnSaoDangClick(): void {
		UIUtility.ShowNumInput("扫荡关卡", 1, 10000, Laya.Handler.create(this, (count: number) => {

		}));
	}

	private onBtnBattleClick(hour: number): void {
		hour = typeof hour == "number" ? hour : 0;
		const [ battleType, cfg ] = [ this.data, this.items[ this.clickIndex ] ];
		BattleService.Inst.startBattle({ type: battleType, id: cfg.ID, hour });
	}

}