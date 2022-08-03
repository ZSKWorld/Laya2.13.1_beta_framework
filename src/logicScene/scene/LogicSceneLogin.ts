import { NotifyConst } from '../../core/common/NotifyConst';
import { ResPath } from '../../core/common/ResPath';
import { ViewID } from '../../core/ui/core/ViewID';
import { LogicSceneBase } from './LogicSceneBase';

/**
 *@Author zsk
 *@Date 2022/7/25 21:49
 *@Description
 */
export class LogicSceneLogin extends LogicSceneBase {
	protected getResArray(): string[] {
		return [ ResPath.Ui_PkgLogin ];
	}

	protected onEnter(): void {
		this.dispatch(NotifyConst.AddView, ViewID.LoginMainView);
	}

	protected onExit(): void {
	}

}