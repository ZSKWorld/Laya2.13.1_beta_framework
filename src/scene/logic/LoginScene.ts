import { BaseScene } from './BaseScene'
import { ViewID } from '../../core/ui/core/ViewID'
import { NotifyConst } from '../../core/common/NotifyConst'
import { ResPath } from '../../core/common/ResPath'

/**
 *@Author zsk
 *@Date 2022/7/25 21:49
 *@Description
 */
export class LoginScene extends BaseScene {

	getResArray(): string[] {
		return [];
	}

	protected onEnter(): void {
		this.dispatch(NotifyConst.AddView, ViewID.LoginMainView);
	}

	protected onExit(): void {
		fgui.UIPackage.removePackage(ResPath.Ui_PkgLogin);
	}

}