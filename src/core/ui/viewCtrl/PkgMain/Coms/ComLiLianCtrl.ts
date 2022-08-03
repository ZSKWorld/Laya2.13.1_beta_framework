import { SceneType } from '../../../../../scene/SceneType';
import { NotifyConst } from "../../../../common/NotifyConst";
import { InsertNotify } from "../../../../libs/event/EventMgr";
import { BattleType } from "../../../../playerData/Interface";
import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { UIUtility } from "../../../tool/UIUtility";
import { ComLiLianMsg, ComLiLianView } from "../../../view/PkgMain/Coms/ComLiLianView";
import { RenderTextView } from "../../../view/PkgMain/Renders/RenderTextView";

export interface ComLiLianData {

}

export class ComLiLianCtrl extends BaseViewCtrl<ComLiLianView, ComLiLianData> {
	private logs: string[] = [];

	onAwake(): void {
		super.onAwake();
		this.addMessageListener(ComLiLianMsg.OnBtnGuanQiaClick, this.enterBattle, [ BattleType.GuanQia ]);
		this.addMessageListener(ComLiLianMsg.OnBtnFuBenClick, this.enterBattle, [ BattleType.FuBen ]);
		this.addMessageListener(ComLiLianMsg.OnBtnMiJingClick, this.enterBattle, [ BattleType.MiJing ]);
		this.addMessageListener(ComLiLianMsg.OnBtnBossClick, this.enterBattle, [ BattleType.Boss ]);
		this.addMessageListener(ComLiLianMsg.OnBtnCaiJiClick, this.enterBattle, [ BattleType.CaiJi ]);
		this.addMessageListener(ComLiLianMsg.OnBtnGongLueClick, this.ComLiLian_OnBtnGongLueClick);
		this.addMessageListener(ComLiLianMsg.OnBtnWaiYuClick, this.ComLiLian_OnBtnWaiYuClick);
	}

	onEnable(): void {
		super.onEnable();
	}

	onDisable(): void {
		super.onDisable();
	}

	onDestroy(): void {
		super.onDestroy();
		this.logs.length = 0;
	}

	private enterBattle(data: any) {
		this.dispatch(NotifyConst.EnterScene, [ SceneType.GameScene, data ]);
	}

	@InsertNotify(NotifyConst.AddMainLog)
	private addMainLog(log: string | string[]) {
		if (Array.isArray(log)) this.logs.push(...log);
		else this.logs.push(log);
		Laya.timer.callLater(this, this.refreshLogList);
	}

	@InsertNotify(NotifyConst.ClearMainLog)
	private clearMainLog() {
		this.logs.length = 0;
		Laya.timer.callLater(this, this.refreshLogList);
	}

	private refreshLogList() {
		UIUtility.SetList(this.view.ListLog, this.logs.length, this, this.logRenderer);
		this.view.ListLog.scrollToView(this.logs.length - 1);
	}

	private logRenderer(index: number, item: RenderTextView) {
		item.setText(this.logs[ index ]);
	}

	private ComLiLian_OnBtnGongLueClick(): void {

	}

	private ComLiLian_OnBtnWaiYuClick(): void {

	}
}