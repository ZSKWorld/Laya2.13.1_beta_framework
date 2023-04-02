import { GameEvent } from "../../core/common/GameEvent";
import { ResPath } from "../../core/common/ResPath";
import { CustomSpriteManager } from "../../core/libs/customSprite/CustomSpriteManager";
import { Event } from "../../core/libs/event/EventMgr";
import { ErrorCode } from "../../core/net/enum/ErrorCode";
import { websocket } from "../../core/net/WebSocket";
import { tableMgr } from "../../core/table/TableManager";
import { layerMgr } from "../../core/ui/core/GameLayer";
import { uiMgr } from "../../core/ui/core/UIManager";
import { ViewExtend } from "../../core/ui/core/ViewExtend";
import { ViewID } from "../../core/ui/core/ViewID";
import { uiRegister } from "../../core/ui/core/ViewRegister";
import { redDotMgr } from "../../core/ui/redDot/RedDotMgr";
import { UIUtility } from "../../core/ui/tool/UIUtility";
import { LogicSceneBase } from "../LogicSceneBase";
import { logicSceneMgr } from "../LogicSceneMgr";
import { LogicScene } from "../LogicSceneType";

/** 初始化逻辑场景 */
export class LogicSceneInit extends LogicSceneBase {
	private static inited = false;

	protected override getConstResArray(): string[] {
		return [
			ResPath.TablePath.Config,
			ResPath.FontPath.Font03,
			ResPath.UIPath.PkgCommon,
		];
	}

	protected onEnter(): void {
		if (LogicSceneInit.inited == false) {
			ViewExtend.init();
			tableMgr.loadTable();
			uiRegister.Init();
			layerMgr.init();
			uiMgr.init();
			redDotMgr.init();
			websocket.init();
			CustomSpriteManager.init();
			LogicSceneInit.inited = true;
		}
		logicSceneMgr.enterScene(LogicScene.LoginScene);
	}

	protected onExit(): void {
	}

	@Event(GameEvent.SocketOpened, false, [ true ])
	@Event(GameEvent.SocketClosed, false, [ false ])
	private socketConnectChanged(open: boolean) {
		if (open) uiMgr.removeView(ViewID.WaitingView);
		else uiMgr.addView(ViewID.WaitingView, "网络已断开", null, false);
	}

	@Event(GameEvent.NetMsgError)
	private netMsgError(msg: UserOutput) {
		UIUtility.showTipInfo(tableMgr.Error[ msg.error ].text);
		if (msg.error == ErrorCode.NOT_LOGIN)
			logicSceneMgr.enterScene(LogicScene.LoginScene);
	}

}