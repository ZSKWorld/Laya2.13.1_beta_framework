import { NotifyConst } from '../../core/common/NotifyConst';
import { ViewID } from '../../core/ui/core/ViewID';
import { LogicSceneBase } from './LogicSceneBase';

/**
 *@Author zsk
 *@Date 2022/7/25 21:53
 *@Description
 */

export class LogicSceneGame extends LogicSceneBase {

	protected onEnter(): void {
		this.dispatch(NotifyConst.AddView, [ ViewID.ChooseBattleView, this.data ]);
	}

	protected onExit(): void {
	}

}