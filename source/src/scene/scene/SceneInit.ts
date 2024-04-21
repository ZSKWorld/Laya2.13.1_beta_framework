import { ResPath } from "../../core/common/ResPath";
import { CfgManager } from "../../core/config/CfgManager";
import { SocketEvent, websocket } from "../../core/net/WebSocket";
import { ErrorCode } from "../../core/net/enum/ErrorCode";
import { layerMgr } from "../../core/ui/core/LayerManager";
import { sceneViewRegister } from "../../core/ui/core/SceneViewRegister";
import { uiMgr } from "../../core/ui/core/UIManager";
import { ViewID } from "../../core/ui/core/ViewID";
import { viewRegister } from "../../core/ui/core/ViewRegister";
import { tipMgr } from "../../core/ui/tool/TipManager";
import { User } from "../../core/userData/User";
import { platformMgr } from "../../platform/PlatformManager";
import { LogicSceneBase } from "../SceneBase";
import { SceneType } from "../SceneDefine";
import { sceneMgr } from "../SceneManager";

export interface SceneInitData {

}

/** 初始化逻辑场景 */
export class SceneInit extends LogicSceneBase<SceneInitData> {
	override readonly type = SceneType.InitScene;

	protected override getConstResArray() {
		const resArray: string[] = [
			ResPath.ConfigPath.Config,
			ResPath.PkgPath.PkgCommon,
		];
		resArray.push(...platformMgr.platform.res);
		return resArray;
	}

	protected override onEnter() {
		windowImmit("cfgMgr", new CfgManager());
		windowImmit("userData", new User());
		layerMgr.init();
		uiMgr.init();
		viewRegister.init();
		websocket.init();
		sceneViewRegister.init();
		sceneMgr.enterScene(SceneType.LoginScene);
	}

	@RegisterEvent(SocketEvent.ConnectSuccess, false, [true])
	@RegisterEvent(SocketEvent.ReconnectSuccess, false, [true])
	@RegisterEvent(SocketEvent.Close, false, [false])
	private socketConnectChanged(open: boolean) {
		if (open) uiMgr.removeView(ViewID.UIWaitingView);
		else uiMgr.showView(ViewID.UIWaitingView, "网络已断开");
	}

	@RegisterEvent(SocketEvent.MsgError)
	private netMsgError(msg: IUserOutput) {
		tipMgr.showTip(cfgMgr.Error[msg.error].text);
		if (msg.error == ErrorCode.NOT_LOGIN)
			sceneMgr.enterScene(SceneType.LoginScene);
	}
}

