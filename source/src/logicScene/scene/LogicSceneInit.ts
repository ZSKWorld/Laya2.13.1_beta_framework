import { GameEvent } from "../../core/common/GameEvent";
import { ResPath } from "../../core/common/ResPath";
import { ErrorCode } from "../../core/net/enum/ErrorCode";
import { websocket } from "../../core/net/WebSocket";
import { layerMgr } from "../../core/ui/core/LayerManager";
import { uiMgr } from "../../core/ui/core/UIManager";
import { ViewID } from "../../core/ui/core/ViewID";
import { viewRegister } from "../../core/ui/core/ViewRegister";
import { tipMgr } from "../../core/ui/tool/TipManager";
import { platformMgr } from "../../platform/PlatformManager";
import { LogicSceneBase } from "../LogicSceneBase";
import { logicSceneMgr } from "../LogicSceneManager";
import { LogicScene } from "../LogicSceneType";

export interface SceneInitData {

}

/** 初始化逻辑场景 */
export class LogicSceneInit extends LogicSceneBase<SceneInitData> {

	protected override getNormalResArray() {
		return [];
	}

	protected onEnter() {
		windowImmit("showConfirm", this.showConfirm);
		layerMgr.init();
		uiMgr.init();
		viewRegister.init();
		websocket.init();
		platformMgr.init();
		logicSceneMgr.enterScene(LogicScene.PreScreen);
	}

	protected onExit() {
	}

	@RegisterEvent(GameEvent.SocketOpened, false, [ true ])
	@RegisterEvent(GameEvent.SocketClosed, false, [ false ])
	private socketConnectChanged(open: boolean) {
		if (open) uiMgr.removeView(ViewID.UIWaitingView);
		else uiMgr.showView(ViewID.UIWaitingView, "网络已断开");
	}

	@RegisterEvent(GameEvent.NetMsgError)
	private netMsgError(msg: UserOutput) {
		tipMgr.showTip(cfgMgr.Error[ msg.error ].text);
		if (msg.error == ErrorCode.NOT_LOGIN)
			logicSceneMgr.enterScene(LogicScene.LoginScene);
	}

	private showConfirm(title: string, msg: string) {
		const commonPkg = fgui.UIPackage.getById(ResPath.PkgPath.PkgCommon);
		if (!commonPkg) return platformMgr.showConfirm(title, msg);
		return new Promise<boolean>(resolve => {
			uiMgr.showView(
				ViewID.UIConfirmView,
				{
					title,
					content: msg,
					onCancel: Laya.Handler.create(null, resolve, [ false ]),
					onConfirm: Laya.Handler.create(null, resolve, [ true ]),
				});
		});
	}
}

