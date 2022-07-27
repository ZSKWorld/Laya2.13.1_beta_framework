import { BaseScene } from './BaseScene'
import { NotifyConst } from '../../core/common/NotifyConst'
import { ViewID } from '../../core/ui/core/ViewID'

/**
 *@Author zsk
 *@Date 2022/7/25 21:52
 *@Description
 */
export class MainScene extends BaseScene {

	protected onEnter(): void {
		this.dispatch(NotifyConst.AddView, ViewID.MainView);
		//历练日志
	}

	protected onExit(): void {
	}
}