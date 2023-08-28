import { logicSceneMgr } from "../../../../../logicScene/LogicSceneManager";
import { LogicScene } from "../../../../../logicScene/LogicSceneType";
import { BattleType } from "../../../../net/enum/BattleEnums";
import { BattleService } from "../../../../net/Services";
import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { UIUtility } from "../../../tool/UIUtility";
import { RenderChooseBattleView } from "../view/renders/RenderChooseBattleView";
import { UIChooseBattleMsg, UIChooseBattleView } from "../view/UIChooseBattleView";
import { RenderChooseBattleCtrl } from "./renders/RenderChooseBattleCtrl";

export class UIChooseBattleCtrl extends BaseViewCtrl<UIChooseBattleView, BattleType>{
	private items: BattleLevel[];
	private clickIndex: number;

	override onAdded() {
		this.addMessage(UIChooseBattleMsg.OnGraphConfirmBg, this.onGraphConfirmBgClick);
		this.addMessage(UIChooseBattleMsg.OnBtnBackClick, this.onBtnBackClick);
		this.addMessage(UIChooseBattleMsg.OnBtnBuyFoodClick, this.onBtnBuyFoodClick);
		this.addMessage(UIChooseBattleMsg.OnBtnBuyTimesClick, this.onBtnBuyTimesClick);
		this.addMessage(UIChooseBattleMsg.OnBtnSaoDangClick, this.onBtnSaoDangClick);
		this.addMessage(UIChooseBattleMsg.OnBtnBattleClick, this.onBtnBattleClick);

		UIUtility.SetList(this.view.liast_battle, true, this, this.battleListRender, this.battleListClick);
	}

	override onEnable(): void {
		this.view.showConfirm(false);
		this.refreshList(this.data);
	}

	private refreshList(type: BattleType) {
		this.view.setBattleType(type - 1);
		let itemCfg;
		switch (type) {
			case BattleType.GuanQia: itemCfg = cfgMgr.Level; break;
			case BattleType.FuBen: itemCfg = cfgMgr.FuBen; break;
			case BattleType.MiJing: itemCfg = cfgMgr.MiJing; break;
			case BattleType.Boss: itemCfg = cfgMgr.Boss; break;
			case BattleType.CaiJi: itemCfg = cfgMgr.CaiJi; break;
			default: this.items ? this.items.length = 0 : this.items = []; break;
		}
		itemCfg && (this.items = Object.keys(itemCfg).map((v) => itemCfg[ v ]));
		this.view.liast_battle.numItems = this.items.length;
	}

	private battleListRender(index: number, item: RenderChooseBattleView) {
		const data = this.items[ index ];
		item.refreshByType(this.data, data);
		const itemCtrl = item.controller as RenderChooseBattleCtrl;
		itemCtrl.data = this.data;
		itemCtrl.cfgData = data;
	}

	private battleListClick(item: RenderChooseBattleView) {
		const list = this.view.liast_battle;
		const index = list.childIndexToItemIndex(list.getChildIndex(item));
		this.clickIndex = index;
		if (this.data == BattleType.CaiJi) {
			UIUtility.ShowChooseNum("你要采集多久呢？(小时)", 1, 24, Laya.Handler.create(this, (value: number) => {
				if (value) this.onBtnBattleClick(value);
			}));
		} else
			this.view.showConfirm(true, this.items[ index ]);
	}

	private onGraphConfirmBgClick() {
		this.view.showConfirm(false);
	}

	private onBtnBackClick() {
		logicSceneMgr.enterScene(LogicScene.MainScene);
	}

	private onBtnBuyFoodClick() {

	}

	private onBtnBuyTimesClick() {

	}

	private onBtnSaoDangClick() {

	}

	private onBtnBattleClick(hour: number): void {
		hour = typeof hour == "number" ? hour : 0;
		const [ battleType, cfg ] = [ this.data, this.items[ this.clickIndex ] ];
		BattleService.Inst.startBattle({ type: battleType, id: cfg.id, hour });
	}

}