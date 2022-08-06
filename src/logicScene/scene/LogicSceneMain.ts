import { NotifyConst } from '../../core/common/NotifyConst';
import { ResPath } from '../../core/common/ResPath';
import { ViewID } from '../../core/ui/core/ViewID';
import { LogicSceneBase } from './LogicSceneBase';

/**
 *@Author zsk
 *@Date 2022/7/25 21:52
 *@Description
 */
export class LogicSceneMain extends LogicSceneBase {

	protected getResArray(): string[] {
		return [
			ResPath.Ui_PkgMain
		];
	}

	protected onEnter(): void {
		this.dispatch(NotifyConst.AddView, ViewID.MainView);
		//历练日志
	}

	protected onExit(): void {
	}
}