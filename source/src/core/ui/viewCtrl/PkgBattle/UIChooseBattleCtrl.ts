import { LogicSceneType } from "../../../../logicScene/LogicSceneType";
import { GameEvent } from "../../../common/GameEvent";
import { BattleType } from "../../../net/enum/BattleEnums";
import { tableMgr } from "../../../table/TableManager";
import { UserDataUtil } from "../../../userData/UserDataUtil";
import { BaseViewCtrl } from "../../core/BaseViewCtrl";
import { ViewID } from "../../core/ViewID";
import { UIUtility } from "../../tool/UIUtility";
import { RenderChooseBattleView } from "../../view/PkgBattle/Renders/RenderChooseBattleView";
import { UIChooseBattleMsg, UIChooseBattleView } from "../../view/PkgBattle/UIChooseBattleView";
import { UIBattleData } from "./UIBattleCtrl";

export class UIChooseBattleCtrl extends BaseViewCtrl<UIChooseBattleView, BattleType>{
	private items: BattleLevel[];
	private clickIndex: number;

	override onAwake(): void {
		this.addMessageListener(UIChooseBattleMsg.OnBtnBackClick, this.onBtnBackClick);
		this.addMessageListener(UIChooseBattleMsg.OnBtnConfirmBgClick, this.onBtnConfirmBgClick);
		this.addMessageListener(UIChooseBattleMsg.OnBtnBuyFoodClick, this.onBtnBuyFoodClick);
		this.addMessageListener(UIChooseBattleMsg.OnBtnBuyTimesClick, this.onBtnBuyTimesClick);
		this.addMessageListener(UIChooseBattleMsg.OnBtnSaoDangClick, this.onBtnSaoDangClick);
		this.addMessageListener(UIChooseBattleMsg.OnBtnBattleClick, this.onBtnBattleClick);
	}

	override onEnable(): void {
		this.view.showConfirm(false);
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
		UIUtility.setList(this.view.ListBattle, this.items.length, this, this.battleListRender, this.battleListClick);
	}

	private battleListRender(index: number, item: RenderChooseBattleView) {
		const data = this.items[ index ];
		switch (this.data) {
			case BattleType.GuanQia:
				item.refreshGuanQia(<ConfigLevelData>data);
				break;
			case BattleType.FuBen:
				item.refreshFuBen(<ConfigFuBenData>data, UserDataUtil.getCopyTime(data.ID, this.userData.copy));
				break;
			case BattleType.MiJing:
				item.refreshMiJing(<ConfigMiJingData>data, UserDataUtil.getSecretTime(data.ID, this.userData.secret));
				break;
			case BattleType.Boss:
				item.refreshBoss(<ConfigBossData>data, UserDataUtil.getBossCoolDown(data.ID, this.userData.boss));
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
			UIUtility.showNumInput("你要采集多久呢？(小时)", 1, 24, Laya.Handler.create(this, (value: number) => {

			}));
		} else
			this.view.showConfirm(true, this.items[ index ] as any);
	}

	private onBtnBackClick(): void {
		this.dispatch(GameEvent.EnterScene, LogicSceneType.MainScene);
	}

	private onBtnConfirmBgClick(): void {
		this.view.showConfirm(false);
	}

	private onBtnBuyFoodClick(): void {

	}

	private onBtnBuyTimesClick(): void {

	}

	private onBtnSaoDangClick(): void {
		UIUtility.showNumInput("扫荡关卡", 1, 10000, Laya.Handler.create(this, (count: number) => {

		}));
	}

	private onBtnBattleClick(): void {
		const [ battleType, cfg ] = [ this.data, this.items[ this.clickIndex ] ];
		const startResult = this.userData.startBattle(battleType, cfg.ID);
		if (startResult) return UIUtility.showTipInfo(GetLang(startResult));
		this.addView<UIBattleData>(ViewID.BattleView, { battleType, cfg });
		this.view.ListBattle.refreshVirtualList();
	}

}