import { AccountService } from "../../core/net/Services";
import { SocketEvent, websocket } from "../../core/net/WebSocket";
import { ErrorCode } from "../../core/net/enum/ErrorCode";
import { layerMgr } from "../../core/ui/core/LayerManager";
import { sceneViewRegister } from "../../core/ui/core/SceneViewRegister";
import { uiMgr } from "../../core/ui/core/UIManager";
import { viewRegister } from "../../core/ui/core/ViewRegister";
import { tipMgr } from "../../core/ui/tool/TipManager";
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
		cfgMgr.init();
		layerMgr.init();
		uiMgr.init();
		viewRegister.init();
		websocket.init();
		sceneViewRegister.init();
		sceneMgr.enterScene(SceneType.LoginScene);
	}

	@RegisterEvent(SocketEvent.ConnectSuccess, false, [true, SocketEvent.ConnectSuccess])
	@RegisterEvent(SocketEvent.ReconnectSuccess, false, [true, SocketEvent.ReconnectSuccess])
	@RegisterEvent(SocketEvent.Close, false, [false, SocketEvent.Close])
	private socketConnectChanged(open: boolean, eventName: string) {
		if (open) {
			uiMgr.removeView(ViewID.UIWaitingView);
			if (eventName == SocketEvent.ReconnectSuccess && userData.account.account)
				AccountService.Inst.login({ account: userData.account.account, password: userData.account.password });
		}
		else uiMgr.showView(ViewID.UIWaitingView, "网络已断开");
	}

	@RegisterEvent(SocketEvent.MsgError)
	private netMsgError(msg: IUserOutput) {
		tipMgr.showTip(cfgMgr.Error[msg.error].text);
		if (msg.error == ErrorCode.NOT_LOGIN)
			sceneMgr.enterScene(SceneType.LoginScene);
	}
}

