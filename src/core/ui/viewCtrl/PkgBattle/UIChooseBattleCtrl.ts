import { LogicSceneType } from '../../../../logicScene/LogicSceneType';
import { NotifyConst } from '../../../common/NotifyConst';
import { GetLang } from "../../../libs/utils/Util";
import { BattleType } from "../../../playerData/Interface";
import { tableMgr } from "../../../table/TableManager";
import { BaseViewCtrl } from "../../core/BaseViewCtrl";
import { ViewID } from "../../core/ViewID";
import { UIUtility } from "../../tool/UIUtility";
import { RenderChooseBattleView } from "../../view/PkgBattle/Renders/RenderChooseBattleView";
import { UIChooseBattleMsg, UIChooseBattleView } from "../../view/PkgBattle/UIChooseBattleView";
import { UIBattleData } from "./UIBattleCtrl";

export type BattleLevel = ConfigLevelData | ConfigFuBenData | ConfigMiJingData | ConfigBossData;

export class UIChooseBattleCtrl extends BaseViewCtrl<UIChooseBattleView, BattleType> {
	private items: BattleLevel[];
	private clickIndex: number;

	onAwake(): void {
		super.onAwake();
		this.addMessageListener(UIChooseBattleMsg.OnBtnBackClick, this.dispatch, [ NotifyConst.EnterScene, LogicSceneType.MainScene ]);
		this.addMessageListener(UIChooseBattleMsg.OnBtnBuyFoodClick, this.UIChooseBattle_OnBtnBuyFoodClick);
		this.addMessageListener(UIChooseBattleMsg.OnBtnSaoDangClick, this.UIChooseBattle_OnBtnSaoDangClick);
		this.addMessageListener(UIChooseBattleMsg.OnBtnBattleClick, this.UIChooseBattle_OnBtnBattleClick);
	}

	onEnable(): void {
		super.onEnable();
		this.refreshList(this.data);
	}

	onDisable(): void {
		super.onDisable();
	}

	onDestroy(): void {
		super.onDestroy();
	}

	private refreshList(type: BattleType) {
		this.view.setBattleType(type - 1);
		let itemCfg: ReadOnlyObject<any>;
		switch (type) {
			case BattleType.GuanQia:
				itemCfg = tableMgr.Level;
				break;
			case BattleType.FuBen:
				itemCfg = tableMgr.FuBen;
				break;
			case BattleType.MiJing:
				itemCfg = tableMgr.MiJing;
				break;
			case BattleType.Boss:
				itemCfg = tableMgr.Boss;
				break;
			case BattleType.CaiJi:
				itemCfg = tableMgr.CaiJi;
				break;
			default:
				this.items = [];
				break;
		}
		itemCfg && (this.items = Object.keys(itemCfg).map((v) => itemCfg[ v ]));
		UIUtility.SetList(this.view.ListBattle, this.items.length, this, this.battleListRender, this.battleListClick);
	}

	private battleListRender(index: number, item: RenderChooseBattleView) {
		switch (this.data) {
			case BattleType.GuanQia:
				item.refreshGuanQia(<ConfigLevelData>this.items[ index ]);
				break;
			case BattleType.FuBen:
				item.refreshFuBen(<ConfigFuBenData>this.items[ index ]);
				break;
			case BattleType.MiJing:
				item.refreshMiJing(<ConfigMiJingData>this.items[ index ]);
				break;
			case BattleType.Boss:
				item.refreshBoss(<ConfigBossData>this.items[ index ]);
				break;
			case BattleType.CaiJi:
				item.refreshCaiJi(this.items[ index ]);
				break;
			default:
				break;
		}
	}

	private battleListClick(_, __, index: number) {
		this.clickIndex = index;
		if (this.data == BattleType.CaiJi) {
			UIUtility.ShowNumInput("你要采集多久呢？(小时)", 1, 24).then((caiJiNum) => {
				if (caiJiNum != null) {
				}
			});
		} else
			this.view.showConfirm(true, this.items[ index ] as any);
	}

	private UIChooseBattle_OnBtnBuyFoodClick(): void {

	}

	private async UIChooseBattle_OnBtnSaoDangClick(): Promise<void> {
		UIUtility.ShowNumInput("扫荡关卡", 1, 10000).then((count) => {
			if (count != null) {

			}
		});
	}

	private UIChooseBattle_OnBtnBattleClick(): void {
		const [ battleType, cfg ] = [ this.data, this.items[ this.clickIndex ] ];
		const startResult = this.userData.startBattle(battleType, cfg.ID);
		if (startResult) return UIUtility.ShowTipInfo(GetLang(startResult));
		this.addView<UIBattleData>(ViewID.BattleView, { battleType, cfg });
		this.view.showConfirm(false);
		this.view.ListBattle.refreshVirtualList();
	}
}