import { SceneType } from "../../../../../scene/SceneDefine";
import { sceneMgr } from "../../../../../scene/SceneManager";
import { BattleType } from "../../../../net/enum/BattleEnums";
import { UserDataEvent } from "../../../../userData/UserDataEvent";
import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { UIUtility } from "../../../tool/UIUtility";
import { UIChooseBattleMsg, UIChooseBattleView } from "../view/UIChooseBattleView";
import { RenderChooseBattleView } from "../view/renders/RenderChooseBattleView";
import { RenderChooseBattleCtrl } from "./renders/RenderChooseBattleCtrl";

export class UIChooseBattleCtrl extends BaseViewCtrl<UIChooseBattleView, BattleType> {
	private items: BattleCfgData[];

	override onAdded() {
		this.addMessage(UIChooseBattleMsg.OnBtnBackClick, this.onBtnBackClick);

		UIUtility.SetList(this.view.list_battle, true, this, this.onListBattleRender);
	}

	override onEnable() {
		this.refreshList();
	}

	override onOpenAni() {
		return new Promise<void>(resolve => {
			const childIndex = this.view.list_battle.numChildren - 1;
			this.view.list_battle._children.forEach((v, i) => {
				v.alpha = 0;
				Laya.Tween.to(v, { alpha: 1 }, 100, null, i == childIndex ? Laya.Handler.create(null, resolve) : null, i * 50, true);
			});
		});
	}

	@RegisterEvent(UserDataEvent.User_Battle_Changed)
	private refreshList() {
		this.view.setBattleType(this.data - 1);
		let itemCfg: BattleCfg;
		switch (this.data) {
			case BattleType.Level: itemCfg = cfgMgr.Level; break;
			case BattleType.Copy: itemCfg = cfgMgr.Copy; break;
			case BattleType.Secret: itemCfg = cfgMgr.Secret; break;
			case BattleType.Boss: itemCfg = cfgMgr.Boss; break;
			case BattleType.Gather: itemCfg = cfgMgr.Gather; break;
			default: this.items ? this.items.length = 0 : this.items = []; break;
		}
		itemCfg && (this.items = Object.keys(itemCfg).map((v) => itemCfg[v]));
		this.view.list_battle.numItems = this.items.length;
	}

	private onListBattleRender(index: number, item: RenderChooseBattleView) {
		const itemCtrl = item.viewCtrl as RenderChooseBattleCtrl;
		itemCtrl.setData(this.data, this.items[index]);
	}

	private onBtnBackClick() {
		sceneMgr.enterScene(SceneType.MainScene);
	}

}