import { GameEvent } from "../../core/common/GameEvent";
import { ResPath } from "../../core/common/ResPath";
import { CfgManager } from "../../core/config/CfgManager";
import { websocket } from "../../core/net/WebSocket";
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
	private _prescreen: fgui.GLoader;

	protected override getConstResArray() {
		const resArray: string[] = [
			ResPath.ConfigPath.Config,
		];
		resArray.push(...platformMgr.platform.res);
		return resArray;
	}

	protected override onPreEnter() {
		this.showPreScreen();
		platformMgr.init();
	}

	protected override onEnter() {
		windowImmit("showConfirm", this.showConfirm);
		windowImmit("cfgMgr", new CfgManager());
		windowImmit("userData", new User());
		layerMgr.init();
		uiMgr.init();
		viewRegister.init();
		websocket.init();
		sceneViewRegister.init();
		Laya.timer.once(500, sceneMgr, sceneMgr.enterScene, [SceneType.LoginScene]);
	}

	protected override onExit() {
		if (this._prescreen) {
			this._prescreen.dispose();
			this._prescreen = null;
		}
		Laya.loader.clearRes(ResPath.PrescreenPath.Prescreen);
	}

	private showPreScreen() {
		if (!this._prescreen) {
			const groot = fgui.GRoot.inst;
			const pscreen = this._prescreen = new fgui.GLoader();
			pscreen.url = ResPath.PrescreenPath.Prescreen;
			pscreen.setSize(groot.width, groot.height);
			pscreen.addRelation(groot, fgui.RelationType.Size);
			pscreen.fill = fgui.LoaderFillType.ScaleFree;
			groot.addChild(this._prescreen);
		}
	}

	private showConfirm(title: string, msg: string, cancel: boolean = true) {
		const commonPkg = fgui.UIPackage.getById(ResPath.PkgPath.PkgCommon);
		if (!commonPkg) return platformMgr.showConfirm(title, msg);
		return new Promise<boolean>(resolve => {
			uiMgr.showView(ViewID.UIConfirmView, {
				title,
				content: msg,
				cancel: cancel,
				onCancel: cancel ? Laya.Handler.create(null, resolve, [false]) : null,
				onConfirm: Laya.Handler.create(null, resolve, [true]),
			});
		});
	}

	@RegisterEvent(GameEvent.SocketOpened, false, [true])
	@RegisterEvent(GameEvent.SocketClosed, false, [false])
	private socketConnectChanged(open: boolean) {
		if (open) uiMgr.removeView(ViewID.UIWaitingView);
		else uiMgr.showView(ViewID.UIWaitingView, "网络已断开");
	}

	@RegisterEvent(GameEvent.NetMsgError)
	private netMsgError(msg: IUserOutput) {
		tipMgr.showTip(cfgMgr.Error[msg.error].text);
		if (msg.error == ErrorCode.NOT_LOGIN)
			sceneMgr.enterScene(SceneType.LoginScene);
	}
}

