import { SocketEvent, WebSocket } from "../../core/net/WebSocket";
import { ErrorCode } from "../../core/net/enum/ErrorCode";
import { layerMgr } from "../../core/ui/core/LayerManager";
import { sceneViewRegister } from "../../core/ui/core/SceneViewRegister";
import { viewRegister } from "../../core/ui/core/ViewRegister";
import { tipMgr } from "../../core/ui/tool/TipManager";
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
		resArray.push(...platform.res);
		return resArray;
	}

	protected override onEnter() {
		cfgMgr.init();
		layerMgr.init();
		uiMgr.init();
		viewRegister.init();
		WebSocket.Inst.init();
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
				netService.login({ account: userData.account.account, password: userData.account.password });
		}
		else this.showView(ViewID.UIWaitingView, "网络已断开");
	}

	@RegisterEvent(SocketEvent.MsgError)
	private netMsgError(msg: IUserOutput) {
		tipMgr.showTip(cfgMgr.Error[msg.error].text);
		if (msg.error == ErrorCode.NOT_LOGIN)
			sceneMgr.enterScene(SceneType.LoginScene);
	}
}

