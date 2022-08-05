import { NotifyConst } from '../../core/common/NotifyConst'
import { platform, PlatformType } from '../../core/common/platform/Platform'
import { ResPath } from '../../core/common/ResPath'
import { websocket } from '../../core/net/WebSocket'
import { tableMgr } from '../../core/table/TableManager'
import { layerMgr } from '../../core/ui/core/GameLayer'
import { uiMgr } from '../../core/ui/core/UIManager'
import { ViewExtend } from '../../core/ui/core/ViewExtend'
import { uiRegister } from '../../core/ui/core/ViewRegister'
import { FixEngine } from '../../FixEngine'
import { LogicSceneType } from '../LogicSceneType'
import { LogicSceneBase } from './LogicSceneBase'

/**
 *@Author zsk
 *@Date 2022/7/25 21:59
 *@Description
 */
export class LogicSceneInit extends LogicSceneBase {

	protected getConstResArray(): string[] {
		return [
			ResPath.Table_Config,
			ResPath.Font_HYDiShengYingXiongTiW,
			ResPath.Ui_PkgCommon,
		];
	}

	protected onEnter(): void {
		FixEngine.fix();
		ViewExtend.init();
		tableMgr.loadTable();
		uiRegister.Init();
		layerMgr.init();
		uiMgr.init();
		// websocket.init();
		platform.init(PlatformType.Dev);
		this.dispatch(NotifyConst.EnterScene, LogicSceneType.LoginScene);
	}

	protected onExit(): void {
	}

}