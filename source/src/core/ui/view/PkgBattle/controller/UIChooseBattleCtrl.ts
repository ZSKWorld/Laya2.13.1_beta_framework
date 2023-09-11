import { logicSceneMgr } from "../../../../../logicScene/LogicSceneManager";
import { LogicScene } from "../../../../../logicScene/LogicSceneType";
import { BattleType } from "../../../../net/enum/BattleEnums";
import { UserDataEvent } from "../../../../userData/UserDataEvent";
import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { UIUtility } from "../../../tool/UIUtility";
import { RenderChooseBattleView } from "../view/renders/RenderChooseBattleView";
import { UIChooseBattleMsg, UIChooseBattleView } from "../view/UIChooseBattleView";
import { RenderChooseBattleCtrl } from "./renders/RenderChooseBattleCtrl";

export class UIChooseBattleCtrl extends BaseViewCtrl<UIChooseBattleView, BattleType>{
	private items: BattleLevel[];

	override onAdded() {
		this.addMessage(UIChooseBattleMsg.OnBtnBackClick, this.onBtnBackClick);

		UIUtility.SetList(this.view.list_battle, true, this, this.onListBattleRender);
	}

	override onEnable(): void {
		this.refreshList();
	}

	@RegisterEvent(UserDataEvent.UserData_Battle_Changed)
	private refreshList() {
		this.view.setBattleType(this.data - 1);
		let itemCfg;
		switch (this.data) {
			case BattleType.Level: itemCfg = cfgMgr.Level; break;
			case BattleType.Copy: itemCfg = cfgMgr.Copy; break;
			case BattleType.Secret: itemCfg = cfgMgr.Secret; break;
			case BattleType.Boss: itemCfg = cfgMgr.Boss; break;
			case BattleType.Gather: itemCfg = cfgMgr.Gather; break;
			default: this.items ? this.items.length = 0 : this.items = []; break;
		}
		itemCfg && (this.items = Object.keys(itemCfg).map((v) => itemCfg[ v ]));
		this.view.list_battle.numItems = this.items.length;
	}

	private onListBattleRender(index: number, item: RenderChooseBattleView) {
		const itemCtrl = item.controller as RenderChooseBattleCtrl;
		itemCtrl.setData(this.data, this.items[ index ]);
	}

	private onBtnBackClick() {
		logicSceneMgr.enterScene(LogicScene.MainScene);
	}

}